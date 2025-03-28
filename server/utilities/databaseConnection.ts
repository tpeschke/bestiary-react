import { Request } from '../interfaces/apiInterfaces'

export default function getDatabaseConnection(request: Request) {
    return request.app.get('db')
}

export function getDatabaseConnectionViaApp(app: any) {
    return app.get('db')
}