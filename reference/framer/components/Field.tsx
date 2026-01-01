import * as React from "react"

interface FieldProps {
    label: string
    required?: boolean
    children: React.ReactNode
    description?: string
}

export const Field: React.FC<FieldProps> = ({
    label,
    required,
    children,
    description,
}) => (
    <div
        data-layer="Field"
        style={{
            alignSelf: "stretch",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            gap: "10px",
        }}
    >
        <div
            data-layer="Label"
            data-required={required}
            data-show-description={!!description}
            style={{
                alignSelf: "stretch",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                gap: "4px",
            }}
        >
            <div
                data-layer="Title Group"
                style={{
                    display: "inline-flex",
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                }}
            >
                <div
                    data-layer="Label"
                    style={{
                        justifyContent: "flex-start",
                        color: "white",
                        fontSize: "16px",
                        fontFamily: "Pretendard",
                        fontWeight: "700",
                        lineHeight: "20px",
                    }}
                >
                    {label}
                </div>
                {required && (
                    <div
                        data-layer="Required Dot"
                        style={{
                            paddingLeft: "2px",
                            paddingTop: "4px",
                            display: "flex",
                            justifyContent: "flex-start",
                            alignItems: "center",
                            overflow: "hidden",
                        }}
                    >
                        <div
                            data-layer="Dot"
                            style={{
                                width: "4px",
                                height: "4px",
                                position: "relative",
                                background: "#f87171",
                                borderRadius: "9999px",
                            }}
                        />
                    </div>
                )}
            </div>
            {description && (
                <div
                    data-layer="Description"
                    style={{
                        alignSelf: "stretch",
                        justifyContent: "flex-start",
                        color: "#52525b",
                        fontSize: "14px",
                        fontFamily: "Pretendard",
                        fontWeight: "400",
                        lineHeight: "20px",
                        whiteSpace: "pre-line",
                    }}
                >
                    {description}
                </div>
            )}
        </div>
        {children}
    </div>
)
