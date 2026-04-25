import { useState } from "react";
import { Mafs, Coordinates, Plot, Theme, Line, Point } from "mafs";
import Card from "../common/card";

// Numerical integration using Simpson's rule
function integrate(
    f: (x: number) => number,
    a: number,
    b: number,
    steps = 1000
): number {
    const h = (b - a) / steps;
    let sum = f(a) + f(b);
    for (let i = 1; i < steps; i++) {
        sum += f(a + i * h) * (i % 2 === 0 ? 2 : 4);
    }
    return (sum * h) / 3;
}
function fourierCoefficients(
    f: (x: number) => number,
    a: number,
    b: number,
    order: number
): { a: number[]; b: number[] } {
    const L = (b - a) / 2;
    const c = (a + b) / 2;
    const coeffA: number[] = [];
    const coeffB: number[] = [];
    for (let n = 0; n <= order; n++) {
        coeffA.push(
            (1 / L) * integrate(
                (x) => f(x) * Math.cos((n * Math.PI * (x - c)) / L),
                a, b
            )
        );
        coeffB.push(
            (1 / L) * integrate(
                (x) => f(x) * Math.sin((n * Math.PI * (x - c)) / L),
                a, b
            )
        );
    }
    return { a: coeffA, b: coeffB };
}

function fourierSeries(
    x: number,
    a: number,
    b: number,
    coeffA: number[],
    coeffB: number[],
    order: number
): number {
    const L = (b - a) / 2;
    const c = (a + b) / 2;
    let sum = coeffA[0] / 2;
    for (let n = 1; n <= order; n++) {
        sum += coeffA[n] * Math.cos((n * Math.PI * (x - c)) / L);
        sum += coeffB[n] * Math.sin((n * Math.PI * (x - c)) / L);
    }
    return sum;
}

type FunctionConfig = {
    label: string;
    f: (x: number) => number;
    range: [number, number];  // replaces L
    viewBox: { x: [number, number]; y: [number, number] };
    xAxis?: { lines?: number; labels?: (n: number) => string };
    yAxis?: { lines?: number; labels?: (n: number) => string };
};

const FUNCTIONS: Record<string, FunctionConfig> = {
    x: {
        label: "y = x [-1,1]",
        f: (x) => x,
        range: [-1, 1],
        viewBox: { x: [-Math.PI - 0.5, Math.PI + 0.5], y: [-4, 4] },
        xAxis: { lines: 1, labels: (n) => n === 0 ? "" : String(n) },
        yAxis: { lines: 1, labels: (n) => n === 0 ? "" : String(n) },
    },
    exp: {
        label: "y = eˣ [-5,5]",
        f: (x) => Math.exp(x),
        range: [-5, 5],
        viewBox: { x: [-6, 6], y: [-50, 200] },
        xAxis: { lines: 1, labels: (n) => n === 0 ? "" : String(n) },
        yAxis: { lines: 50, labels: (n) => n === 0 ? "" : String(n) },
    },
    ln1: {
        label: "y = ln(x+1) [0,5]",
        f: (x) => Math.log(x + 1),
        range: [0, 5],
        viewBox: { x: [-0.5, 6], y: [-1, 3] },
        xAxis: { lines: 1, labels: (n) => n === 0 ? "" : String(n) },
        yAxis: { lines: 1, labels: (n) => n === 0 ? "" : String(n) },
    },
    ln2: {
        label: "y = ln(x+1) [-0.9,4]",
        f: (x) => Math.log(x + 1),
        range: [-0.9, 4],
        viewBox: { x: [-0.5, 5], y: [-1, 3] },
        xAxis: { lines: 1, labels: (n) => n === 0 ? "" : String(n) },
        yAxis: { lines: 1, labels: (n) => n === 0 ? "" : String(n) },
    }
};

const ORDER_COLORS = [
    Theme.red, Theme.orange, Theme.yellow, Theme.green,
    Theme.blue, Theme.violet, Theme.pink, Theme.indigo,
];


