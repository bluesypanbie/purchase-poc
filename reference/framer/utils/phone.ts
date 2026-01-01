/**
 * 한국 휴대전화번호 정규화 및 유효성 검사 유틸리티
 */

export function normalizeKRPhone(input: string): string {
    if (!input) return ""
    let v = String(input).replace(/[^+\d]/g, "")
    if (v.startsWith("+82")) v = "0" + v.slice(3)
    else if (v.startsWith("82")) v = "0" + v.slice(2)
    v = v.replace(/\D/g, "").slice(0, 11)
    if (v.startsWith("010")) {
        if (v.length <= 3) return v
        if (v.length <= 7) return `${v.slice(0, 3)}-${v.slice(3)}`
        return `${v.slice(0, 3)}-${v.slice(3, 7)}-${v.slice(7)}`
    } else if (/^01\d/.test(v)) {
        if (v.length <= 3) return v
        if (v.length === 10)
            return `${v.slice(0, 3)}-${v.slice(3, 6)}-${v.slice(6)}`
        if (v.length <= 7) return `${v.slice(0, 3)}-${v.slice(3)}`
        return `${v.slice(0, 3)}-${v.slice(3, 7)}-${v.slice(7)}`
    }
    return v
}

export function isValidKRPhoneFlexible(v: string): boolean {
    if (!v) return false
    const n = normalizeKRPhone(v)
    return /^(01\d)-(\d{3}|\d{4})-\d{4}$/.test(n)
}
