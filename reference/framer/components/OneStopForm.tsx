import * as React from "react"

// Components
import { Field } from "./Field.tsx"
import { TextInput } from "./TextInput.tsx"
import { PhoneInput } from "./PhoneInput.tsx"
import { NativeSelect } from "./NativeSelect.tsx"
import { Segmented } from "./Segmented.tsx"
import { Consent } from "./Consent.tsx"
import { AddressModal, useAddressModal } from "./AddressModal.tsx"

// Utils
import { normalizeKRPhone, isValidKRPhoneFlexible } from "../utils/phone.ts"
import { REGIONS } from "../utils/regions.ts"
import { injectGlobalStyles } from "../utils/injectGlobalStyles.ts"

/**
 * One-Stop Service Form - 원스톱 서비스 신청 폼
 * - 신청자 역할 (판매자/구매자 선택 세그멘티드 탭바)
 * - 판매자 성함 (신청자 역할 상관없이 고정)
 * - 판매자 휴대전화번호 (신청자 역할 상관없이 고정)
 * - 구매자 성함 (신청자 역할 상관없이 고정)
 * - 구매자 휴대전화번호 (신청자 역할 상관없이 고정)
 * - 구매자(도착지) 주소 (신청자 역할 상관없이 고정)
 * - 매물 링크(URL)
 * - 원스톱 서비스 옵션 선택
 * - 조건부 표시(프리미엄): 방문수거 희망 주소(장소)
 * - 조건부 표시(베이직): 판매자 거주 지역
 */

const POST_ENDPOINT =
    "https://script.google.com/macros/s/AKfycbz2S8PY8IdVPJWnoLMe-igdf5uaPoLoiBKZ8e3JnMIRMF1c6EeRakLY8Uem4aTBCguTVg/exec"

// Price display components (OneStopForm 전용)
const PriceBasic = () => (
    <div
        data-layer="PriceDetailContainer"
        data-price="Basic"
        style={{
            alignSelf: "stretch",
            paddingTop: "12px",
            paddingBottom: "12px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "16px",
        }}
    >
        <div
            data-layer="Price Group"
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "center",
                gap: "4px",
            }}
        >
            <div
                data-layer="35,000원~"
                style={{
                    justifyContent: "flex-start",
                    color: "white",
                    fontSize: "24px",
                    fontFamily: "Pretendard",
                    fontWeight: "700",
                    lineHeight: "28px",
                }}
            >
                35,000원~
            </div>
            <div
                data-layer="(VAT 포함)"
                style={{
                    textAlign: "center",
                    justifyContent: "flex-start",
                    color: "#52525b",
                    fontSize: "12px",
                    fontFamily: "Pretendard",
                    fontWeight: "400",
                    lineHeight: "12px",
                }}
            >
                (VAT 포함)
            </div>
        </div>
        <div
            data-layer="Chip Group"
            style={{
                display: "inline-flex",
                justifyContent: "flex-start",
                alignItems: "center",
                gap: "8px",
            }}
        >
            <Chip label="📦 포장" />
            <Chip label="🚚 배송" />
        </div>
    </div>
)

const PricePremium = () => (
    <div
        data-layer="PriceDetailContainer"
        data-price="Premium"
        style={{
            alignSelf: "stretch",
            paddingTop: "12px",
            paddingBottom: "12px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "16px",
        }}
    >
        <div
            data-layer="Price Group"
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "center",
                gap: "4px",
            }}
        >
            <div
                data-layer="55,000원~"
                style={{
                    justifyContent: "flex-start",
                    color: "white",
                    fontSize: "24px",
                    fontFamily: "Pretendard",
                    fontWeight: "700",
                    lineHeight: "28px",
                }}
            >
                55,000원~
            </div>
            <div
                data-layer="(VAT 포함)"
                style={{
                    textAlign: "center",
                    justifyContent: "flex-start",
                    color: "#52525b",
                    fontSize: "12px",
                    fontFamily: "Pretendard",
                    fontWeight: "400",
                    lineHeight: "12px",
                }}
            >
                (VAT 포함)
            </div>
        </div>
        <div
            data-layer="Chip Group"
            style={{
                display: "inline-flex",
                justifyContent: "flex-start",
                alignItems: "center",
                gap: "8px",
            }}
        >
            <Chip label="🎸 방문수거" />
            <Chip label="📦 포장" />
            <Chip label="🚚 배송" />
        </div>
    </div>
)

