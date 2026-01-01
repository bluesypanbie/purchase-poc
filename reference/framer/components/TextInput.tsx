import * as React from "react"

interface TextInputProps {
    value: string
    onChange: (v: string) => void
    placeholder?: string
    type?: string
}

export const TextInput: React.FC<TextInputProps> = ({
    value,
    onChange,
    placeholder,
    type = "text",
}) => {
    const [isFocused, setIsFocused] = React.useState(false)

    return (
        <div
            data-layer="Input"
            data-state={
                value ? "Value Entered" : isFocused ? "Focused" : "Default"
            }
            data-type="Text"
            style={{
                alignSelf: "stretch",
                height: "44px",
                paddingLeft: "16px",
                paddingRight: "16px",
                background: "rgba(255, 255, 255, 0.05)",
                borderRadius: "16px",
                border: `1px solid ${isFocused ? "rgba(255, 255, 255, 0.4)" : "rgba(255, 255, 255, 0.1)"}`,
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                overflow: "hidden",
            }}
        >
            <input
                style={{
                    flex: "1 1 0",
                    height: "100%",
                    border: "none",
                    outline: "none",
                    background: "transparent",
                    justifyContent: "flex-start",
                    color: value ? "white" : "#5e5e5e",
                    fontSize: "16px",
                    fontFamily: "Pretendard",
                    fontWeight: "400",
                    lineHeight: "20px",
                }}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder={placeholder}
                type={type}
            />
        </div>
    )
}
