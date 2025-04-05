import './doubleColumn.css'

interface Props {
    LeftColumn: any,
    RightColumn: any
}

export default function DoubleColumn({ LeftColumn, RightColumn }: Props) {
    return (
        <div className='column-shell'>
            <div className="left">
                {LeftColumn}
            </div>
            <div className="right">
                {RightColumn}
            </div>
        </div>
    )
}