const Chip = ({ label }: { label: string }) => (
    <div
        data-layer="Chip"
        data-property-1="Default"
        style={{
            paddingLeft: "8px",
            paddingRight: "8px",
            paddingTop: "4px",
            paddingBottom: "4px",
            background: "rgba(255, 255, 255, 0.05)",
            borderRadius: "6px",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
            overflow: "hidden",
        }}
    >
        <div
            data-layer="Text"
            style={{
                justifyContent: "flex-start",
                color: "rgba(255, 255, 255, 0.8)",
                fontSize: "12px",
                fontFamily: "Pretendard",
                fontWeight: "500",
                lineHeight: "12px",
            }}
        >
            {label}
        </div>
    </div>
)

// Inject global styles on load
injectGlobalStyles()

export default function OneStopForm() {
    const [role, setRole] = React.useState("") // 판매자 | 구매자 | ""
    const [sellerName, setSellerName] = React.useState("")
    const [sellerPhone, setSellerPhone] = React.useState("")
    const [buyerName, setBuyerName] = React.useState("")
    const [buyerPhone, setBuyerPhone] = React.useState("")
    const [buyerAddr1, setBuyerAddr1] = React.useState("")
    const [buyerAddr2, setBuyerAddr2] = React.useState("")
    const [link, setLink] = React.useState("")
    const [service, setService] = React.useState("") // 베이직 | 프리미엄 | ""
    const [addr1, setAddr1] = React.useState("") // 방문수거 희망 주소
    const [addr2, setAddr2] = React.useState("") // 방문수거 희망 상세 주소
    const [region, setRegion] = React.useState("") // 판매자 거주 지역
    const [agreePI, setAgreePI] = React.useState(false)
    const [agreePI3, setAgreePI3] = React.useState(false)
    const [isSubmitting, setIsSubmitting] = React.useState(false)

    // Address modal hooks
    const { openAddressModal: openBuyerAddressModal } = useAddressModal(
        "buyerAddressModal",
        setBuyerAddr1
    )
    const { openAddressModal: openPickupAddressModal } = useAddressModal(
        "pickupAddressModal",
        setAddr1
    )

    // URL 파라미터에서 서비스 옵션 읽기
    React.useEffect(() => {
        if (typeof window !== "undefined") {
            const urlParams = new URLSearchParams(window.location.search)
            const serviceParam = urlParams.get("service")
            if (serviceParam === "베이직" || serviceParam === "프리미엄") {
                setService(serviceParam)
            }
        }
    }, [])

    // 서비스 옵션 변경 시 조건부 필드 초기화
    React.useEffect(() => {
        if (service !== "프리미엄") {
            setAddr1("")
            setAddr2("")
        }
        if (service !== "베이직") {
            setRegion("")
        }
    }, [service])

    const isPremium = service === "프리미엄"
    const isBasic = service === "베이직"
    const sellerPhoneOk = isValidKRPhoneFlexible(sellerPhone)
    const buyerPhoneOk = isValidKRPhoneFlexible(buyerPhone)

    const canSubmit =
        role &&
        sellerName.trim().length > 1 &&
        sellerPhoneOk &&
        buyerName.trim().length > 1 &&
        buyerPhoneOk &&
        buyerAddr1.trim() &&
        link.trim() &&
        service &&
        (isPremium ? addr1.trim() : true) &&
        (isBasic ? region : true) &&
        agreePI &&
        agreePI3

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault()
        if (!canSubmit || isSubmitting) return

        setIsSubmitting(true)

        const payload = {
            role,
            seller: {
                name: sellerName,
                phone: normalizeKRPhone(sellerPhone),
            },
            buyer: {
                name: buyerName,
                phone: normalizeKRPhone(buyerPhone),
                address1: buyerAddr1,
                address2: buyerAddr2,
            },
            listingUrl: link,
            serviceOption: service,
            pickup: isPremium ? { address1: addr1, address2: addr2 } : null,
            region: isBasic ? region : null,
            consentPI: agreePI,
            consentPI3: agreePI3,
            submittedAt: new Date().toISOString(),
        }

        try {
            fetch(POST_ENDPOINT, {
                method: "POST",
                mode: "no-cors",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            })

            setTimeout(() => {
                alert("신청이 완료되었어요. 담당자가 순차적으로 연락드릴게요.")
                if (typeof window !== "undefined") {
                    window.location.reload()
                }
            }, 2000)
        } catch (err) {
            console.error(err)
            alert(
                "제출에 실패했어요. 네트워크 상태를 확인하시거나, 잠시 후 다시 시도해주세요."
            )
            setIsSubmitting(false)
        }
    }

    return (
        <div
            style={{
                background: "#0a0a0a",
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-start",
            }}
        >
            <div
                data-layer="Form Component"
                style={{
                    width: "680px",
                    maxWidth: "720px",
                    paddingLeft: "16px",
                    paddingRight: "16px",
                    paddingTop: "32px",
                    paddingBottom: "80px",
                    background: "#0a0a0a",
                    display: "inline-flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    gap: "40px",
                }}
            >
                <form
                    onSubmit={onSubmit}
                    style={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        gap: "40px",
                    }}
                >
                    {/* 1. 신청자 역할 */}
                    <Field label="신청자 역할" required>
                        <Segmented
                            items={["판매자", "구매자"]}
                            value={role}
                            onChange={setRole}
                        />
                    </Field>

                    {/* 2. 판매자 성함 */}
                    <Field label="판매자 성함" required>
                        <TextInput
                            value={sellerName}
                            onChange={setSellerName}
                            placeholder="판매자 성함"
                        />
                    </Field>

                    {/* 3. 판매자 휴대전화번호 */}
                    <Field label="판매자 휴대전화번호" required>
                        <PhoneInput
                            value={sellerPhone}
                            onChange={setSellerPhone}
                            placeholder="010-0000-0000"
                        />
                        {!sellerPhoneOk && sellerPhone.length > 0 && (
                            <div
                                style={{
                                    color: "#f87171",
                                    fontSize: "12px",
                                    marginTop: "4px",
                                }}
                            >
                                유효한 휴대전화번호를 적어주세요.
                            </div>
                        )}
                    </Field>

                    {/* 4. 구매자 성함 */}
                    <Field label="구매자 성함" required>
                        <TextInput
                            value={buyerName}
                            onChange={setBuyerName}
                            placeholder="구매자 성함"
                        />
                    </Field>

                    {/* 5. 구매자 휴대전화번호 */}
                    <Field label="구매자 휴대전화번호" required>
                        <PhoneInput
                            value={buyerPhone}
                            onChange={setBuyerPhone}
                            placeholder="010-0000-0000"
                        />
                        {!buyerPhoneOk && buyerPhone.length > 0 && (
                            <div
                                style={{
                                    color: "#f87171",
                                    fontSize: "12px",
                                    marginTop: "4px",
                                }}
                            >
                                유효한 휴대전화번호를 적어주세요.
                            </div>
                        )}
                    </Field>

                    {/* 6. 구매자(도착지) 주소 */}
                    <Field label="구매자(도착지) 주소" required>
                        <div
                            onClick={openBuyerAddressModal}
                            style={{ width: "100%" }}
                        >
                            <TextInput
                                value={buyerAddr1}
                                onChange={setBuyerAddr1}
                                placeholder="구매자 주소"
                            />
                        </div>
                        <TextInput
                            value={buyerAddr2}
                            onChange={setBuyerAddr2}
                            placeholder="상세 주소"
                        />
                    </Field>

                    {/* 7. 매물 링크(URL) */}
                    <Field
                        label="매물 링크(URL)"
                        required
                        description="*뮬(Mule) / 중고나라 / 번개장터 등 매물 정보가 담긴 링크(URL)을 입력해 주세요."
                    >
                        <TextInput
                            value={link}
                            onChange={setLink}
                            placeholder="https://"
                        />
                    </Field>

                    {/* 8. 원스톱 서비스 옵션 선택 */}
                    <Field
                        label="원스톱 서비스 옵션 선택"
                        required
                        description="*배송 거리 및 지역, 사전 예약자 여부 등에 따라 이용 요금이 변동될 수 있습니다.
