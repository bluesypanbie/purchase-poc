import * as React from "react"

declare global {
    interface Window {
        daum?: {
            Postcode: new (options: {
                oncomplete: (data: DaumPostcodeData) => void
                width?: string
                height?: string
                onready?: () => void
            }) => {
                embed: (element: HTMLElement | null) => void
            }
        }
    }
}

export interface DaumPostcodeData {
    roadAddress: string
    jibunAddress: string
    zonecode: string
    buildingName: string
    apartment: string
    [key: string]: string
}

/**
 * Daum 우편번호 서비스 스크립트 로드 훅
 */
export function useDaumPostcode(): boolean {
    const [loaded, setLoaded] = React.useState(false)

    React.useEffect(() => {
        if (typeof window === "undefined") return

        if (window.daum) {
            setLoaded(true)
            return
        }

        const script = document.createElement("script")
        script.src =
            "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"
        script.async = true
        script.onload = () => setLoaded(true)
        document.head.appendChild(script)
    }, [])

    return loaded
}

/**
 * 모달 스크롤 위치 관리 유틸리티
 */
export function openModalScroll(): void {
    if (typeof window === "undefined") return
    const scrollY = window.scrollY
    document.body.style.top = `-${scrollY}px`
    document.body.classList.add("modal-open")
}

export function closeModalScroll(): void {
    if (typeof document === "undefined") return
    const scrollY = document.body.style.top
    document.body.classList.remove("modal-open")
    document.body.style.top = ""
    if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || "0") * -1)
    }
}
