import * as React from "react"

interface SegmentedProps {
    items: string[]
    value: string
    onChange: (v: string) => void
}

export const Segmented: React.FC<SegmentedProps> = ({
    items,
    value,
    onChange,
}) => {
    const [focusedItem, setFocusedItem] = React.useState<string | null>(null)

    return (
        <div
            data-layer="SegmentedTabBar"
            data-selected={value || "None"}
            style={{
                alignSelf: "stretch",
                height: "36px",
                padding: "2px",
                background: "rgba(255, 255, 255, 0.05)",
                borderRadius: "16px",
                border: "1px solid rgba(255, 255, 255, 0.05)",
                display: "inline-flex",
                justifyContent: "flex-start",
                alignItems: "center",
                overflow: "hidden",
                gap: "4px",
            }}
        >
            {items.map((label) => {
                const active = value === label
                const isFocused = focusedItem === label
                return (
                    <button
                        key={label}
                        type="button"
                        onClick={() => onChange(active ? "" : label)}
                        onFocus={() => setFocusedItem(label)}
                        onBlur={() => setFocusedItem(null)}
                        data-layer="SegmentedTabBar.Item"
                        data-selected={active}
                        style={{
                            flex: "1 1 0",
                            alignSelf: "stretch",
                            background: active
                                ? "radial-gradient(ellipse 50% 50% at 50% 50%, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.08) 100%)"
                                : "transparent",
                            borderRadius: "14px",
                            border: "1px solid transparent",
                            boxShadow: active
                                ? "inset 0 0 0 1px rgba(255, 255, 255, 0.1)"
                                : isFocused
                                  ? "inset 0 0 0 1px rgba(255, 255, 255, 0.4)"
                                  : "none",
                            outline: "none",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            overflow: "hidden",
                            cursor: "pointer",
                        }}
                    >
                        <div
                            data-layer="Text"
                            style={{
                                justifyContent: "flex-start",
                                color: active ? "white" : "#52525b",
                                fontSize: "16px",
                                fontFamily: "Pretendard",
                                fontWeight: "500",
                                lineHeight: "20px",
                            }}
                        >
                            {label}
                        </div>
                    </button>
                )
            })}
        </div>
    )
}
