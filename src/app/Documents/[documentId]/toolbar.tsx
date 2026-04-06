"use client";

import { useState } from "react";
import { type ColorResult, SketchPicker } from "react-color";
import { type Level } from "@tiptap/extension-heading"
import {
    AlignCenterIcon,
    AlignJustifyIcon,
    AlignLeftIcon,
    AlignRightIcon,
    BoldIcon,
    ChevronDownIcon,
    HighlighterIcon,
    ImageIcon,
    ItalicIcon,
    Link2Icon,
    ListCollapseIcon,
    ListIcon,
    ListOrderedIcon,
    ListTodoIcon,
    LucideIcon,
    MessageSquarePlusIcon,
    MinusIcon,
    PlusIcon,
    PrinterIcon,
    Redo2Icon,
    RemoveFormattingIcon,
    ScanIcon,
    SearchIcon,
    SpellCheckIcon,
    UnderlineIcon,
    Undo2Icon,
    UploadIcon
} from "lucide-react";


import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { useEditorStore } from "@/store/use-editor-store";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Tesseract from "tesseract.js";
import { toast } from "sonner";

const LineHeightButton = () => {
    const { editor } = useEditorStore();

const lineHeights = [
    { label: "Default", value: "normal" },
    { label: "Single", value: "1" },
    { label: "1.15", value: "1.15" },
    { label: "1.5", value: "1.5" },
    { label: "Double", value: "2" },
];

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button
                    className="h-7 m-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm"
                >
                <ListCollapseIcon className="size-4" />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
                {lineHeights.map(({label, value}) => (
                    <button
                    key={value}
                    onClick={() => editor?.chain().focus().setLineHeight(value).run()}
                    className={cn(
                        "flex items-center gap-x-2 ps-2 py-1 rounded-sm hover:bg-neutral-200/80",
                        editor?.getAttributes("paragraph").lineHeight === value && "bg-neutral-200/80"                 
                        )}
                    >
                    
                        <span className="text-sm" >{label}</span>
                    </button>
                ))}

            </DropdownMenuContent>

        </DropdownMenu>
    );
}

const FontSizeButton = () => {
    const { editor } = useEditorStore();

    const currentFontSize = editor?.getAttributes("textStyle").fontSize 
    ? editor.getAttributes("textStyle").fontSize.replace("px", "")
    : "16";
    
    const [fontSize, setFontSize] = useState(currentFontSize);
    const [inputValue, setInputValue] = useState(fontSize);
    const [isEditing, setIsEditing] = useState(false);

    const updateFontSize = (newSize: string) => {
        const size = parseInt(newSize); 
        if (!isNaN(size) && size > 0) {
            editor?.chain().focus().setFontSize(`${size}px`).run();
            setFontSize(newSize);
            setInputValue(newSize);
            setIsEditing(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
    };

    const handleInputBlur = () => {
        updateFontSize(inputValue);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            updateFontSize(inputValue);
            editor?.commands.focus();
        }
    };

    const increment = () => {
        const newSize = (parseInt(fontSize) + 1).toString();
        updateFontSize(newSize);
    }

    const decrement = () => {
        const newSize = (parseInt(fontSize) - 1).toString();
        if (parseInt(newSize) > 0) {
         updateFontSize(newSize);
        }
    }


    return (
        <div className="flex items-center gap-x-0.5">
            <button 
            onClick={decrement}
            className="h-7 w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80"
            >
                <MinusIcon className="size-4" />
            </button>
            {isEditing ? (
                <input 
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                onKeyDown={handleKeyDown}
                className="h-7 w-10 text-sm text-center border border-neutral-400 rounded-sm bg-transparent focus:outline-none focus: ring-0" 
                />
            ): (
                <button
                onClick={() => {
                    setIsEditing(true);
                    setFontSize(currentFontSize);
                }}
                className="h-7 w-10 text-sm text-center border border-neutral-400 rounded-sm hover:bg-neutral-200/80"
                >
                    {currentFontSize}

                </button>
            )}
            <button 
            onClick={increment}
            className="h-7 w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80"
            >
                <PlusIcon className="size-4" />
            </button>


        </div>
    );
}

const ListButton = () => {
    const { editor } = useEditorStore();

    const lists = [
        {
            label: "Bullet List",
            icon: ListIcon,
            isActive: () => editor?.isActive("bulletList"),
            onClick: () => editor?.chain().focus().toggleBulletList().run()
        },
        {
            label: "Ordered List",
            icon: ListOrderedIcon,
            isActive: () => editor?.isActive("orderedList"),
            onClick: () => editor?.chain().focus().toggleOrderedList().run()
        }
    ]

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button
                    className="h-7 m-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm"
                >
                    <ListIcon className="size-4" />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
                {lists.map(({label, icon: Icon, onClick, isActive}) => (
                    <button
                    key={label}
                    onClick={onClick}
                    className={cn(
                        "flex items-center gap-x-2 ps-2 py-1 rounded-sm hover:bg-neutral-200/80",
                        isActive() && "bg-neutral-200/80"                 
                        )}
                    >
                        <Icon className="size-4"/>
                        <span className="text-sm" >{label}</span>
                    </button>
                ))}

            </DropdownMenuContent>

        </DropdownMenu>
    );
}

