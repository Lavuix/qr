import type { QRAction } from "../../hooks/useQRConfig";

interface MarginControlProps {
  margin: number;
  dispatch: React.Dispatch<QRAction>;
}

export function MarginControl({ margin, dispatch }: MarginControlProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <label htmlFor="margin-range" className="label-base mb-0">
          Отступ (quiet zone)
        </label>
        <span className="text-xs font-medium text-gray-500">{margin}</span>
      </div>
      <input
        id="margin-range"
        type="range"
        min={0}
        max={20}
        step={1}
        value={margin}
        onChange={(e) => dispatch({ type: "SET_MARGIN", payload: Number(e.target.value) })}
        className="w-full accent-brand-600"
      />
      <div className="flex justify-between text-xs text-gray-400 mt-0.5">
        <span>0</span>
        <span>20</span>
      </div>
    </div>
  );
}
