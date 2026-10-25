import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export interface GlobalSelectOption {
  label: string;
  value: string;
}

interface GlobalSelectProps {
  value?: string;
  onChange: (value: string) => void;
  options: GlobalSelectOption[];
  placeholder?: string;
  className?: string;
}

export default function GlobalSelect({
  value,
  onChange,
  options,
  placeholder = "Select option",
  className = "w-40 md:w-56",
}: GlobalSelectProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className={`w-40 md:w-56 ${className}`}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>

      <SelectContent>
        {options.map((opt) => (
          <SelectItem key={opt.value} value={opt.value}>
            {opt.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