const AlignButton = () => {
    const { editor } = useEditorStore();

    const alignments = [
        {
            label: "Align Left",
            value: "left",
            icon: AlignLeftIcon
        },
        {
            label: "Align Center",
            value: "center",
            icon: AlignCenterIcon
        },
        {
            label: "Align Right",
            value: "right",
            icon: AlignRightIcon
        },
        {
            label: "Align Justify",
            value: "justify",
            icon: AlignJustifyIcon
        },
    ]

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button
                    className="h-7 m-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm"
                >
                    <AlignLeftIcon className="size-4" />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
                {alignments.map(({label, value, icon: Icon}) => (
                    <button
                    key={value}
                    onClick={() => editor?.chain().focus().setTextAlign(value).run()}
                    className={cn(
                        "flex items-center gap-x-2 ps-2 py-1 rounded-sm hover:bg-neutral-200/80",
                        editor?.isActive({ textAlign: value }) && "bg-neutral-200/80"                 
                        )}
                    >
                        <Icon className="size-4"/>
                        <span className="text-sm" >{label}</span>
                    </button>
                ))}

            </DropdownMenuContent>

        </DropdownMenu>
    );
}

const ImageButton = () => {
    const { editor } = useEditorStore();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [imageUrl, setImageUrl] = useState("");

    const onChange = (src: string) => {
        editor?.chain().focus().setImage({ src }).run();
    };

    const onUpload = () => {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = "image/*";

        input.onchange = (e) => {
            const file = (e.target as HTMLInputElement).files?.[0];
            if (file) {
                const imageUrl = URL.createObjectURL(file);
                onChange(imageUrl);
            }
        }
        input.click();
    };

    const handleImageUrlSubmit = () => {
        if (imageUrl) {
            onChange(imageUrl);
            setImageUrl("");
            setIsDialogOpen(false);
        }
    };

    return (
        <>
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button
                    className="h-7 m-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm"
                >
                    <ImageIcon className="size-4" />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-2.5 flex flex-col gap-x-2">
                <DropdownMenuItem onClick={onUpload}>
                    <UploadIcon className="size-4 mr-2" />
                    Upload
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setIsDialogOpen(true)}>
                    <SearchIcon className="size-4 mr-2" />
                    Paste Image url
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>

        <Dialog open = {isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Insert Image URL</DialogTitle>
                </DialogHeader>
                <input 
                placeholder="Insert image URL"
                value= {imageUrl}
                onChange= {(e) => setImageUrl(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter"){
                        handleImageUrlSubmit();
                    }
                } }
                />
                <DialogFooter>
                <Button onClick={handleImageUrlSubmit}>
                    Insert
                </Button>
            </DialogFooter>
            </DialogContent>
        </Dialog>
        </>

    );
};


