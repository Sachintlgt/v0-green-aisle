"use client";

import * as React from "react";
import { X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

type FreeInputMultiSelectProps = {
  selected: string[];
  onChange: (selected: string[]) => void;
  placeholder?: string;
  label?: string | React.ReactElement;
  max?: number;
};

export function FreeInputMultiSelect({
  selected,
  onChange,
  placeholder = "Type and press Enter...",
  label,
  max = 6,
}: FreeInputMultiSelectProps) {
  const [inputValue, setInputValue] = React.useState("");

  const handleUnselect = (item: string) => {
    onChange(selected.filter((s) => s !== item));
  };

  const handleAdd = (value: string) => {
    const trimmed = value.trim();
    if (trimmed && !selected.includes(trimmed) && selected.length < max) {
      onChange([...selected, trimmed]);
    }
    setInputValue("");
  };

  const limitReached = selected.length >= max;

  return (
    <div className="space-y-2">
      {label && (
        <label htmlFor="feature-input" className="pt-2 text-sm font-medium text-foreground">
          {label}
        </label>
      )}
      <Input
        id="feature-input"
        type="text"
        placeholder={placeholder}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            handleAdd(inputValue);
          }
        }}
        disabled={limitReached}
        className={limitReached ? "border-destructive" : ""}
      />

      {selected.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-1">
          {selected.map((item) => (
            <Badge key={item} variant="secondary">
              {item}
              <button
                className="ml-1 rounded-full focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                onMouseDown={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                onClick={() => handleUnselect(item)}
              >
                <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
              </button>
            </Badge>
          ))}
        </div>
      )}

      {limitReached && (
        <p className="text-sm text-destructive">You can add up to {max} features only.</p>
      )}
    </div>
  );
}
