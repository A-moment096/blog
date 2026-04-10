import fs from "node:fs";

type BoundaryPosition = "north" | "south" | "east" | "west";
type BoundaryType = "periodic" | "fixed";

type ParsedBoundaryConfig = {
    position?: unknown;
    type?: unknown;
    value?: unknown;
};

type ParsedMeshConfig = {
    type?: unknown;
    size?: unknown;
    spacing?: unknown;
    boundary_conditions?: unknown;
    initial_geometry?: {
        type?: unknown;
        parameters?: {
            min_val?: unknown;
            max_val?: unknown;
        };
    };
};

type ParsedConfig = {
    meshes?: unknown;
    energy?: {
        bulk_energy?: {
            type?: unknown;
            parameters?: {
                A?: unknown;
            };
        };
        interfacial_energy?: {
            type?: unknown;
            parameters?: {
                kappa?: unknown;
            };
        };
    };
    solvers?: {
        Nstep?: unknown;
        dt?: unknown;
        solver?: unknown;
    };
    output?: {
        folder?: unknown;
        writeEvery?: unknown;
        logEvery?: unknown;
        nanCheckEvery?: unknown;
    };
};

class ConfigValueReader {
    static number(value: unknown, keyPath: string): number {
        if (typeof value !== "number" || Number.isNaN(value)) {
            throw new Error(`Config '${keyPath}' must be a valid number.`);
        }
        return value;
    }

    static string(value: unknown, keyPath: string): string {
        if (typeof value !== "string" || value.trim() === "") {
            throw new Error(`Config '${keyPath}' must be a non-empty string.`);
        }
        return value;
    }
}

class MeshConfig {
    constructor(
        public readonly Nx: number,
        public readonly Ny: number,
        public readonly dx: number,
        public readonly dy: number,
        public readonly minVal: number,
        public readonly maxVal: number,
        public readonly boundaryConditions: ParsedBoundaryConfig[],
    ) { }

    static fromParsed(parsed: ParsedConfig): MeshConfig {
        if (!Array.isArray(parsed.meshes) || parsed.meshes.length === 0) {
            throw new Error("Config 'meshes' must be a non-empty array.");
        }

        const meshes = parsed.meshes as ParsedMeshConfig[];
        const targetMesh =
            meshes.find((mesh) => mesh?.type === "Cahn-Hilliard") ?? meshes[0];

        const size = targetMesh?.size;
        if (!Array.isArray(size) || size.length !== 2) {
            throw new Error("Config 'meshes[...].size' must be [Nx, Ny].");
        }

        const spacing = targetMesh?.spacing;
        if (!Array.isArray(spacing) || spacing.length !== 2) {
            throw new Error("Config 'meshes[...].spacing' must be [dx, dy].");
        }

        const boundaryConditions = targetMesh?.boundary_conditions;
        if (!Array.isArray(boundaryConditions) || boundaryConditions.length === 0) {
            throw new Error(
                "Config 'meshes[...].boundary_conditions' must be a non-empty array.",
            );
        }

        const initType = ConfigValueReader.string(
            targetMesh?.initial_geometry?.type,
            "meshes[...].initial_geometry.type",
        );
        if (initType !== "random" && initType !== "random-uniform") {
            throw new Error(
                `Unsupported initial geometry type '${initType}'. Only 'random' and 'random-uniform' are supported.`,
            );
        }

        const minVal = ConfigValueReader.number(
            targetMesh?.initial_geometry?.parameters?.min_val,
            "meshes[...].initial_geometry.parameters.min_val",
        );
        const maxVal = ConfigValueReader.number(
            targetMesh?.initial_geometry?.parameters?.max_val,
            "meshes[...].initial_geometry.parameters.max_val",
        );
        if (maxVal < minVal) {
            throw new Error(
                "Config 'meshes[...].initial_geometry.parameters.max_val' must be >= min_val.",
            );
        }

        return new MeshConfig(
            ConfigValueReader.number(size[0], "meshes[...].size[0]"),
            ConfigValueReader.number(size[1], "meshes[...].size[1]"),
            ConfigValueReader.number(spacing[0], "meshes[...].spacing[0]"),
            ConfigValueReader.number(spacing[1], "meshes[...].spacing[1]"),
            minVal,
            maxVal,
            boundaryConditions as ParsedBoundaryConfig[],
        );
    }
}

class EnergyConfig {
    constructor(
        public readonly A: number,
        public readonly kappa: number,
    ) { }

