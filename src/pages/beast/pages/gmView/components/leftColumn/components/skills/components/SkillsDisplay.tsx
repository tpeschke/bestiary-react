import { Skill } from '../../../../../../../interfaces/infoInterfaces.ts/skillInfoInterfaces'

import Pair from "../../../../../../../components/UI/pair/Pair"

interface Props {
    skills: Skill[]
}

export default function SkillsDisplay({ skills }: Props) {
    return (
        <>
            {skills.map(({skill, rank}: Skill, index: number) => <Pair key={index} title={skill} info={rank} format={{title: 'none'}} />)}
        </>
    )
}