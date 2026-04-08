interface ColorPickerProps {
  id?: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
}

export function ColorPicker({ id, label, value, onChange }: ColorPickerProps) {
  return (
    <div className="flex items-center gap-3">
      <div className="relative flex-1">
        <label htmlFor={id} className="label-base">
          {label}
        </label>
        <div className="flex items-center gap-2">
          <input
            id={id}
            type="color"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="h-9 w-12 cursor-pointer rounded-lg border border-gray-200 p-0.5"
          />
          <input
            type="text"
            value={value}
            onChange={(e) => {
              const val = e.target.value;
              if (/^#[0-9A-Fa-f]{0,6}$/.test(val)) onChange(val);
            }}
            maxLength={7}
            className="input-base font-mono uppercase"
            placeholder="#000000"
          />
        </div>
      </div>
    </div>
  );
}
