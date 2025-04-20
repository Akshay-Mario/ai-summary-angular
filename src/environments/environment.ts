
export const baseUrl = '/api';

export const environment = {
    registerUrl:  baseUrl.concat('/Auth/register'),
    loginURL:  baseUrl.concat('/Auth/login'),
    refreshUrl: baseUrl.concat('/Auth/refresh'),
    getUser: baseUrl.concat('/User/getUser'),
    excludedUrls: ['/Auth/register', '/Auth/login', '/Auth/refresh'],
}