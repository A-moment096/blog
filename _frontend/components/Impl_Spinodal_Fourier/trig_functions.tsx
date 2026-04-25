import { useState } from "react";
import { Mafs, Coordinates, Plot, Theme } from "mafs";

import Card from "../common/card";

export default function TrigFunctionPlot() {
    const [frequency, setFrequency] = useState(1);
    const [showSin, setShowSin] = useState(true);
    const [showCos, setShowCos] = useState(true);

    return (
        <Card>
            <Mafs
                viewBox={{ x: [-Math.PI - 0.2, Math.PI + 0.2], y: [-1.1, 1.1] }}
                preserveAspectRatio={false}
                height={300}
            >
                <Coordinates.Cartesian
                    xAxis={{
                        lines: Math.PI / 2, labels: (n) => {
                            if (n === 0) return "0";
                            const ratio = n / Math.PI;
                            if (Math.abs(ratio - 1) < 1e-8) return "π";
                            if (Math.abs(ratio + 1) < 1e-8) return "-π";
                            if (Math.abs(ratio - 0.5) < 1e-8) return "π/2";
                            if (Math.abs(ratio + 0.5) < 1e-8) return "-π/2";
                            return `${ratio.toFixed(2)}π`;
                        }
                    }}
                    yAxis={{ lines: 0.5, labels: (n) => n === 0 ? "" : String(n) }}
                />
                {showSin && (
                    <Plot.OfX
                        y={(x) => Math.sin(frequency * x)}
                        color={Theme.blue}
                    />
                )}
                {showCos && (
                    <Plot.OfX
                        y={(x) => Math.cos(frequency * x)}
                        color={Theme.red}
                    />
                )}
            </Mafs>
            <div className="mt-5 flex flex-wrap items-center gap-4">
                <label className="text-2xl font-medium">
                    Frequency ω: <span className="font-serif">{frequency.toFixed(1)}</span>
                </label>
                <input
                    type="range"
                    min={1} max={10} step={1}
                    value={frequency}
                    onChange={e => setFrequency(Number(e.target.value))}
                    className="w-full max-w-lg"
                />
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-6 text-2xl">
                <label className="flex items-center gap-2">
                    <input type="checkbox" checked={showSin}
                        onChange={e => setShowSin(e.target.checked)} className="size-4" />
                    <span className="font-serif text-blue-600">sin(ωx)</span>
                </label>
                <label className="flex items-center gap-2">
                    <input type="checkbox" checked={showCos}
                        onChange={e => setShowCos(e.target.checked)} className="size-4" />
                    <span className="font-serif text-red-600">cos(ωx)</span>
                </label>
            </div>
        </Card>
    );
}

