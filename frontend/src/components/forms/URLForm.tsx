import type { QRAction } from "../../hooks/useQRConfig";
import type { QRContentURL } from "../../types";

interface URLFormProps {
  content: QRContentURL;
  dispatch: React.Dispatch<QRAction>;
}

export function URLForm({ content, dispatch }: URLFormProps) {
  return (
    <div>
      <label htmlFor="url-input" className="label-base">
        URL адрес
      </label>
      <input
        id="url-input"
        type="url"
        value={content.url}
        onChange={(e) => dispatch({ type: "SET_URL", payload: e.target.value })}
        placeholder="https://example.com"
        className="input-base"
        autoFocus
      />
      <p className="mt-1 text-xs text-gray-400">Введите полный URL включая https://</p>
    </div>
  );
}
