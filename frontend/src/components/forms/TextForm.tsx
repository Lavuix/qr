import type { QRAction } from "../../hooks/useQRConfig";
import type { QRContentText } from "../../types";

interface TextFormProps {
  content: QRContentText;
  dispatch: React.Dispatch<QRAction>;
}

export function TextForm({ content, dispatch }: TextFormProps) {
  return (
    <div>
      <label htmlFor="text-input" className="label-base">
        Текст
      </label>
      <textarea
        id="text-input"
        value={content.text}
        onChange={(e) => dispatch({ type: "SET_TEXT", payload: e.target.value })}
        placeholder="Введите любой текст..."
        rows={4}
        className="input-base resize-none"
        autoFocus
      />
      <p className="mt-1 text-xs text-gray-400">{content.text.length} символов</p>
    </div>
  );
}
