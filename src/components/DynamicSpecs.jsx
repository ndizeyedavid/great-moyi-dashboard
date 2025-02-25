import React, { useState } from 'react'

export default function DynamicSpecs({ specs, setSpecs }) {
    const handleSpecChange = (index, field, value) => {
        const newSpecs = [...specs];
        newSpecs[index][field] = value;
        setSpecs(newSpecs);

        // Add a new empty row if the last row has been started
        if (index === specs.length - 1 && (newSpecs[index].label || newSpecs[index].value)) {
            setSpecs([...newSpecs, { label: "", value: "" }]);
        }
    };

    const removeSpec = (index) => {
        setSpecs(specs.filter((_, i) => i !== index));
    };
    return (
        <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Specifications</label>
            {specs.map((spec, index) => (
                <div key={index} className="flex mb-2 space-x-2">
                    <input
                        type="text"
                        placeholder="Label"
                        value={spec.label}
                        onChange={(e) => handleSpecChange(index, "label", e.target.value)}
                        className="w-1/2 p-2 border border-red-200 rounded-lg outline-[#dc2626]"
                    />
                    <input
                        type="text"
                        placeholder="Value"
                        value={spec.value}
                        onChange={(e) => handleSpecChange(index, "value", e.target.value)}
                        className="w-1/2 p-2 border border-red-200 rounded-lg outline-[#dc2626]"
                    />
                    {index > 0 && (
                        <button
                            type='button'
                            className="px-3 py-1 text-white bg-red-500 rounded-lg"
                            onClick={() => removeSpec(index)}
                        >
                            ×
                        </button>
                    )}
                </div>
            ))}
        </div>
    )
}
