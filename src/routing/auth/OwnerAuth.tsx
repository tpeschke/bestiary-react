import { isOwner } from '../../redux/slices/userSlice';
import { useSelector } from 'react-redux';

export default function OwnerAuth() {
    const userIsOwner: boolean = useSelector(isOwner)
    return userIsOwner;
}