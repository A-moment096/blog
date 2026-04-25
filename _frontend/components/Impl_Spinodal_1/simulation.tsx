import { useEffect, useRef, useState } from "react";

const Nx = 64;
const Ny = 64;
const Nstep = 5000; // 总步数（可以调小一点）
const outputEvery = 50; // 每多少步存一帧
const dx = 1.0;
const dt = 0.01;
const M = 1.0;
const A = 1.0;
const kappa = 0.5;
const dcon = 0.05;
const con_init = 0.4;

const idx = (i: number, j: number) => j * Nx + i;

// df_bulk/dc = 2 A c (1-c)(1-2c)
function dfBulkDc(c: number): number {
  return 2 * A * c * (1 - c) * (1 - 2 * c);
}

// 周期边界 Laplacian
function laplacian(mesh: Float32Array, i: number, j: number): number {
  const ip = (i + 1) % Nx;
  const im = (i - 1 + Nx) % Nx;
  const jp = (j + 1) % Ny;
  const jm = (j - 1 + Ny) % Ny;

  const v_c = mesh[idx(i, j)];
  const v_l = mesh[idx(im, j)];
  const v_r = mesh[idx(ip, j)];
  const v_u = mesh[idx(i, jp)];
  const v_d = mesh[idx(i, jm)];

  return (v_l + v_r + v_u + v_d - 4 * v_c) / (dx * dx);
}

// δF/δc = df/dc - kappa ∇²c
function computeDfDc(con: Float32Array): Float32Array {
  const out = new Float32Array(Nx * Ny);
  for (let j = 0; j < Ny; j++) {
    for (let i = 0; i < Nx; i++) {
      const c = con[idx(i, j)];
      const bulk = dfBulkDc(c);
      const lap = laplacian(con, i, j);
      out[idx(i, j)] = bulk - kappa * lap;
    }
  }
  return out;
}

// dc/dt = M ∇²(δF/δc)
function computeDc(dfDc: Float32Array): Float32Array {
  const out = new Float32Array(Nx * Ny);
  for (let j = 0; j < Ny; j++) {
    for (let i = 0; i < Nx; i++) {
      out[idx(i, j)] = M * laplacian(dfDc, i, j);
    }
  }
  return out;
}

// 简单线性伪彩色：c ∈ [cmin, cmax] 映射到蓝→红
function colorMap(
  c: number,
  cmin: number,
  cmax: number
): [number, number, number] {
  const t = Math.max(0, Math.min(1, (c - cmin) / (cmax - cmin || 1)));
  // 蓝(0,0,255) -> 红(255,0,0)
  const r = Math.round(255 * t);
  const g = 0;
  const b = Math.round(255 * (1 - t));
  return [r, g, b];
}

export default function PhaseFieldViewer() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [frames, setFrames] = useState<Float32Array[]>([]);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isComputing, setIsComputing] = useState(true);

  // 预计算所有帧
  useEffect(() => {
    const now = performance.now();
    setIsComputing(true);

    // 初始化浓度场
    let con = new Float32Array(Nx * Ny);
    for (let j = 0; j < Ny; j++) {
      for (let i = 0; i < Nx; i++) {
        const noise = (Math.random() * 2 - 1) * dcon;
        con[idx(i, j)] = con_init + noise;
      }
    }

    const snapshots: Float32Array[] = [];
    snapshots.push(con.slice()); // 初始帧

    for (let step = 1; step <= Nstep; step++) {
      const dfDc = computeDfDc(con);
      const dc = computeDc(dfDc);

      for (let j = 0; j < Ny; j++) {
        for (let i = 0; i < Nx; i++) {
          con[idx(i, j)] += dt * dc[idx(i, j)];
        }
      }

      if (step % outputEvery === 0) {
        snapshots.push(con.slice());
      }
    }

    setFrames(snapshots);
    setCurrentFrame(0);
    setIsComputing(false);
    console.log(`预计算完成，耗时 ${performance.now() - now} ms`);
  }, []);

  // 把当前帧画到 canvas
  useEffect(() => {
    if (!canvasRef.current || frames.length === 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const frame = frames[currentFrame];

    // 计算当前帧的 cmin/cmax 用于颜色映射
    let cmin = Infinity;
    let cmax = -Infinity;
    for (let k = 0; k < frame.length; k++) {
      const v = frame[k];
      if (v < cmin) cmin = v;
      if (v > cmax) cmax = v;
    }

    const imageData = ctx.createImageData(Nx, Ny);
    const data = imageData.data;

    for (let j = 0; j < Ny; j++) {
      for (let i = 0; i < Nx; i++) {
        const c = frame[idx(i, j)];
        const [r, g, b] = colorMap(c, cmin, cmax);
        const p = (j * Nx + i) * 4;
        data[p + 0] = r;
        data[p + 1] = g;
        data[p + 2] = b;
        data[p + 3] = 255;
      }
    }

    ctx.putImageData(imageData, 0, 0);
  }, [frames, currentFrame]);

  const totalFrames = frames.length;

  return (
    <div className="text-skin-base p-3">
      {isComputing && <p>正在预计算相场演化，请稍候…</p>}

      <canvas
        ref={canvasRef}
        width={Nx}
        height={Ny}
        className="mx-auto mb-4 block h-128 w-lg border border-[#ccc] [image-rendering:pixelated]"
      />

      {totalFrames > 0 && (
        <>
          <input
            type="range"
            min={0}
            max={totalFrames - 1}
            value={currentFrame}
            onChange={e => setCurrentFrame(Number(e.target.value))}
            className="w-full"
          />
          <div className="mt-2">
            帧：{currentFrame + 1} / {totalFrames}（时间步 ≈{" "}
            {currentFrame * outputEvery}）
          </div>
        </>
      )}
    </div>
  );
}
