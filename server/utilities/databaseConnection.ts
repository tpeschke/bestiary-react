import { Request } from '../apiInterfaces'

export default function getDatabaseConnection(request: Request) {
    return request.app.get('db')
}