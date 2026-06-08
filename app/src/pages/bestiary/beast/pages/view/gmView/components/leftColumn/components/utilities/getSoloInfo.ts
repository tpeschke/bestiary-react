import { SystemOption } from "@bestiary/common/interfaces/beast/beast"

export default (secondary: string, system: SystemOption) => {
        if (system === 'HackMaster' && secondary === 'Solo') {
            return '<p><strong>Solo</strong> Half of the characters must succeed on their Checks vs this enemy for succeed.</p>'
        }
        return null
}