export interface LoginInputType {
    email: string,
    password: string,
}

export interface LoginOutputType {
    accessToken: string,
    status: string,
}

export interface RegisterInputType {
    name: string,
    email: string,
    password: string,
    confirmPassword: string,
}