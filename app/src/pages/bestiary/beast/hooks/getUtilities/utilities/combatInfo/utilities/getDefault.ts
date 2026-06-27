export function getDefault<Type>(roleInfo: Type, defaultInfo: Type): Type {
    return roleInfo ?? defaultInfo
}