import { BsCloudCheck, BsCloudSlash } from "react-icons/bs";
import { Id } from "../../../../convex/_generated/dataModel";
import { useRef, useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useDebounce } from "@/hooks/use-debounce";
import { toast } from "sonner";
import { useStatus } from "@liveblocks/react";
import { Loader2Icon } from "lucide-react";
import { isError } from "postcss/lib/css-syntax-error";

interface DocumentInputProps {
    title: string;
    id: Id<"documents">
};

export const DocumentInput = ({ title, id }: DocumentInputProps) => {
    const status = useStatus();

    const [value, setValue] = useState(title);

    const [isPending, setIsPending] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const inputRef = useRef<HTMLInputElement>(null);

    const mutate = useMutation(api.documents.updateById);

    const debouncedUpdate = useDebounce((newValue: string) => {
        if (newValue === title) return;

        setIsPending(true)
        mutate({ id, title: newValue })
          .then(() => toast.success("Document updated"))
          .catch(()=> toast.error("Something went wrong"))
          .finally(() => setIsPending(false));
    })

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setValue(newValue);
        debouncedUpdate(newValue);
    }

    const handleSUbmit= (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setIsPending(true)
        mutate({ id, title: value })
          .then(() => {
            toast.success("Document updated")
            setIsEditing(false)
        })
          .catch(()=> toast.error("Something went wrong"))
          .finally(() => setIsPending(false));
    };

    const showLoader = isPending || status === "connecting" || status === "reconnecting";
    const showError = status === "disconnected";

    return (
        <div className="flex items-center gap-2">
            {isEditing ? (
                <form onSubmit={handleSUbmit} className="relative w-fit max-w-[50ch]">
                    <span className="invisible whitespace-pre px-1.5 text-lg">
                        {value || " "}
                    </span>
                    <input
                        ref={inputRef}
                        value={value}
                        onChange={onChange}
                        onBlur={() => setIsEditing(false)}
                        className="absolute inset-0 text-lg text-black px-1.5 bg-transparent truncate focus:outline-none focus:ring-1 focus:ring-indigo-300 rounded-md"
                    />
                </form>

            ) : (
                <span
                    onClick={() => {
                        setIsEditing(true)
                        setTimeout(() => {
                            inputRef.current?.focus();
                        })
                    }}
                    className="text-lg font-medium px-1.5 cursor-pointer truncate hover:text-indigo-700">
                    {title}
                </span>
            )}
            {showError && <BsCloudSlash className="size-4 text-red-400"/>}
            {!showError && !showLoader && <BsCloudCheck className="size-4 text-emerald-500"/>}
            {showLoader && <Loader2Icon className="size-4 animate-spin text-indigo-400"/> }
            
        </div>
    )
}