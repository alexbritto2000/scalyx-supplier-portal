import React from "react";

const ToggleSwitch = ({
    variant = "default",
    checked,
    onChange,
    disabled = false,
}) => {
    const baseStyles = `
        group peer bg-[#1D1B39] rounded-full duration-300 w-9 h-5 
        after:duration-300 after:bg-white after:rounded-full after:absolute 
        after:h-4 after:w-4 after:top-1/2 after:-translate-y-1/2 
        after:left-[3px] after:flex after:justify-center after:items-center 
        peer-checked:after:translate-x-4 peer-hover:after:scale-95
    `;

    const variantStyles =
        variant === "primary"
            ? "peer-checked:bg-[#000000]" // green-400
            : "peer-checked:bg-[#FFFFF]";

    const disabledStyles = disabled
        ? "opacity-50 cursor-not-allowed pointer-events-none"
        : "";

    return (
        <label className="relative inline-flex items-center cursor-pointer">
            <input
                type="checkbox"
                className="sr-only peer"
                checked={checked}
                onChange={onChange}
                disabled={disabled}
            />
            <div className={`${baseStyles} ${variantStyles} ${disabledStyles}`} />
        </label>
    );
};

export default ToggleSwitch;
