import * as React from "react"
import { TextInput } from "./TextInput.tsx"
import { normalizeKRPhone } from "../utils/phone.ts"

interface PhoneInputProps {
    value: string
    onChange: (v: string) => void
    placeholder?: string
}

export const PhoneInput: React.FC<PhoneInputProps> = ({
    value,
    onChange,
    placeholder,
}) => (
    <TextInput
        value={value}
        onChange={(v) => onChange(normalizeKRPhone(v))}
        placeholder={placeholder}
        type="tel"
    />
)
