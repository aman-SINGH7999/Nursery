import { useState, useEffect } from "react";
import { Search } from "lucide-react";

interface GlobalSearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  debounceMs?: number;
  className?: string;
}

export default function GlobalSearch({
  value,
  onChange,
  placeholder = "Search...",
  debounceMs = 400,
  className = "",
}: GlobalSearchProps) {

  const [search, setSearch] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      onChange(search);
    }, debounceMs);

    return () => clearTimeout(timer); // cleanup previous timer
  }, [search, onChange, debounceMs]);

  return (
    <div className={`flex items-center w-full max-w-md border rounded-lg overflow-hidden bg-white shadow-sm ${className}`}>
      <div className="px-3 text-gray-400">
        <Search className="h-5 w-5" />
      </div>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder={placeholder}
        className="flex-1 px-2 py-2 text-sm text-gray-700 placeholder-gray-400 outline-none"
      />
    </div>
  );
}
