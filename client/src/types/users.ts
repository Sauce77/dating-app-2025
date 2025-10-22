export type User = {
    id: string,
    displayName: string,
    email: string,
    token: string,
    imageUrl: string
}

export type LoginCreds = {
    email: string,
    password: string,
}

export type RegisterCreds = {
    email: string,
    displayName: string;
    password: string,
}

export interface Photo {
    id: number,
    url: string,
    publicId?: string,
    memberId: string,
}