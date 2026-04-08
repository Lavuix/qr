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
      <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {options.map((opt) => (
          <button
            key={opt.value}
            type="button"
            title={opt.label}
            onClick={() => onChange(opt.value)}
            className={[
              "flex flex-col items-center gap-1 rounded-lg border p-2 transition-all flex-shrink-0 w-14",
              value === opt.value
                ? "border-brand-500 bg-brand-50 text-brand-600"
                : "border-gray-200 bg-white text-gray-500 hover:border-gray-300 hover:bg-gray-50",
            ].join(" ")}
          >
            {opt.icon}
            <span className="text-[9px] leading-tight text-center w-full truncate">{opt.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