const LinkButton = () => {
    const { editor } = useEditorStore();
    const [value, setValue] = useState("");

    const onChange = (href: string) => {
        editor?.chain().focus().extendMarkRange("link").setLink({ href }).run();
        setValue("");
    };


    return (
        <DropdownMenu onOpenChange={(open) => {
            if (open) {
                setValue(editor?.getAttributes("link").href || "");
            }
        }}>
            <DropdownMenuTrigger asChild>
                <button
                    className="h-7 m-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm"
                >
                    <Link2Icon className="size-4" />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-2.5 flex flex-col gap-x-2">
               <Input
               placeholder="https://example.com"
               value={value}
               onChange={(e) => setValue(e.target.value)}
               />
                <Button onClick={() => onChange(value)}>
                    Set Link
                </Button>

            </DropdownMenuContent>

        </DropdownMenu>
    );
};


const HighlightColorButton = () => {
    const { editor } = useEditorStore();

    const values = editor?.getAttributes("highlight").color || "#FFFFFF";

    const onChange = (color: ColorResult) => {
        editor?.chain().focus().setHighlight({ color: color.hex }).run();
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button
                    className="h-7 m-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm"
                >
                    <HighlighterIcon className="size-4" />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-0">
                <SketchPicker
                    color={values}
                    onChange={onChange}
                />

            </DropdownMenuContent>

        </DropdownMenu>
    );
}

const TextColorButton = () => {
    const { editor } = useEditorStore();

    const values = editor?.getAttributes("textStyle").color || "#000000";

    const onChange = (color: ColorResult) => {
        editor?.chain().focus().setColor(color.hex).run();
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button
                    className="h-7 m-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm"
                >
                    <span className="text-xs">A</span>
                    <div className="h-0.5 w-full" style={{ backgroundColor: values }}></div>
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-0">
                <SketchPicker
                    color={values}
                    onChange={onChange}
                />

            </DropdownMenuContent>

        </DropdownMenu>
    );
}

const HeadingLevelButton = () => {
    const { editor } = useEditorStore();

    const headings = [
        { label: "Normal text", value: 0, fontSize: "16px" },
        { label: "Heading 1", value: 1, fontSize: "32px" },
        { label: "Heading 2", value: 2, fontSize: "24px" },
        { label: "Heading 3", value: 3, fontSize: "20px" },
        { label: "Heading 4", value: 4, fontSize: "18px" },
        { label: "Heading 5", value: 5, fontSize: "16px" },
    ];

    const getCurrentHeading = () => {
        for (let level = 1; level <= 5; level++) {
            if (editor?.isActive("heading", { level })) {
                return `Heading ${level}`;
            }
        }
        return "Normal text";
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button
                    className="h-7 m-w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm"
                >
                    <span className="truncate">
                        {getCurrentHeading()}
                    </span>
                    <ChevronDownIcon className="ml-2 size-4 shrink-0" />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
                {headings.map(({ label, value, fontSize }) => (
                    <button
                        key={value}
                        style={{ fontSize }}
                        onClick={() => {
                            if (value === 0) {
                                editor?.chain().focus().setParagraph().run();
                            }
                            else {
                                editor?.chain().focus().toggleHeading({ level: value as Level }).run();
                            }
                        }}
                        className={cn(
                            "flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80",
                            (value === 0 && !editor?.isActive("heading")) || editor?.isActive("heading", { level: value }) && "bg-neutral-200/80"
                        )}
                    >
                        {label}

                    </button>
                ))}

            </DropdownMenuContent>
        </DropdownMenu>
    )
}



