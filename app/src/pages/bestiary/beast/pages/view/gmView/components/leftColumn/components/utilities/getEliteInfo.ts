import { SystemOption } from "@bestiary/common/interfaces/beast/beast"

export default (secondary: string, system: SystemOption) => {
        const isElite = secondary === 'Veteran' || secondary === 'Officer'

        if (system === 'HackMaster' && isElite) {
            return '<p><strong>Elite</strong> Two, separate characters must succeed on their Checks vs this enemy for succeed.</p>'
        }
        return null
}