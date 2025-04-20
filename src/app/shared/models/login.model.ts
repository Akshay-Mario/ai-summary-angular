

export interface LoginModel {
    username: string;
    password: string;
}

export interface IAuthModel {
    message: string;
    userId: number;
}

export interface IloginResponseModel {
    accessToken: string;
}


export interface IjwtTokenModel {
    exp: number;
    id: string;
    username: string;
}