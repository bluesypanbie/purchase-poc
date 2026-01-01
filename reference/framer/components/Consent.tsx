import * as React from "react"

interface ConsentProps {
    checked: boolean
    onChange: (v: boolean) => void
    label: string
    href?: string
}

export const Consent: React.FC<ConsentProps> = ({
    checked,
    onChange,
    label,
    href,
}) => {
    const [isFocused, setIsFocused] = React.useState(false)

    return (
        <label
            data-layer="Checkbox"
            data-show-see-more={!!href}
            style={{
                display: "inline-flex",
                justifyContent: "flex-start",
                alignItems: "center",
                gap: "10px",
                cursor: "pointer",
                paddingTop: "8px",
                paddingBottom: "8px",
            }}
        >
            <div
                data-layer="Check"
                data-checked={checked}
                style={{
                    width: "20px",
                    height: "20px",
                    position: "relative",
                    background: checked ? "white" : "rgba(255, 255, 255, 0.05)",
                    borderRadius: "6px",
                    border: `1px solid ${isFocused ? "rgba(255, 255, 255, 0.4)" : "rgba(255, 255, 255, 0.1)"}`,
                    overflow: "hidden",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={(e) => onChange(e.target.checked)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    style={{
                        position: "absolute",
                        opacity: 0,
                        width: "100%",
                        height: "100%",
                        cursor: "pointer",
                        outline: "none",
                    }}
                />
                {checked && (
                    <div
                        data-layer="✓"
                        style={{
                            justifyContent: "flex-start",
                            color: "#171717",
                            fontSize: "16px",
                            fontFamily: "Pretendard",
                            fontWeight: "700",
                            lineHeight: "12px",
                        }}
                    >
                        ✓
                    </div>
                )}
            </div>
            <div
                data-layer="Text"
                style={{
                    justifyContent: "flex-start",
                    color: "rgba(255, 255, 255, 0.8)",
                    fontSize: "14px",
                    fontFamily: "Pretendard",
                    fontWeight: "400",
                    lineHeight: "12px",
                }}
            >
                {label}
            </div>
            {href && (
                <a
                    data-layer="Link"
                    href={href}
                    target="_blank"
                    rel="noopener"
                    style={{
                        justifyContent: "flex-start",
                        color: "#52525b",
                        fontSize: "14px",
                        fontFamily: "Pretendard",
                        fontWeight: "400",
                        textDecoration: "underline",
                        lineHeight: "12px",
                    }}
                    onClick={(e) => e.stopPropagation()}
                >
                    더보기
                </a>
            )}
        </label>
    )
}
