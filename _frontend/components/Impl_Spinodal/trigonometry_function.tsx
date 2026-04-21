import { useMemo, useState } from "react";

export function cos_and_sin(x: number, frequency: number): [number, number] {
    return [Math.cos(frequency * x), Math.sin(frequency * x)];
}

type Curve = {
    label: string;
    color: string;
    fn: (x: number, frequency: number) => number;
};

const CURVES: Curve[] = [
    {
        label: "sin(ωx)",
        color: "#2563eb",
        fn: (x, frequency) => Math.sin(frequency * x),
    },
    {
        label: "cos(ωx)",
        color: "#dc2626",
        fn: (x, frequency) => Math.cos(frequency * x),
    },
];

const X_MIN = -Math.PI / 2 - 0.2;
const X_MAX = Math.PI / 2 + 0.2;
const Y_MIN = -1.1;
const Y_MAX = 1.1;
const WIDTH = 1040;
const HEIGHT = 520;
const SAMPLES = 1200;

function toSvgX(x: number): number {
    return ((x - X_MIN) / (X_MAX - X_MIN)) * WIDTH;
}

function toSvgY(y: number): number {
    return HEIGHT - ((y - Y_MIN) / (Y_MAX - Y_MIN)) * HEIGHT;
}

function formatPi(value: number): string {
    if (Math.abs(value) < 1e-8) return "0";
    const ratio = value / Math.PI;
    if (Math.abs(ratio - 1) < 1e-8) return "pi";
    if (Math.abs(ratio + 1) < 1e-8) return "-pi";
    if (Math.abs(ratio - 0.5) < 1e-8) return "pi/2";
    if (Math.abs(ratio + 0.5) < 1e-8) return "-pi/2";
    return value.toFixed(2);
}

function buildCurvePath(
    fn: (x: number, frequency: number) => number,
    frequency: number
): string {
    let d = "";

    for (let i = 0; i <= SAMPLES; i++) {
        const x = X_MIN + ((X_MAX - X_MIN) * i) / SAMPLES;
        const y = fn(x, frequency);

        const sx = toSvgX(x);
        const sy = toSvgY(y);
        const command = i === 0 ? "M" : "L";
        d += `${command}${sx.toFixed(2)},${sy.toFixed(2)} `;
    }

    return d.trim();
}

export default function TrigonometryFunctionsPlot() {
    const [frequency, setFrequency] = useState(1);
    const [showSin, setShowSin] = useState(true);
    const [showCos, setShowCos] = useState(true);

    const paths = useMemo(
        () =>
            CURVES.filter(curve => {
                if (curve.label === "sin(fx)") return showSin;
                if (curve.label === "cos(fx)") return showCos;
                return true;
            }).map(curve => ({
                ...curve,
                path: buildCurvePath(curve.fn, frequency),
            })),
        [frequency, showCos, showSin]
    );

    const xTicks = [ -Math.PI / 2, 0, Math.PI / 2];
    const yTicks = [-1, -0.5, 0, 0.5, 1];

    return (
        <div className="mx-auto w-full max-w-5xl rounded-xl border border-slate-300 bg-white p-4 text-slate-900 shadow-sm">
            <div className="overflow-x-auto">
                <svg
                    viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
                    className="h-117.5 min-w-195 w-full rounded-md border border-slate-200 bg-slate-50"
                    role="img"
                    aria-label="Plot of trigonometry functions from minus pi to pi"
                >
                    {xTicks.map(tick => (
                        <g key={`xt-${tick}`}>
                            <line
                                x1={toSvgX(tick)}
                                y1={0}
                                x2={toSvgX(tick)}
                                y2={HEIGHT}
                                stroke="#e2e8f0"
                                strokeWidth={1}
                            />
                            <text
                                x={toSvgX(tick)}
                                y={HEIGHT - 8}
                                textAnchor="middle"
                                fontSize={24}
                                fill="#475569"
                            >
                                {formatPi(tick)}
                            </text>
                        </g>
                    ))}

                    {yTicks.map(tick => (
                        <g key={`yt-${tick}`}>
                            <line
                                x1={0}
                                y1={toSvgY(tick)}
                                x2={WIDTH}
                                y2={toSvgY(tick)}
                                stroke="#e2e8f0"
                                strokeWidth={1}
                            />
                            <text
                                x={6}
                                y={toSvgY(tick) - 6}
                                textAnchor="start"
                                fontSize={24}
                                fill="#475569"
                            >
                                {tick}
                            </text>
                        </g>
                    ))}

                    <line
                        x1={0}
                        y1={toSvgY(0)}
                        x2={WIDTH}
                        y2={toSvgY(0)}
                        stroke="#334155"
                        strokeWidth={1.8}
                    />
                    <line
                        x1={toSvgX(0)}
                        y1={0}
                        x2={toSvgX(0)}
                        y2={HEIGHT}
                        stroke="#334155"
                        strokeWidth={1.8}
                    />

                    {paths.map(curve => (
                        <path
                            key={curve.label}
                            d={curve.path}
                            fill="none"
                            stroke={curve.color}
                            strokeWidth={2.5}
                            strokeLinecap="round"
                        />
                    ))}
                </svg>
            </div>

            <div className="mt-4 flex flex-wrap gap-4 text-2xl">
                {paths.map(curve => (
                    <div key={curve.label} className="flex items-center gap-2">
                        <span
                            className="inline-block h-2.5 w-6 rounded-full"
                            style={{ backgroundColor: curve.color }}
                        />
                        <span className="font-mono text-slate-700 text-2xl">{curve.label}</span>
                    </div>
                ))}
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-4">
                <label htmlFor="frequency-slider" className="text-2xl font-medium">
                    Frequency ω: <span className="font-mono">{frequency.toFixed(1)}</span>
                </label>
                <input
                    id="frequency-slider"
                    type="range"
                    min={0.1}
                    max={10}
                    step={0.1}
                    value={frequency}
                    onChange={e => setFrequency(Number(e.target.value))}
                    className="w-full max-w-lg"
                />
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-6 text-2xl">
                <label className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        checked={showSin}
                        onChange={e => setShowSin(e.target.checked)}
                        className="size-4"
                    />
                    <span className="font-mono text-slate-700 text-2xl">Show sin(ωx)</span>
                </label>
                <label className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        checked={showCos}
                        onChange={e => setShowCos(e.target.checked)}
                        className="size-4"
                    />
                    <span className="font-mono text-slate-700 text-2xl">Show cos(ωx)</span>
                </label>
            </div>
        </div>
    );
}