export default function FourierSeriesPlot() {
    const [order, setOrder] = useState(1);
    const [selectedKey, setSelectedKey] = useState("x");
    const [view, setView] = useState<"real" | "frequency">("real");

    const fn = FUNCTIONS[selectedKey];
    const { a, b } = fourierCoefficients(fn.f, fn.range[0], fn.range[1], order);

    const amplitudes = Array.from({ length: order + 1 }, (_, n) =>
        n === 0
            ? Math.abs(a[n] / 2)
            : Math.sqrt(a[n] ** 2 + b[n] ** 2)
    );
    const maxAmplitude = Math.max(...amplitudes, 1);


    return (
        <Card>
            <div className="mb-4 flex flex-wrap gap-3">
                {Object.entries(FUNCTIONS).map(([key, config]) => (
                    <button
                        key={key}
                        onClick={() => setSelectedKey(key)}
                        className={`rounded-lg px-4 py-1.5 font-serif text-2xl font-medium transition-colors ${selectedKey === key
                            ? "bg-slate-800 text-white dark:bg-slate-200 dark:text-slate-900"
                            : "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-300"
                            }`}
                    >
                        {config.label}
                    </button>
                ))}
            </div>

            {view === "real" ? (
                <Mafs
                    zoom={{ min: 0.5, max: 5 }}
                    viewBox={fn.viewBox}
                    preserveAspectRatio={false}
                    height={400}>
                    <Coordinates.Cartesian xAxis={fn.xAxis} yAxis={fn.yAxis} />
                    <Plot.OfX y={fn.f} color={Theme.indigo} style="dashed" />
                    <Plot.OfX
                        y={(x) => fourierSeries(x, fn.range[0], fn.range[1], a, b, order)}
                        color={ORDER_COLORS[order % ORDER_COLORS.length]}
                    />
                </Mafs>
            ) : (
                <Mafs
                    // zoom={{ min: 0.5, max: 5 }}
                    viewBox={{ x: [-0.5, order + 0.5], y: [0, maxAmplitude * 1.2] }}
                    preserveAspectRatio={false}
                    height={400}
                >
                    <Coordinates.Cartesian
                        xAxis={{
                            lines: 1,
                            labels: (n) => Number.isInteger(n) && n >= 0 ? String(n) : "",
                        }}
                        yAxis={{
                            lines: maxAmplitude / 4,
                            labels: (n) => n === 0 ? "" : n.toFixed(1),
                        }}
                    />
                    {amplitudes.map((amp, n) => (
                        <g key={n}>
                            <Line.Segment
                                point1={[n, 0]}
                                point2={[n, amp]}
                                color={ORDER_COLORS[n % ORDER_COLORS.length]}
                            />
                            <Point
                                x={n}
                                y={amp}
                                color={ORDER_COLORS[n % ORDER_COLORS.length]}
                            />
                        </g>
                    ))}
                </Mafs>
            )}
            <div className="mb-4 flex justify-end">
                <button
                    onClick={() => setView(v => v === "real" ? "frequency" : "real")}
                    className="rounded-lg px-4 py-1.5 font-serif text-2xl font-medium bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-300"
                >
                    {view === "real" ? "Switch to Frequency Space" : "Switch to Real Space"}
                </button>
            </div>
            {view === "frequency" ? (
                <div className="mt-4 text-2xl font-serif text-slate-600 dark:text-slate-400">
                    Showing amplitude spectrum √(aₙ² + bₙ²) for n = 0 to {order}
                </div>
            ) : (
                <div className="mt-4 flex items-center gap-3 text-2xl">
                    <span className="inline-block h-2.5 w-6 rounded-full"
                        style={{ backgroundColor: Theme.indigo }} />
                    <span className="font-serif">{fn.label} (exact)</span>
                    <span className="inline-block h-2.5 w-6 rounded-full ml-4"
                        style={{ backgroundColor: ORDER_COLORS[order % ORDER_COLORS.length] }} />
                    <span className="font-serif">Fourier order {order}</span>
                </div>
            )}
            <div className="mt-5 flex flex-wrap items-center gap-4">
                <label className="text-2xl font-medium">
                    Order: <span className="font-serif">{order}</span>
                </label>
                <input
                    type="range"
                    min={1} max={20} step={1}
                    value={order}
                    onChange={e => setOrder(Number(e.target.value))}
                    className="w-full max-w-lg"
                />
            </div>
        </Card>
    );
}