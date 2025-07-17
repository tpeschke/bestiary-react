interface Props {
    canEdit: boolean
}

export default function CanEditButton({ canEdit }: Props) {
    return (
        <div>
            {canEdit ? 'yes' : 'no'}
        </div>
    )
}