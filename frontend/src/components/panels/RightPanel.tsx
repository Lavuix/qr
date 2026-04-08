import type { QRConfig } from "../../types";
import { QRPreview } from "../preview/QRPreview";

interface RightPanelProps {
  config: QRConfig;
}

export function RightPanel({ config }: RightPanelProps) {
  return (
    <div className="card flex flex-col items-center justify-center min-h-[400px]">
      <p className="section-title mb-6">Предпросмотр</p>
      <QRPreview config={config} />
    </div>
  );
}
