interface SelectProps<T extends string> {
  id?: string;
  value: T;
  onChange: (value: T) => void;
  options: { value: T; label: string }[];
}

export function Select<T extends string>({ id, value, onChange, options }: SelectProps<T>) {
  return (
    <select
      id={id}
      value={value}
      onChange={(e) => onChange(e.target.value as T)}
      className="input-base"
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}
