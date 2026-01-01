/**
 * 글로벌 스타일 주입 (한 번만 실행)
 */

let injected = false

export function injectGlobalStyles(): void {
    if (typeof document === "undefined" || injected) return

    const style = document.createElement("style")
    style.setAttribute("data-form-global-styles", "true")
    style.textContent = `
        @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }

        /* iOS Safari input 스타일 덮어쓰기 방지 */
        input {
            -webkit-appearance: none !important;
            -webkit-border-radius: 0 !important;
            border-radius: 0 !important;
            font-size: 16px !important;
            -webkit-box-shadow: none !important;
            box-shadow: none !important;
            padding: 0 !important;
            margin: 0 !important;
            -webkit-padding-start: 0 !important;
            -webkit-padding-end: 0 !important;
            padding-inline-start: 0 !important;
            padding-inline-end: 0 !important;
        }

        input::placeholder {
            color: #5e5e5e !important;
            opacity: 1 !important;
            -webkit-text-fill-color: #5e5e5e !important;
        }

        input::-webkit-input-placeholder {
            color: #5e5e5e !important;
            opacity: 1 !important;
        }

        input::-moz-placeholder {
            color: #5e5e5e !important;
            opacity: 1 !important;
        }

        input:-ms-input-placeholder {
            color: #5e5e5e !important;
            opacity: 1 !important;
        }

        /* 모달 오픈 시 백그라운드 스크롤 방지 */
        .modal-open {
            overflow: hidden !important;
            position: fixed !important;
            width: 100% !important;
            top: 0 !important;
            left: 0 !important;
        }
    `
    document.head.appendChild(style)
    injected = true
}