    static fromParsed(parsed: ParsedConfig): EnergyConfig {
        const bulkType = ConfigValueReader.string(
            parsed?.energy?.bulk_energy?.type,
            "energy.bulk_energy.type",
        );
        if (bulkType !== "double_well") {
            throw new Error(
                `Unsupported bulk energy type '${bulkType}'. Only 'double_well' is supported.`,
            );
        }

        const interfacialType = ConfigValueReader.string(
            parsed?.energy?.interfacial_energy?.type,
            "energy.interfacial_energy.type",
        );
        if (interfacialType !== "gradient") {
            throw new Error(
                `Unsupported interfacial energy type '${interfacialType}'. Only 'gradient' is supported.`,
            );
        }

        return new EnergyConfig(
            ConfigValueReader.number(
                parsed?.energy?.bulk_energy?.parameters?.A,
                "energy.bulk_energy.parameters.A",
            ),
            ConfigValueReader.number(
                parsed?.energy?.interfacial_energy?.parameters?.kappa,
                "energy.interfacial_energy.parameters.kappa",
            ),
        );
    }
}

class SolverConfig {
    constructor(
        public readonly Nstep: number,
        public readonly dt: number,
        public readonly M: number,
    ) { }

    static fromParsed(parsed: ParsedConfig): SolverConfig {
        const solverList = parsed?.solvers?.solver;
        if (!Array.isArray(solverList) || solverList.length === 0) {
            throw new Error("Config 'solvers.solver' must be a non-empty array.");
        }

        const chSolver = solverList.find(
            (solver) => (solver as { type?: unknown })?.type === "Cahn-Hilliard",
        ) as { M?: unknown } | undefined;

        if (!chSolver) {
            throw new Error(
                "Config 'solvers.solver' must include a Cahn-Hilliard solver.",
            );
        }

        return new SolverConfig(
            ConfigValueReader.number(parsed?.solvers?.Nstep, "solvers.Nstep"),
            ConfigValueReader.number(parsed?.solvers?.dt, "solvers.dt"),
            ConfigValueReader.number(chSolver?.M, "solvers.solver[...].M"),
        );
    }
}

class OutputConfig {
    constructor(
        public readonly folder_name: string,
        public readonly writeEvery: number,
        public readonly logEvery: number,
        public readonly nanCheckEvery: number | false | undefined,
    ) { }

    static fromParsed(parsed: ParsedConfig): OutputConfig {
        const nanCheckEvery = parsed?.output?.nanCheckEvery;
        if (
            nanCheckEvery !== false &&
            nanCheckEvery !== undefined &&
            (typeof nanCheckEvery !== "number" ||
                Number.isNaN(nanCheckEvery) ||
                !Number.isInteger(nanCheckEvery) ||
                nanCheckEvery <= 0)
        ) {
            throw new Error(
                "Config 'output.nanCheckEvery' must be a positive integer, false, or undefined.",
            );
        }

        return new OutputConfig(
            ConfigValueReader.string(parsed?.output?.folder, "output.folder"),
            ConfigValueReader.number(parsed?.output?.writeEvery, "output.writeEvery"),
            ConfigValueReader.number(parsed?.output?.logEvery, "output.logEvery"),
            nanCheckEvery as number | false | undefined,
        );
    }
}

class SimulationConfig {
    constructor(
        public readonly mesh: MeshConfig,
        public readonly energy: EnergyConfig,
        public readonly solver: SolverConfig,
        public readonly output: OutputConfig,
    ) { }

    static fromFile(configPath: string): SimulationConfig {
        let parsed: ParsedConfig;
        try {
            const fileText = fs.readFileSync(configPath, "utf-8");
            parsed = JSON.parse(fileText) as ParsedConfig;
        } catch (error) {
            throw new Error(
                `Failed to load config file '${configPath}': ${(error as Error).message}`,
            );
        }

        return new SimulationConfig(
            MeshConfig.fromParsed(parsed),
            EnergyConfig.fromParsed(parsed),
            SolverConfig.fromParsed(parsed),
            OutputConfig.fromParsed(parsed),
        );
    }
}

class BoundaryCondition {
    constructor(
        public readonly pos: BoundaryPosition,
        public readonly type: BoundaryType,
    ) { }

    apply(_mesh: Mesh): void {
        throw new Error("BoundaryCondition.apply must be implemented by subclass.");
    }
}

class PeriodicBC extends BoundaryCondition {
    constructor(pos: BoundaryPosition) {
        super(pos, "periodic");
    }

