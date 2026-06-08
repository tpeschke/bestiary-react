import { SystemOption } from "@bestiary/common/interfaces/beast/beast"

export default (secondary: string, system: SystemOption) => {
        if (system === 'HackMaster' && secondary === 'Lesser') {
            return '<p><strong>Lesser</strong> Checks against this enemy always succeed. You’re just rolling to see if there are any additional consequences.</p>'
        }
        return null
}