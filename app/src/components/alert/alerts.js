import { toast } from 'react-toastify';
export default function alertInfo({ color, message }) {
    if (color === 'green') {
        toast.success(message);
    }
    else if (color === 'yellow') {
        toast.warn(message);
    }
    else if (color === 'red') {
        toast.error(message, { autoClose: false });
    }
    else if (color === 'blue') {
        toast.info(message);
    }
}
export async function showPendingAlert(callBack) {
    const response = await toast.promise(callBack, {
        pending: 'Saving',
    });
    if (response.color) {
        alertInfo(response);
        return response;
    }
    alertInfo(response.data);
    return response.data;
}