    apply(mesh: Mesh): void {
        const stride = mesh.Nx + 2;
        if (this.pos === "north") {
            for (let idx = 0; idx < mesh.Nx; idx++) {
                mesh.data[(mesh.Ny + 1) * stride + idx + 1] = mesh.data[1 * stride + idx + 1];
            }
        }
        if (this.pos === "south") {
            for (let idx = 0; idx < mesh.Nx; idx++) {
                mesh.data[idx + 1] = mesh.data[mesh.Ny * stride + idx + 1];
            }
        }
        if (this.pos === "east") {
            for (let idx = 0; idx < mesh.Ny; idx++) {
                mesh.data[(idx + 1) * stride + (mesh.Nx + 1)] = mesh.data[(idx + 1) * stride + 1];
            }
        }
        if (this.pos === "west") {
            for (let idx = 0; idx < mesh.Ny; idx++) {
                mesh.data[(idx + 1) * stride] = mesh.data[(idx + 1) * stride + mesh.Nx];
            }
        }
    }
}

class FixedBC extends BoundaryCondition {
    constructor(
        pos: BoundaryPosition,
        public readonly value: number,
    ) {
        super(pos, "fixed");
    }

    apply(mesh: Mesh): void {
        const stride = mesh.Nx + 2;
        if (this.pos === "north") {
            for (let idx = 0; idx < mesh.Nx; idx++) {
                mesh.data[(mesh.Ny + 1) * stride + idx + 1] = this.value;
            }
        }
        if (this.pos === "south") {
            for (let idx = 0; idx < mesh.Nx; idx++) {
                mesh.data[idx + 1] = this.value;
            }
        }
        if (this.pos === "east") {
            for (let idx = 0; idx < mesh.Ny; idx++) {
                mesh.data[(idx + 1) * stride + (mesh.Nx + 1)] = this.value;
            }
        }
        if (this.pos === "west") {
            for (let idx = 0; idx < mesh.Ny; idx++) {
                mesh.data[(idx + 1) * stride] = this.value;
            }
        }
    }
}

class BoundaryConditions {
    readonly bcs: BoundaryCondition[] = [];

    constructor(bcConfigs?: ParsedBoundaryConfig[]) {
        if (bcConfigs !== undefined) {
            this.loadFromConfigList(bcConfigs);
        }
    }

    createFromConfig(bcConfig: ParsedBoundaryConfig): BoundaryCondition {
        const position = bcConfig?.position;
        const type = bcConfig?.type;

        if (
            position !== "north" &&
            position !== "south" &&
            position !== "east" &&
            position !== "west"
        ) {
            throw new Error(
                `Invalid boundary position '${String(position)}'. Use north/south/east/west.`,
            );
        }

        if (type === "periodic") {
            return new PeriodicBC(position);
        }

        if (type === "fixed") {
            if (typeof bcConfig?.value !== "number" || Number.isNaN(bcConfig.value)) {
                throw new Error(
                    `Boundary '${position}' with type 'fixed' requires numeric 'value'.`,
                );
            }
            return new FixedBC(position, bcConfig.value);
        }

        throw new Error(
            `Unsupported boundary type '${String(type)}' at '${position}'.`,
        );
    }

    loadFromConfigList(bcConfigs: ParsedBoundaryConfig[]): this {
        if (!Array.isArray(bcConfigs)) {
            throw new Error("Boundary condition config must be an array.");
        }
        bcConfigs.forEach((bcConfig) => this.addBC(this.createFromConfig(bcConfig)));
        return this;
    }

    addBC(bc: BoundaryCondition): void {
        this.bcs.push(bc);
    }

    applyAll(mesh: Mesh): void {
        this.bcs.forEach((bc) => bc.apply(mesh));
    }
}

class InitGeometry {
    constructor(
        public readonly type: string,
        public readonly params: Record<string, number>,
    ) { }

    apply(_mesh: Mesh): void {
        throw new Error("InitGeometry.apply must be implemented by subclass.");
    }
}

class UniformRandomInit extends InitGeometry {
    constructor(minVal: number, maxVal: number) {
        super("random", { minVal, maxVal });
    }

    apply(mesh: Mesh): void {
        const stride = mesh.Nx + 2;
        for (let j = 1; j <= mesh.Ny; j++) {
            for (let i = 1; i <= mesh.Nx; i++) {
                const idx = j * stride + i;
                mesh.data[idx] =
                    this.params.minVal +
                    (this.params.maxVal - this.params.minVal) * Math.random();
            }
        }
    }
}

type NaNLocation = {
    x: number;
    y: number;
    idx: number;
};

