import type { QRConfig } from "../../types";
import type { QRAction } from "../../hooks/useQRConfig";
import { URLForm } from "../forms/URLForm";
import { TextForm } from "../forms/TextForm";
import { WiFiForm } from "../forms/WiFiForm";
import { SizeControl } from "../options/SizeControl";
import { MarginControl } from "../options/MarginControl";
import { ErrorCorrectionControl } from "../options/ErrorCorrectionControl";
import { CustomizationPanel } from "../options/CustomizationPanel";

interface LeftPanelProps {
  config: QRConfig;
  dispatch: React.Dispatch<QRAction>;
}

export function LeftPanel({ config, dispatch }: LeftPanelProps) {
  const { content, options, customization } = config;

  return (
    <div className="space-y-4">
      {/* Content form */}
      <div className="card">
        <p className="section-title">Содержимое</p>
        {content.type === "url" && <URLForm content={content} dispatch={dispatch} />}
        {content.type === "text" && <TextForm content={content} dispatch={dispatch} />}
        {content.type === "wifi" && <WiFiForm content={content} dispatch={dispatch} />}
      </div>

      {/* Options */}
      <div className="card space-y-4">
        <p className="section-title">Параметры</p>
        <SizeControl size={options.size} dispatch={dispatch} />
        <MarginControl margin={options.margin} dispatch={dispatch} />
        <ErrorCorrectionControl
          errorCorrection={options.errorCorrection}
          hasLogo={customization.logoDataUrl !== null}
          dispatch={dispatch}
        />
      </div>

      {/* Customization */}
      <div className="card">
        <p className="section-title">Кастомизация</p>
        <CustomizationPanel customization={customization} dispatch={dispatch} />
      </div>
    </div>
  );
}
