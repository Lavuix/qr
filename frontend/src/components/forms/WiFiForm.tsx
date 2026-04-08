import type { QRAction } from "../../hooks/useQRConfig";
import type { QRContentWiFi, WiFiEncryption } from "../../types";
import { Select } from "../ui/Select";

const ENCRYPTION_OPTIONS: { value: WiFiEncryption; label: string }[] = [
  { value: "WPA", label: "WPA/WPA2" },
  { value: "WEP", label: "WEP" },
  { value: "None", label: "Без пароля" },
];

interface WiFiFormProps {
  content: QRContentWiFi;
  dispatch: React.Dispatch<QRAction>;
}

export function WiFiForm({ content, dispatch }: WiFiFormProps) {
  return (
    <div className="space-y-3">
      <div>
        <label htmlFor="wifi-ssid" className="label-base">
          Название сети (SSID)
        </label>
        <input
          id="wifi-ssid"
          type="text"
          value={content.ssid}
          onChange={(e) =>
            dispatch({ type: "SET_WIFI_FIELD", field: "ssid", value: e.target.value })
          }
          placeholder="MyNetwork"
          className="input-base"
          autoFocus
        />
      </div>

      <div>
        <label htmlFor="wifi-encryption" className="label-base">
          Тип шифрования
        </label>
        <Select
          id="wifi-encryption"
          value={content.encryption}
          onChange={(value) =>
            dispatch({ type: "SET_WIFI_FIELD", field: "encryption", value })
          }
          options={ENCRYPTION_OPTIONS}
        />
      </div>

      {content.encryption !== "None" && (
        <div>
          <label htmlFor="wifi-password" className="label-base">
            Пароль
          </label>
          <input
            id="wifi-password"
            type="text"
            value={content.password}
            onChange={(e) =>
              dispatch({ type: "SET_WIFI_FIELD", field: "password", value: e.target.value })
            }
            placeholder="Пароль Wi-Fi"
            className="input-base"
          />
        </div>
      )}

      <label className="flex cursor-pointer items-center gap-3">
        <input
          type="checkbox"
          checked={content.hidden}
          onChange={(e) =>
            dispatch({ type: "SET_WIFI_FIELD", field: "hidden", value: e.target.checked })
          }
          className="h-4 w-4 rounded border-gray-300 text-brand-600 focus:ring-brand-500"
        />
        <span className="text-sm text-gray-700">Скрытая сеть</span>
      </label>
    </div>
  );
}
