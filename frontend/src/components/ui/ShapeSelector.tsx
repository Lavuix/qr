interface ShapeSelectorProps<T extends string> {
  label: string;
  value: T;
  onChange: (value: T) => void;
  options: { value: T; label: string; icon: React.ReactNode }[];
}

export function ShapeSelector<T extends string>({
  label,
  value,
  onChange,
  options,
}: ShapeSelectorProps<T>) {
  return (
    <div>
      <p className="label-base">{label}</p>
      <div className="grid grid-cols-4 gap-1.5 sm:grid-cols-6">
        {options.map((opt) => (
          <button
            key={opt.value}
            type="button"
            title={opt.label}
            onClick={() => onChange(opt.value)}
            className={[
              "flex flex-col items-center gap-1 rounded-lg border p-2 transition-all",
              value === opt.value
                ? "border-brand-500 bg-brand-50 text-brand-600"
                : "border-gray-200 bg-white text-gray-500 hover:border-gray-300 hover:bg-gray-50",
            ].join(" ")}
          >
            {opt.icon}
            <span className="text-[9px] leading-tight text-center">{opt.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
