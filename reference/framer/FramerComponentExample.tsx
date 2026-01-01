// Get Started: https://www.framer.com/developers

import { addPropertyControls, ControlType } from "framer"
import { motion } from "framer-motion"

/**
 * @framerSupportedLayoutWidth auto
 * @framerSupportedLayoutHeight auto
 */
export default function Test(props) {
    const { tint } = props

    return (
        <motion.div
            style={{
                margin: 50,
                width: 100,
                height: 100,
                borderRadius: 25,
                backgroundColor: tint,
            }}
            animate={{ scale: 1.5 }}
            whileHover={{ rotate: 90 }}
        />
    )
}

addPropertyControls(Test, {
    tint: {
        title: "Tint",
        type: ControlType.Color,
        defaultValue: "#09F",
    },
})