const FontFamilyButton = () => {
    const { editor } = useEditorStore();

    const fonts = [
        { label: "Arial", value: "Arial, sans-serif" },
        { label: "Times New Roman", value: "'Times New Roman', serif" },
        { label: "Courier New", value: "'Courier New', monospace" },
        { label: "Georgia", value: "Georgia, serif" },
        { label: "Verdana", value: "Verdana, sans-serif" },
        { label: "Tahoma", value: "Tahoma, sans-serif" },
        { label: "Trebuchet MS", value: "'Trebuchet MS', sans-serif" },
        { label: "Lucida Console", value: "'Lucida Console', monospace" },
        { label: "Palatino", value: "Palatino, serif" },
        { label: "Garamond", value: "Garamond, serif" },
        { label: "Bookman", value: "Bookman, serif" },
        { label: "Comic Sans MS", value: "'Comic Sans MS', cursive" },
        { label: "Impact", value: "Impact, sans-serif" },
        { label: "Segoe UI", value: "'Segoe UI', sans-serif" },

        // Google Fonts (use actual names, NOT CSS variables)
        { label: "Inter", value: "Inter, sans-serif" },
        { label: "Roboto", value: "Roboto, sans-serif" },
        { label: "Poppins", value: "Poppins, sans-serif" },
        { label: "Montserrat", value: "Montserrat, sans-serif" },
    ]

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button
                    className=
                    "h-7 w-[120px] shrink-0 flex items-center justify-between rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm"
                >
                    <span className="truncate">
                        {editor?.getAttributes("textStyle").fontFamily || "Arial"}
                    </span>
                    <ChevronDownIcon className="ml-2 size-4 shrink-0" />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
                {fonts.map(({ label, value }) => (
                    <button
                        onClick={() => editor?.chain().focus().setFontFamily(value).run()}
                        key={value}
                        className={cn(
                            "flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80",
                            editor?.getAttributes("textStyle").fontFamily === value && "bg-neutral-200/80"
                        )}
                        style={{ fontFamily: value }}
                    >
                        <span className="text-sm"> {label} </span>

                    </button>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

interface ToolbarButtonProps {
    onClick?: () => void;
    isActive?: boolean;
    icon: LucideIcon;
};

const ToolbarButton = ({
    onClick,
    isActive,
    icon: Icon,
}: ToolbarButtonProps) => {
    return (
        <button
            onClick={onClick}
            className={cn(
                "text-sm h-7 min-w-7 flex items-center rounded-sm hover:bg-neutral-200/80",
                isActive && "bg-neutral-200/80"
            )}
        >
            <Icon className="size-4" />

        </button>
    )
}



const OCRButton = () => {
    const { editor } = useEditorStore();
    const [isProcessing, setIsProcessing] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [extractedText, setExtractedText] = useState("");

    const handleOCR = () => {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = "image/*";

        input.onchange = async (e) => {
            const file = (e.target as HTMLInputElement).files?.[0];
            if (!file) return;

            setIsProcessing(true);
            try {
                const worker = await Tesseract.createWorker("eng", 1, {
                    workerPath: "/tesseract-worker.min.js",
                    corePath: "/tesseract-core/",
                });
                const result = await worker.recognize(file);
                await worker.terminate();
                const text = result.data.text.trim();
                if (text) {
                    setExtractedText(text);
                    setIsDialogOpen(true);
                } else {
                    toast.error("No text could be extracted from this image.");
                }
            } catch {
                toast.error("Failed to process the image. Please try again.");
            } finally {
                setIsProcessing(false);
            }
        };
        input.click();
    };

    const handleInsert = () => {
        if (extractedText) {
            editor?.chain().focus().insertContent(extractedText).run();
            setIsDialogOpen(false);
            setExtractedText("");
            toast.success("Text inserted into document.");
        }
    };

    return (
        <>
            <button
                onClick={handleOCR}
                disabled={isProcessing}
                className="h-7 min-w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm disabled:opacity-50"
                title="Extract text from image (OCR)"
            >
                {isProcessing ? (
                    <svg className="size-4 animate-spin" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                ) : (
                    <ScanIcon className="size-4" />
                )}
            </button>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="sm:max-w-lg p-0 border-none shadow-2xl rounded-xl overflow-hidden">
                    <div className="bg-[#F1F4F9] px-5 py-4 border-b border-neutral-200/60">
                        <DialogHeader>
                            <DialogTitle className="flex items-center gap-2 text-sm font-semibold text-neutral-700">
                                <ScanIcon className="size-4 text-blue-500" />
                                Review Extracted Text
                            </DialogTitle>
                        </DialogHeader>
                    </div>
                    
                    <div className="p-5 space-y-3">
                        <p className="text-xs text-neutral-500 font-medium tracking-wide uppercase">
                            Edit Scanned Output
                        </p>
                        <textarea
                            value={extractedText}
                            onChange={(e) => setExtractedText(e.target.value)}
                            className="w-full h-56 p-4 bg-neutral-50 border border-neutral-200 rounded-lg text-sm text-neutral-700 resize-y focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-colors placeholder:text-neutral-400 font-mono leading-relaxed"
                            placeholder="Extracted text will appear here..."
                        />
                    </div>
                    
                    <div className="bg-neutral-50/50 px-5 py-4 border-t border-neutral-100 flex items-center justify-end gap-2">
                        <Button variant="ghost" className="text-xs h-9 rounded-full px-4 text-neutral-600 hover:text-neutral-800 hover:bg-neutral-200/50" onClick={() => setIsDialogOpen(false)}>
                            Cancel
                        </Button>
                        <Button className="text-xs h-9 rounded-full px-5 bg-blue-600 hover:bg-blue-700 text-white shadow-sm" onClick={handleInsert}>
                            Insert
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
};

export const Toolbar = () => {
    const { editor } = useEditorStore();


    const sections: {
        label: string;
        icon: LucideIcon;
        onClick: () => void;
        isActive?: boolean;
    }[][] = [
            [
                {
                    label: "Undo",
                    icon: Undo2Icon,
                    onClick: () => editor?.chain().focus().undo().run(),
                },
                {
                    label: "Redo",
                    icon: Redo2Icon,
                    onClick: () => editor?.chain().focus().redo().run(),

                },
                {
                    label: "Print",
                    icon: PrinterIcon,
                    onClick: () => window.print(),
                },
                {
                    label: "Spell Check",
                    icon: SpellCheckIcon,
                    onClick: () => {
                        const current = editor?.view.dom.getAttribute("spellcheck");
                        editor?.view.dom.setAttribute("spellcheck", current === "false" ? "true" : "false");
                    },
                }
            ],
            [
                {
                    label: "Bold",
                    icon: BoldIcon,
                    isActive: editor?.isActive("bold"),
                    onClick: () => editor?.chain().focus().toggleBold().run(),
                },
                {
                    label: "Italic",
                    icon: ItalicIcon,
                    isActive: editor?.isActive("italic"),
                    onClick: () => editor?.chain().focus().toggleItalic().run(),

                },
                {
                    label: "Underline",
                    icon: UnderlineIcon,
                    isActive: editor?.isActive("underline"),
                    onClick: () => editor?.chain().focus().toggleUnderline().run(),

                },
            ],

            [
                {
                    label: "Comment",
                    icon: MessageSquarePlusIcon,
                    onClick: () => editor?.chain().focus().addPendingComment().run(),
                    isActive: editor?.isActive("liveblocksCommentMark")
                },
                {
                    label: "List Todo",
                    icon: ListTodoIcon,
                    onClick: () => editor?.chain().focus().toggleTaskList().run(),
                    isActive: editor?.isActive("taskList"),
                },
                {
                    label: "Remove Formatting",
                    icon: RemoveFormattingIcon,
                    onClick: () => editor?.chain().focus().unsetAllMarks().run(),
                },
            ]
        ];


    return (
        <div className="bg-[#F1F4F9] px-2.5 py-0.5 rounded-[24px] min-h-[40px] flex items-center gap-x-0.5 overflow-auto">
            {sections[0].map((item) => (
                <ToolbarButton key={item.label} {...item} />
            ))}
            <Separator orientation="vertical" className="h-6 bg-neutral-300" />
            <FontFamilyButton />

            <Separator orientation="vertical" className="h-6 bg-neutral-300" />
            <HeadingLevelButton />

            <Separator orientation="vertical" className="h-6 bg-neutral-300" />
            <FontSizeButton />
            <Separator orientation="vertical" className="h-6 bg-neutral-300" />

            {sections[1].map((item) => (
                <ToolbarButton key={item.label} {...item} />
            ))}
            <TextColorButton />
            <HighlightColorButton />
            <Separator orientation="vertical" className="h-6 bg-neutral-300" />
            <LinkButton />
            <ImageButton />
            <OCRButton />
            <AlignButton />
            <LineHeightButton />
            <ListButton />
            {sections[2].map((item) => (
                <ToolbarButton key={item.label} {...item} />
            ))}



        </div>
    );
};