import { useState } from "react";
import { Mafs, Coordinates, Plot, Theme } from "mafs";
import Card from "../common/card";

function factorial(n: number): number {
    return n <= 1 ? 1 : n * factorial(n - 1);
}

type FunctionConfig = {
    label: string;
    exact: (x: number) => number;
    taylor: (x: number, order: number) => number;
    viewBox: { x: [number, number]; y: [number, number] };
    xAxis?: { lines?: number; labels?: (n: number) => string };
    yAxis?: { lines?: number; labels?: (n: number) => string };
};

const FUNCTIONS: Record<string, FunctionConfig> = {
    sin: {
        label: "sin(x)",
        exact: (x) => Math.sin(x),
        taylor: (x, order) => {
            let sum = 0;
            for (let n = 0; n < order; n++) {
                const power = 2 * n + 1;
                sum += (Math.pow(-1, n) * Math.pow(x, power)) / factorial(power);
            }
            return sum;
        },
        viewBox: { x: [-2 * Math.PI, 2 * Math.PI], y: [-2.5, 2.5] },
        xAxis: {
            lines: Math.PI / 2,
            labels: (n) => {
                if (n === 0) return "0";
                const ratio = n / Math.PI;
                if (Math.abs(ratio - 1) < 1e-8) return "π";
                if (Math.abs(ratio + 1) < 1e-8) return "-π";
                if (Math.abs(ratio - 2) < 1e-8) return "2π";
                if (Math.abs(ratio + 2) < 1e-8) return "-2π";
                if (Math.abs(ratio - 0.5) < 1e-8) return "π/2";
                if (Math.abs(ratio + 0.5) < 1e-8) return "-π/2";
                return "";
            },
        },
        yAxis: { lines: 1, labels: (n) => n === 0 ? "" : String(n) },
    },
    exp: {
        label: "eˣ",
        exact: (x) => Math.exp(x),
        taylor: (x, order) => {
            let sum = 0;
            for (let n = 0; n <= order; n++) {
                sum += Math.pow(x, n) / factorial(n);
            }
            return sum;
        },
        viewBox: { x: [-3, 3], y: [-1, 10] },
        xAxis: { lines: 1, labels: (n) => n === 0 ? "" : String(n) },
        yAxis: { lines: 2, labels: (n) => n === 0 ? "" : String(n) },
    },
    ln: {
        label: "ln(1+x)",
        exact: (x) => Math.log(1 + x),
        taylor: (x, order) => {
            let sum = 0;
            for (let n = 1; n <= order; n++) {
                sum += (Math.pow(-1, n + 1) * Math.pow(x, n)) / n;
            }
            return sum;
        },
        viewBox: { x: [-2, 4], y: [-3, 3] },
        xAxis: { lines: 1, labels: (n) => n === 0 ? "" : String(n) },
        yAxis: { lines: 1, labels: (n) => n === 0 ? "" : String(n) },
    },
    ln_3: {
        label: "ln(3+x)",
        exact: (x) => Math.log(3 + x),
        taylor: (x, order) => {
            let sum = Math.log(3);
            for (let n = 1; n <= order; n++) {
                sum += (Math.pow(-1, n + 1) * Math.pow((x), n)) * (1 / Math.pow(3, n)) / n;
            }
            return sum;
        },
        viewBox: { x: [-4, 2], y: [-3, 3] },
        xAxis: { lines: 1, labels: (n) => n === 0 ? "" : String(n) },
        yAxis: { lines: 1, labels: (n) => n === 0 ? "" : String(n) },
    },
};

const ORDER_COLORS = [
    Theme.red,
    Theme.orange,
    Theme.yellow,
    Theme.green,
    Theme.blue,
    Theme.violet,
    Theme.pink,
    Theme.indigo,
];

export default function TaylorExpansionPlot() {
    const [order, setOrder] = useState(1);
    const [selectedKey, setSelectedKey] = useState<string>("sin");

    const fn = FUNCTIONS[selectedKey];

    return (
        <Card>
            <div className="mb-4 flex flex-wrap gap-3">
                {Object.entries(FUNCTIONS).map(([key, config]) => (
                    <button
                        key={key}
                        onClick={() => setSelectedKey(key)}
                        className={`rounded-lg px-4 py-1.5 font-serif text-sm font-medium transition-colors ${selectedKey === key
                            ? "bg-slate-800 text-white"
                            : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                            }`}
                    >
                        {config.label}
                    </button>
                ))}
            </div>

            <Mafs
                viewBox={fn.viewBox}
                preserveAspectRatio={false}
                height={400}
                zoom={{ min: 0.5, max: 5 }}
            >
                <Coordinates.Cartesian
                    xAxis={fn.xAxis}
                    yAxis={fn.yAxis}
                />
                <Plot.OfX
                    y={fn.exact}
                    color={Theme.indigo}
                    style="dashed"
                />
                <Plot.OfX
                    y={(x) => fn.taylor(x, order)}
                    color={ORDER_COLORS[order % ORDER_COLORS.length]}
                />
            </Mafs>

            <div className="mt-4 flex items-center gap-3 text-2xl">
                <span className="inline-block h-2.5 w-6 rounded-full"
                    style={{ backgroundColor: Theme.indigo }} />
                <span className="font-serif">{fn.label} (exact)</span>
                <span className="inline-block h-2.5 w-6 rounded-full ml-4"
                    style={{ backgroundColor: ORDER_COLORS[order % ORDER_COLORS.length] }} />
                <span className="font-serif">Taylor order {order}</span>
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-4">
                <label className="text-2xl font-medium">
                    Order: <span className="font-serif">{order}</span>
                </label>
                <input
                    type="range"
                    min={1} max={10} step={1}
                    value={order}
                    onChange={e => setOrder(Number(e.target.value))}
                    className="w-full max-w-lg"
                />
            </div>
        </Card>
    );
}