import './fullImage.css'

import { imageBase } from '../../../../frontend-config'

interface Props {
    imageParam: number,
    altText: string
}

export default function FullImage({ imageParam, altText }: Props) {
    return (
        <>
            <img src={imageBase + imageParam} alt={altText}></img>
        </>
    )
}