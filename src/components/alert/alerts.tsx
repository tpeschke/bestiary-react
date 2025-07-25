import { toast } from 'react-toastify';

export interface Message {
    color?: 'green' | 'yellow' | 'red' | 'blue',
    message: string,
    type: 'message'
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
    const response: any = await toast.promise(
        callBack,
        {
            pending: 'Saving',
        }
    )

    if (response.color) {
        alertInfo(response)
        return response
    }
    
    alertInfo(response.data)
    return response.data
}