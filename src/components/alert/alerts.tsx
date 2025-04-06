import { toast } from 'react-toastify';

interface Message {
    color?: 'green' | 'yellow' | 'red' | 'blue',
    message: string,
}

export default function alertInfo({ color, message }: Message) {
    if (color === 'green') {
        toast.success(message)
    } else if (color === 'yellow') {
        toast.warn(message)
    } else if (color === 'red') {
        toast.error(message, { autoClose: false })
    } else if (color === 'blue') {
        toast.info(message)
    }
}

export async function showPendingAlert(callBack: Promise<unknown> | (() => Promise<unknown>)): Promise<Object> {
    const { data }: any = await toast.promise(
        callBack,
        {
            pending: 'Saving',
        }
    )

    if (data.color) { alertInfo(data) }
    return data
}