type MeshKernel = (
    leftVal: number,
    rightVal: number,
    upVal: number,
    downVal: number,
    centerVal: number,
    invDxDy: number,
) => number;

class Mesh {
    readonly inv_dxdy: number;
    readonly data: number[];
    readonly boundCons: BoundaryConditions;

    constructor(
        public readonly Nx: number,
        public readonly Ny: number,
        public readonly dx: number,
        public readonly dy: number,
        data?: number[],
        boundCons?: BoundaryConditions,
    ) {
        this.inv_dxdy = 1 / (dx * dy);
        this.data = data ?? new Array((Nx + 2) * (Ny + 2)).fill(0);
        this.boundCons = boundCons ?? new BoundaryConditions();
    }

    load_boundary_conditions(bcs: BoundaryCondition[]): void {
        bcs.forEach((bc) => this.boundCons.addBC(bc));
    }

    init_geometry(initGeom: InitGeometry): void {
        initGeom.apply(this);
    }

    get(x: number, y: number): number {
        return this.data[(y + 1) * (this.Nx + 2) + x + 1];
    }

    findFirstNaN(): NaNLocation | undefined {
        const stride = this.Nx + 2;
        for (let j = 1; j <= this.Ny; j++) {
            for (let i = 1; i <= this.Nx; i++) {
                const idx = j * stride + i;
                if (Number.isNaN(this.data[idx])) {
                    return {
                        x: i - 1,
                        y: j - 1,
                        idx,
                    };
                }
            }
        }
        return undefined;
    }

    output_mesh(ker_fun: MeshKernel): Mesh {
        const newMesh = new Mesh(
            this.Nx,
            this.Ny,
            this.dx,
            this.dy,
            undefined,
            this.boundCons,
        );
        const stride = this.Nx + 2;
        for (let j = 1; j < this.Ny + 1; j++) {
            for (let i = 1; i < this.Nx + 1; i++) {
                const left = j * stride + i - 1;
                const right = j * stride + i + 1;
                const down = (j - 1) * stride + i;
                const up = (j + 1) * stride + i;
                const center = j * stride + i;
                newMesh.data[center] = ker_fun(
                    this.data[left],
                    this.data[right],
                    this.data[up],
                    this.data[down],
                    this.data[center],
                    this.inv_dxdy,
                );
            }
        }
        newMesh.boundCons.applyAll(newMesh);
        return newMesh;
    }

    write_VTK(istep: number, folder_name: string): void {
        const vtkContent = `# vtk DataFile Version 3.0
Spinodal Decomposition Step ${istep}
ASCII
DATASET STRUCTURED_GRID
DIMENSIONS ${this.Nx} ${this.Ny} 1
POINTS ${this.Nx * this.Ny} float
${Array.from({ length: this.Ny }, (_, j) =>
            Array.from(
                { length: this.Nx },
                (_, i) => `${i * this.dx} ${j * this.dy} 0`,
            ).join("\n"),
        ).join("\n")}
POINT_DATA ${this.Nx * this.Ny}
SCALARS CON float
LOOKUP_TABLE default
${Array.from({ length: this.Ny }, (_, j) =>
            Array.from(
                { length: this.Nx },
                (_, i) => `${this.data[(j + 1) * (this.Nx + 2) + i + 1]}`,
            ).join("\n"),
        ).join("\n")}
`;

        fs.writeFileSync(`${folder_name}/step_${istep}.vtk`, vtkContent);
    }
}

class BulkFreeEnergy {
    constructor(
        public readonly type: string,
        public readonly params: Record<string, number>,
    ) { }
}

type DBulkDC = (centerVal: number) => number;

class DoubleWellBulk extends BulkFreeEnergy {
    constructor(A: number) {
        super("double_well", { A });
    }

    dbulk_dc(): DBulkDC {
        return (centerVal: number) =>
            2 * this.params.A * centerVal * (1 - centerVal) * (1 - 2 * centerVal);
    }
}

class InterfacialEnergy {
    constructor(
        public readonly type: string,
        public readonly params: Record<string, number>,
    ) { }
}

type DIntDC = MeshKernel;

class GradientEnergy extends InterfacialEnergy {
    constructor(kappa: number) {
        super("gradient", { kappa });
    }

    dint_dc(): DIntDC {
        return (
            leftVal: number,
            rightVal: number,
            upVal: number,
            downVal: number,
            centerVal: number,
            invDxDy: number,
        ) =>
            -this.params.kappa *
            invDxDy *
            (leftVal + rightVal + upVal + downVal - 4 * centerVal);
    }
}

type OtherContribution = MeshKernel;

