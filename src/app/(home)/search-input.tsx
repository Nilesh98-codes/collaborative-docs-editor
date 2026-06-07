"use client";

import { SearchIcon, XIcon } from "lucide-react";
import { useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSearchParam } from "@/hooks/use-search-param";


export const SearchInput = () => {
    const [search, setSearch] = useSearchParam();
    const [value, setValue] = useState(search);

    const inputRef = useRef<HTMLInputElement>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };

    const handleClear = () => {
        setValue("");
        setSearch("");
        inputRef.current?.blur();
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSearch(value);
        inputRef.current?.blur();
    };



    return (
        <div className="flex-1 flex items-center justify-center">
            <form
                onSubmit={handleSubmit}
                className="relative max-w-[720px] w-full"
            >
                <Input
                    value={value}
                    onChange={handleChange}
                    ref={inputRef}
                    placeholder="Search documents..."
                    className="md:text-base placeholder:text-neutral-400 px-14 w-full border-none focus-visible:shadow-[0_0_0_3px_rgba(99,102,241,0.1)] bg-[#F0F4F8] rounded-full h-[48px] focus-visible:ring-0 focus:bg-white focus:border-indigo-300"
                />
                <Button
                    type="submit"
                    variant="ghost"
                    size="icon"
                    className="absolute left-3 top-1/2 -translate-y-1/2 [&_svg]:size-5 rounded-full text-neutral-400 hover:text-indigo-600"
                >
                    <SearchIcon />
                </Button>
                {value && (
                    <Button
                        onClick={handleClear}
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-3 top-1/2 -translate-y-1/2 [&_svg]:size-5 rounded-full text-neutral-400 hover:text-neutral-600"
                    >
                        <XIcon />
                    </Button>
                )}
            </form>
        </div>
    );
};