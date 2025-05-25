import './Table.css'

import { JSX } from 'react'

interface Props {
    table: TableObject,
    textAlign?: null | 'second-column-center'
}

export interface TableObject {
    title?: string,
    headerRow?: (string | number)[],
    rows: (string | number)[][]
}

export default function Table({ table, textAlign }: Props): JSX.Element {
    const { title, headerRow, rows } = table

    let classString = ''

    switch (textAlign) {
        case 'second-column-center':
            classString += ' second-column-center';
            break;
    }

    return (
        <table className={classString}>
            <thead>
                {title &&
                    <tr>
                        <th colSpan={rows.length}>{title}</th>
                    </tr>
                }
                {headerRow &&
                    <tr className='header-row'>
                        {headerRow.map((column, index) => <th key={index}>{column}</th>)}
                    </tr>
                }
            </thead>
            <tbody>
                {rows.map((row, index) => {
                    return (
                        <tr key={index} className='standard-row'>
                            {row.map((column, index) => <td key={index}>{column}</td>)}
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}