class CH_Solver {
    constructor(
        public readonly mesh: Mesh,
        public readonly M: number,
        public readonly dbulk_dc: DBulkDC,
        public readonly dint_dc: DIntDC,
        public readonly others: OtherContribution | undefined,
        public readonly dt: number,
    ) { }

    dF_dc(): Mesh {
        return this.mesh.output_mesh(
            (
                leftVal: number,
                rightVal: number,
                upVal: number,
                downVal: number,
                centerVal: number,
                invDxDy: number,
            ) => {
                const dbulk = this.dbulk_dc(centerVal);
                const dint = this.dint_dc(
                    leftVal,
                    rightVal,
                    upVal,
                    downVal,
                    centerVal,
                    invDxDy,
                );
                let dF = dbulk + dint;
                if (this.others !== undefined) {
                    dF += this.others(
                        leftVal,
                        rightVal,
                        upVal,
                        downVal,
                        centerVal,
                        invDxDy,
                    );
                }
                return dF;
            },
        );
    }

    step(): void {
        const dF = this.dF_dc();
        const dc = dF.output_mesh(
            (
                leftVal: number,
                rightVal: number,
                upVal: number,
                downVal: number,
                centerVal: number,
                invDxDy: number,
            ) => (leftVal + rightVal + upVal + downVal - 4 * centerVal) * invDxDy,
        );

        for (let j = 1; j <= this.mesh.Ny; j++) {
            for (let i = 1; i <= this.mesh.Nx; i++) {
                const idx = j * (this.mesh.Nx + 2) + i;
                this.mesh.data[idx] += this.M * dc.data[idx] * this.dt;
            }
        }
        this.mesh.boundCons.applyAll(this.mesh);
    }
}

function assertNoNaN(mesh: Mesh, step: number): void {
    const firstNaN = mesh.findFirstNaN();
    if (firstNaN !== undefined) {
        throw new Error(
            `NaN detected at step ${step} at position (x=${firstNaN.x}, y=${firstNaN.y}), flat index ${firstNaN.idx}.`,
        );
    }
}

function runSimulation(): void {
    const configPath = process.argv[2] ?? "simu_config.json";
    const simulationConfig = SimulationConfig.fromFile(configPath);
    const boundaryConditions = new BoundaryConditions(
        simulationConfig.mesh.boundaryConditions,
    );

    fs.mkdirSync(simulationConfig.output.folder_name, { recursive: true });
    console.log(`Using config: ${configPath}`);
    console.log(`Output folder: ${simulationConfig.output.folder_name}`);

    const conMesh = new Mesh(
        simulationConfig.mesh.Nx,
        simulationConfig.mesh.Ny,
        simulationConfig.mesh.dx,
        simulationConfig.mesh.dy,
        undefined,
        boundaryConditions,
    );

    conMesh.init_geometry(
        new UniformRandomInit(
            simulationConfig.mesh.minVal,
            simulationConfig.mesh.maxVal,
        ),
    );
    conMesh.boundCons.applyAll(conMesh);

    const bulk = new DoubleWellBulk(simulationConfig.energy.A);
    const interfacial = new GradientEnergy(simulationConfig.energy.kappa);

    const solver = new CH_Solver(
        conMesh,
        simulationConfig.solver.M,
        bulk.dbulk_dc(),
        interfacial.dint_dc(),
        undefined,
        simulationConfig.solver.dt,
    );

    const nanCheckEvery = simulationConfig.output.nanCheckEvery;
    if (nanCheckEvery !== false) {
        assertNoNaN(conMesh, -1);
    }

    performance.mark("start-simulation");
    for (let istep = 0; istep < simulationConfig.solver.Nstep + 1; istep++) {
        solver.step();
        if (
            nanCheckEvery !== false &&
            nanCheckEvery !== undefined &&
            istep % nanCheckEvery === 0
        ) {
            assertNoNaN(conMesh, istep);
            console.log(`NaN check passed at step ${istep}.`);
        }

        if (istep % simulationConfig.output.writeEvery === 0) {
            conMesh.write_VTK(istep, simulationConfig.output.folder_name);
        }
        if (istep % simulationConfig.output.logEvery === 0) {
            console.log(`Step: ${istep}`);
        }
    }
    performance.mark("end-simulation");
    performance.measure("Total Simulation Time", "start-simulation", "end-simulation");

    console.log(
        `Total Simulation Time: ${performance
            .getEntriesByName("Total Simulation Time")[0]
            .duration.toFixed(2)} ms`,
    );
}

runSimulation();
