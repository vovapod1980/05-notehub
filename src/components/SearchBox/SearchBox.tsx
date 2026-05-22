import { useState, type ChangeEvent } from "react";
import css from "./SearchBox.module.css";

interface SearchBoxProps {
  onChange: (value: string) => void;
}

export default function SearchBox({ onChange }: SearchBoxProps) {
  const [localValue, setLocalValue] = useState<string>("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const val = e.target.value;
    setLocalValue(val);
    onChange(val); // Ця функція буде обгорнута в дебаунс в App
  };

  return (
    <input
      className={css.input}
      type="text"
      placeholder="Search notes"
      value={localValue}
      onChange={handleInputChange}
    />
  );
}
