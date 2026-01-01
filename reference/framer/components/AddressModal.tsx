import * as React from "react"
import {
    useDaumPostcode,
    openModalScroll,
    closeModalScroll,
    type DaumPostcodeData,
} from "../hooks/useDaumPostcode.ts"

interface AddressModalProps {
    id: string
    title: string
    onSelect: (address: string) => void
}

export const AddressModal: React.FC<AddressModalProps> = ({
    id,
    title,
    onSelect,
}) => {
    const contentId = `${id}Content`

    const handleClose = () => {
        const modal = document.getElementById(id)
        if (modal) {
            modal.style.display = "none"
            closeModalScroll()
        }
    }

    return (
        <div
            id={id}
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(0, 0, 0, 0.8)",
                display: "none",
                zIndex: 9999,
                justifyContent: "center",
                alignItems: "center",
                paddingLeft: "8px",
                paddingRight: "8px",
            }}
            onClick={(e) => {
                if (e.target === e.currentTarget) {
                    handleClose()
                }
            }}
        >
            <div
                style={{
                    position: "relative",
                    width: "100%",
                    minWidth: "344px",
                    maxWidth: "800px",
                    height: "80vh",
                    backgroundColor: "white",
                    borderRadius: "16px",
                    overflow: "hidden",
                    boxShadow:
                        "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "16px 20px",
                        borderBottom: "1px solid #f0f0f0",
                        backgroundColor: "white",
                    }}
                >
                    <div
                        style={{
                            fontSize: "16px",
                            fontWeight: "600",
                            color: "#333",
                            fontFamily: "Pretendard",
                        }}
                    >
                        {title}
                    </div>
                    <button
                        onClick={handleClose}
                        style={{
                            width: "28px",
                            height: "28px",
                            backgroundColor: "transparent",
                            border: "none",
                            borderRadius: "50%",
                            cursor: "pointer",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            fontSize: "18px",
                            color: "#666",
                            transition: "background-color 0.2s",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor =
                                "rgba(0, 0, 0, 0.05)"
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor =
                                "transparent"
                        }}
                    >
                        ×
                    </button>
                </div>
                <div
                    id={contentId}
                    style={{
                        flex: 1,
                        width: "100%",
                    }}
                />
            </div>
        </div>
    )
}

interface UseAddressModalReturn {
    openAddressModal: () => void
    isScriptLoaded: boolean
}

export function useAddressModal(
    modalId: string,
    onSelect: (address: string) => void
): UseAddressModalReturn {
    const isScriptLoaded = useDaumPostcode()
    const contentId = `${modalId}Content`

    const openAddressModal = () => {
        if (typeof window === "undefined" || !window.daum) return

        new window.daum.Postcode({
            oncomplete: function (data: DaumPostcodeData) {
                onSelect(data.roadAddress)
                const modal = document.getElementById(modalId)
                if (modal) {
                    modal.style.display = "none"
                    closeModalScroll()
                }
            },
            width: "100%",
            height: "100%",
            onready: function () {
                setTimeout(() => {
                    const searchInput = document.querySelector(
                        `#${contentId} input[type="text"]`
                    ) as HTMLInputElement
                    if (searchInput) {
                        searchInput.focus()
                    }
                }, 100)
            },
        }).embed(document.getElementById(contentId))

        const modal = document.getElementById(modalId)
        if (modal) {
            modal.style.display = "flex"
            openModalScroll()
        }
    }

    return { openAddressModal, isScriptLoaded }
}
