import './nameHeader.css'
import { useEffect, useState } from 'react';
import axios from 'axios';

import Icon from '../../../../../components/icon/Icon'
import { imageBase } from '../../../../../frontend-config';
import { RoleNameOrderOptions } from '../../../../../../common/interfaces/beast/infoInterfaces/roleInfoInterfaces';

interface Props {
    name: string,
    beastID?: number,
    roleID?: string | null,
    roleName?: string | null,
    roleNameOrder?: RoleNameOrderOptions
}

export default function NameHeader({ name, beastID, roleID, roleName, roleNameOrder }: Props) {
    const [roleTokenID, setRoleTokenID] = useState<string | null>(null)

    useEffect(() => {
        if (roleID) {
            axios.get(imageBase + beastID + roleID + '-token')
                .then(_ => {
                    setRoleTokenID(roleID)
                }).catch(_ => {
                    setRoleTokenID(null)
                })
        }
    }, [roleID])

    function forceDownload() {
        if (beastID) {
            const idBase = roleTokenID ? beastID + roleTokenID : beastID
            const beastName = processName(name, roleTokenID, roleName, roleNameOrder)

            let xhr = new XMLHttpRequest();
            xhr.open("GET", imageBase + idBase + '-token', true);

            xhr.responseType = "blob";
            xhr.onload = function () {
                const urlCreator = window.URL || window.webkitURL;
                const imageUrl = urlCreator.createObjectURL(this.response);
                let tag = document.createElement('a');
                tag.href = imageUrl;
                tag.download = beastName + '.png';
                document.body.appendChild(tag);
                tag.click();
                document.body.removeChild(tag);
            }
            xhr.send();
        }
    }

    return (
        <div className='Name-Header'>
            <h1>{name}</h1>
            {beastID && <button onClick={forceDownload} className='blue'>
                <Icon iconName='download' color='white' margin='right' />
                Download Token
            </button>}
        </div>
    )
}

function processName(name: string, roleTokenID: string | null, roleName: string | null | undefined, roleNameOrder: RoleNameOrderOptions = '1') {
    if (roleTokenID && roleName && roleName.toUpperCase() !== "NONE") {
        if (!roleNameOrder || roleNameOrder === '1') {
            return name + " " + roleName
        } else if (roleNameOrder === '3') {
            return roleName
        } else {
            return roleName + " " + name
        }
    }
    return name
}