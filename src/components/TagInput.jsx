import { useState } from "react";

export default function TagInput({ tags, setTags }) {
    const [input, setInput] = useState("");

    const handleKeyDown = (e) => {
        if (e.key === "," || e.key === "Enter") {
            e.preventDefault();
            const trimmedInput = input.trim();
            if (trimmedInput) {
                setTags([...tags, trimmedInput]);
                setInput("");
            }
        }
    };

    const removeTag = (index) => {
        setTags(tags.filter((_, i) => i !== index));
    };

    return (
        <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Features</label>
            <div className="w-full p-2 border border-red-200 rounded-lg outline-[#dc2626] flex flex-wrap gap-2">
                {tags.map((tag, index) => (
                    <span key={index} className="flex items-center px-2 text-white bg-red-500 rounded-full">
                        {tag}
                        <button type="button" className="ml-2 font-bold text-white" onClick={() => removeTag(index)}>×</button>
                    </span>
                ))}
                <input
                    type="text"
                    className="flex-1 p-1 outline-none"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type and press ',' or Enter..."
                />
            </div>
        </div>
    );
}
