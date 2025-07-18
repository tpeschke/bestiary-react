import { Link } from 'react-router-dom'
import './CanEditButton.css'

interface Props {
    canEdit: boolean,
    beastID: number
}

export default function CanEditButton({ canEdit, beastID }: Props) {
    return (
        <div className="can-edit-button-shell">
            {canEdit &&
                <Link to={`/beast/${beastID}/edit`}>
                    <button className="orange">Edit Monster</button>
                </Link>
            }
        </div>
    )
}