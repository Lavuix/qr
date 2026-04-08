import type { QRAction } from "../../hooks/useQRConfig";
import type { QRCustomization, DotType, CornerSquareType, CornerDotType } from "../../types";
import { ColorPicker } from "../ui/ColorPicker";
import { FileUpload } from "../ui/FileUpload";
import { ShapeSelector } from "../ui/ShapeSelector";
import { DotIcons, CornerSquareIcons, CornerDotIcons } from "../ui/shapeIcons";

const DOT_OPTIONS: { value: DotType; label: string; icon: React.ReactNode }[] = [
  { value: "square",        label: "Квадрат",    icon: DotIcons.square },
  { value: "dots",          label: "Круг",       icon: DotIcons.dots },
  { value: "rounded",       label: "Скруглён.",  icon: DotIcons.rounded },
  { value: "classy",        label: "Classy",     icon: DotIcons.classy },
  { value: "classy-rounded",label: "Cl.Round",   icon: DotIcons["classy-rounded"] },
  { value: "extra-rounded", label: "Ext.Round",  icon: DotIcons["extra-rounded"] },
];

const CORNER_SQUARE_OPTIONS: { value: CornerSquareType; label: string; icon: React.ReactNode }[] = [
  { value: "square",        label: "Квадрат",    icon: CornerSquareIcons.square },
  { value: "dot",           label: "Круг",       icon: CornerSquareIcons.dot },
  { value: "extra-rounded", label: "Скруглён.",  icon: CornerSquareIcons["extra-rounded"] },
];

const CORNER_DOT_OPTIONS: { value: CornerDotType; label: string; icon: React.ReactNode }[] = [
  { value: "square", label: "Квадрат", icon: CornerDotIcons.square },
  { value: "dot",    label: "Круг",    icon: CornerDotIcons.dot },
];

interface CustomizationPanelProps {
  customization: QRCustomization;
  dispatch: React.Dispatch<QRAction>;
}

export function CustomizationPanel({ customization, dispatch }: CustomizationPanelProps) {
  return (
    <div className="space-y-5">
      <ColorPicker
        id="fg-color"
        label="Цвет QR"
        value={customization.foregroundColor}
        onChange={(value) => dispatch({ type: "SET_FG_COLOR", payload: value })}
      />
      <ColorPicker
        id="bg-color"
        label="Цвет фона"
        value={customization.backgroundColor}
        onChange={(value) => dispatch({ type: "SET_BG_COLOR", payload: value })}
      />

      <div className="border-t border-gray-100 pt-4 space-y-4">
        <ShapeSelector
          label="Форма модулей"
          value={customization.dotType}
          onChange={(value) => dispatch({ type: "SET_DOT_TYPE", payload: value })}
          options={DOT_OPTIONS}
        />
        <ShapeSelector
          label="Форма угловых рамок"
          value={customization.cornerSquareType}
          onChange={(value) => dispatch({ type: "SET_CORNER_SQUARE_TYPE", payload: value })}
          options={CORNER_SQUARE_OPTIONS}
        />
        <ShapeSelector
          label="Форма угловых точек"
          value={customization.cornerDotType}
          onChange={(value) => dispatch({ type: "SET_CORNER_DOT_TYPE", payload: value })}
          options={CORNER_DOT_OPTIONS}
        />
      </div>

      <div className="border-t border-gray-100 pt-4 space-y-3">
        <p className="label-base">Логотип в центре</p>
        <FileUpload
          logoDataUrl={customization.logoDataUrl}
          onUpload={(dataUrl) => dispatch({ type: "SET_LOGO", payload: dataUrl })}
          onRemove={() => dispatch({ type: "SET_LOGO", payload: null })}
        />
        {customization.logoDataUrl && (
          <div>
            <div className="flex items-center justify-between mb-1">
              <label htmlFor="logo-size-range" className="label-base mb-0">
                Размер логотипа
              </label>
              <span className="text-xs font-medium text-gray-500">
                {Math.round(customization.logoSize * 100)}%
              </span>
            </div>
            <input
              id="logo-size-range"
              type="range"
              min={0.1}
              max={0.5}
              step={0.05}
              value={customization.logoSize}
              onChange={(e) =>
                dispatch({ type: "SET_LOGO_SIZE", payload: Number(e.target.value) })
              }
              className="w-full accent-brand-600"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-0.5">
              <span>10%</span>
              <span>50%</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
