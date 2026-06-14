import { useState, useRef, useEffect } from "react";
import "./Autocomplete.css";
import highlight from "./utilities/highlight";

export default function Autocomplete({
    onSelect,
    onChange,
    placeholder,
    options,
}: {
    onSelect: (selection: string) => void,
    onChange: (event: any) => void,
    placeholder: string,
    options: string[]
}) {
    const [query, setQuery] = useState("");
    const [open, setOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState(-1);

    const inputRef = useRef<any>(null);
    const listRef = useRef<any>(null);

    const filtered = query.trim()
        ? options.filter((d) => d.toLowerCase().includes(query.toLowerCase()))
        : options;

    useEffect(() => {
        setActiveIndex(-1);
    }, [query]);

    useEffect(() => {
        if (activeIndex >= 0 && listRef.current) {
            const active = listRef.current.querySelector(`[data-index="${activeIndex}"]`);
            active?.scrollIntoView({ block: "nearest" });
        }
    }, [activeIndex]);

    function select(item: string) {
        setQuery(item);
        setOpen(false);
        setActiveIndex(-1);
        onSelect(item)
    }

    function handleKeyDown(event: any) {
        if (!open) {
            if (event.key === "ArrowDown") { setOpen(true); return; }
        }
        if (event.key === "ArrowDown") {
            event.preventDefault();
            setActiveIndex((i) => Math.min(i + 1, filtered.length - 1));
        } else if (event.key === "ArrowUp") {
            event.preventDefault();
            setActiveIndex((i) => Math.max(i - 1, 0));
        } else if (event.key === "Enter") {
            if (activeIndex >= 0) select(filtered[activeIndex]);
            else setOpen(false);
        } else if (event.key === "Escape") {
            setOpen(false);
            inputRef.current?.blur();
        }
    }

    return (
        <div className="autocomplete-wrapper">
            <div className="autocomplete-input-container">
                <input
                    ref={inputRef}
                    className="autocomplete-input"
                    value={query}
                    onChange={(e) => { setQuery(e.target.value); setOpen(true); onChange(e); }}
                    onFocus={() => setOpen(true)}
                    onBlur={() => setTimeout(() => setOpen(false), 150)}
                    onKeyDown={handleKeyDown}
                    placeholder={placeholder}
                    autoComplete="off"
                    role="combobox"
                    aria-expanded={open}
                    aria-haspopup="listbox"
                    aria-autocomplete="list"
                    aria-activedescendant={activeIndex >= 0 ? `opt-${activeIndex}` : undefined}
                />
                {query && (
                    <button
                        className="autocomplete-clear-btn"
                        tabIndex={-1}
                        onClick={() => { setQuery(""); setOpen(false); inputRef.current?.focus(); }}
                        aria-label="Clear"
                    >
                        ×
                    </button>
                )}
            </div>

            {open && (
                <ul
                    ref={listRef}
                    className="autocomplete-dropdown"
                    role="listbox"
                >
                    {filtered.length === 0 ? (
                        <li className="autocomplete-empty">No results for "{query}"</li>
                    ) : (
                        filtered.map((item, index) => {
                            return (
                                <li
                                    key={item}
                                    id={`opt-${index}`}
                                    data-index={index}
                                    role="option"
                                    aria-selected={activeIndex === index}
                                    className={`autocomplete-option${activeIndex === index ? " autocomplete-option--active" : ""}`}
                                    onMouseDown={(e) => { e.preventDefault(); select(item); }}
                                    onMouseEnter={() => setActiveIndex(index)}
                                >
                                    <span className="autocomplete-option-label">{highlight(item, query)}</span>
                                </li>
                            );
                        })
                    )}
                </ul>
            )}
        </div>
    );
}