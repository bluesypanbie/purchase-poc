import * as React from "react"
import { IconChevronDown } from "../icon/IconChevronDown.tsx"

interface NativeSelectProps {
    value: string
    onChange: (v: string) => void
    options: readonly string[]
    placeholder?: string
}

export const NativeSelect: React.FC<NativeSelectProps> = ({
    value,
    onChange,
    options,
    placeholder,
}) => {
    const [isFocused, setIsFocused] = React.useState(false)

    return (
        <div
            data-layer="Input"
            data-state={
                value ? "Value Entered" : isFocused ? "Focused" : "Default"
            }
            data-type="Select"
            style={{
                alignSelf: "stretch",
                height: "44px",
                paddingLeft: "16px",
                paddingRight: "16px",
                background: "rgba(255, 255, 255, 0.05)",
                borderRadius: "16px",
                border: `1px solid ${isFocused ? "rgba(255, 255, 255, 0.4)" : "rgba(255, 255, 255, 0.1)"}`,
                display: "inline-flex",
                justifyContent: "space-between",
                alignItems: "center",
                overflow: "hidden",
                position: "relative",
                cursor: "pointer",
            }}
        >
            <select
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    paddingLeft: "16px",
                    paddingRight: "40px",
                    border: "none",
                    outline: "none",
                    background: "transparent",
                    appearance: "none",
                    color: value ? "white" : "#5e5e5e",
                    fontSize: "16px",
                    fontFamily: "Pretendard",
                    fontWeight: "400",
                    lineHeight: "20px",
                    cursor: "pointer",
                }}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
            >
                <option
                    value=""
                    style={{
                        background: "#171717",
                        color: "#d4d4d8",
                    }}
                >
                    {placeholder || "선택하세요"}
                </option>
                {options.map((opt) => (
                    <option
                        key={opt}
                        value={opt}
                        style={{
                            background: "#171717",
                            color: "#f4f4f5",
                        }}
                    >
                        {opt}
                    </option>
                ))}
            </select>
            <div
                data-layer="Value"
                style={{
                    flex: "1 1 0",
                    justifyContent: "flex-start",
                    color: value ? "white" : "#5e5e5e",
                    fontSize: "16px",
                    fontFamily: "Pretendard",
                    fontWeight: "400",
                    lineHeight: "20px",
                    pointerEvents: "none",
                }}
            >
                {value || placeholder || "선택하세요"}
            </div>
            <div
                style={{
                    pointerEvents: "none",
                }}
            >
                <IconChevronDown />
            </div>
        </div>
    )
}