접수 후 담당자가 개별 연락을 드립니다."
                    >
                        <Segmented
                            items={["베이직", "프리미엄"]}
                            value={service}
                            onChange={setService}
                        />
                    </Field>

                    {/* 가격 디테일 컨테이너 */}
                    {service === "베이직" && <PriceBasic />}
                    {service === "프리미엄" && <PricePremium />}

                    {/* 9. 조건부 표시(프리미엄): 방문수거 희망 주소(장소) */}
                    {isPremium && (
                        <Field label="방문수거 희망 주소(장소)" required>
                            <div
                                onClick={openPickupAddressModal}
                                style={{ width: "100%" }}
                            >
                                <TextInput
                                    value={addr1}
                                    onChange={setAddr1}
                                    placeholder="주소"
                                />
                            </div>
                            <TextInput
                                value={addr2}
                                onChange={setAddr2}
                                placeholder="상세 주소"
                            />
                        </Field>
                    )}

                    {/* 10. 조건부 표시(베이직): 판매자 거주 지역 */}
                    {isBasic && (
                        <Field
                            label="판매자 거주 지역"
                            required
                            description="*제휴 악기사 위치 안내를 위해 필요한 정보입니다."
                        >
                            <NativeSelect
                                value={region}
                                onChange={setRegion}
                                options={REGIONS}
                                placeholder="지역 선택"
                            />
                        </Field>
                    )}

                    {/* 개인정보 수집 및 3자 제공 체크박스 */}
                    <div
                        data-layer="Checkbox Group"
                        style={{
                            alignSelf: "stretch",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "flex-start",
                            alignItems: "flex-start",
                        }}
                    >
                        <Consent
                            checked={agreePI}
                            onChange={setAgreePI}
                            label="개인정보 수집 및 이용에 동의합니다."
                            href="https://akify.io/terms-and-policies/onestop-privacy-consent"
                        />
                        <Consent
                            checked={agreePI3}
                            onChange={setAgreePI3}
                            label="개인정보 제3자 제공에 대해 동의합니다."
                            href="https://akify.io/terms-and-policies/onestop-privacy-thirdparty"
                        />
                    </div>

                    <div
                        style={{
                            alignSelf: "stretch",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <button
                            type="submit"
                            disabled={!canSubmit || isSubmitting}
                            data-layer="Button"
                            data-state={
                                canSubmit && !isSubmitting
                                    ? "Default"
                                    : "Disabled"
                            }
                            style={{
                                paddingLeft: "32px",
                                paddingRight: "32px",
                                paddingTop: "16px",
                                paddingBottom: "16px",
                                background:
                                    canSubmit && !isSubmitting
                                        ? "white"
                                        : "rgba(255, 255, 255, 0.1)",
                                borderRadius: "16px",
                                border:
                                    canSubmit && !isSubmitting
                                        ? "none"
                                        : "1px solid rgba(255, 255, 255, 0.2)",
                                boxShadow:
                                    canSubmit && !isSubmitting
                                        ? "none"
                                        : "inset 1px 2px 2px 0px rgba(255, 255, 255, 0.1)",
                                display: "inline-flex",
                                justifyContent: "center",
                                alignItems: "center",
                                gap: "8px",
                                overflow: "hidden",
                                cursor:
                                    canSubmit && !isSubmitting
                                        ? "pointer"
                                        : "not-allowed",
                                opacity: isSubmitting ? 0.7 : 1,
                                transition: "opacity 0.2s",
                            }}
                        >
                            {isSubmitting && (
                                <div
                                    style={{
                                        width: "16px",
                                        height: "16px",
                                        border: "2px solid rgba(255, 255, 255, 0.3)",
                                        borderTopColor: "white",
                                        borderRadius: "50%",
                                        animation: "spin 0.8s linear infinite",
                                    }}
                                />
                            )}
                            <div
                                data-layer="Text"
                                style={{
                                    justifyContent: "flex-start",
                                    color: isSubmitting
                                        ? "white"
                                        : canSubmit
                                          ? "#171717"
                                          : "#71717a",
                                    fontSize: "18px",
                                    fontFamily: "Pretendard",
                                    fontWeight: "700",
                                    lineHeight: "28px",
                                }}
                            >
                                {isSubmitting ? "제출 중..." : "제출하기"}
                            </div>
                        </button>
                    </div>
                </form>

                {/* Address Modals */}
                <AddressModal
                    id="buyerAddressModal"
                    title="구매자 주소 검색"
                    onSelect={setBuyerAddr1}
                />
                <AddressModal
                    id="pickupAddressModal"
                    title="방문수거 주소 검색"
                    onSelect={setAddr1}
                />
            </div>
        </div>
    )
}
