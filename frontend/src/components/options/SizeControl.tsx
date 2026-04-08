import type { QRAction } from "../../hooks/useQRConfig";

interface SizeControlProps {
  size: number;
  dispatch: React.Dispatch<QRAction>;
}

export function SizeControl({ size, dispatch }: SizeControlProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <label htmlFor="size-range" className="label-base mb-0">
          Размер
        </label>
        <span className="text-xs font-medium text-gray-500">{size}px</span>
      </div>
      <input
        id="size-range"
        type="range"
        min={100}
        max={1000}
        step={50}
        value={size}
        onChange={(e) => dispatch({ type: "SET_SIZE", payload: Number(e.target.value) })}
        className="w-full accent-brand-600"
      />
      <div className="flex justify-between text-xs text-gray-400 mt-0.5">
        <span>100</span>
        <span>1000</span>
      </div>
    </div>
  );
}
