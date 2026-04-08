import type { QRAction } from "../../hooks/useQRConfig";
import type { ErrorCorrection } from "../../types";
import { Select } from "../ui/Select";

const ERROR_OPTIONS: { value: ErrorCorrection; label: string }[] = [
  { value: "L", label: "L — 7% восстановление" },
  { value: "M", label: "M — 15% восстановление" },
  { value: "Q", label: "Q — 25% восстановление" },
  { value: "H", label: "H — 30% восстановление" },
];

interface ErrorCorrectionControlProps {
  errorCorrection: ErrorCorrection;
  hasLogo?: boolean;
  dispatch: React.Dispatch<QRAction>;
}

export function ErrorCorrectionControl({ errorCorrection, hasLogo, dispatch }: ErrorCorrectionControlProps) {
  return (
    <div>
      <label htmlFor="error-correction" className="label-base">
        Коррекция ошибок
      </label>
      <Select
        id="error-correction"
        value={errorCorrection}
        onChange={(value) => dispatch({ type: "SET_ERROR_CORRECTION", payload: value })}
        options={ERROR_OPTIONS}
      />
      {hasLogo && (
        <p className="mt-1.5 text-xs text-gray-400">
          Уровень H выставлен автоматически для надёжного сканирования с логотипом
        </p>
      )}
    </div>
  );
}
