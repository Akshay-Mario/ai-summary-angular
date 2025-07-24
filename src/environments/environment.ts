
export const baseUrl = '/api';

export const environment = {
    registerUrl:  baseUrl.concat('/Auth/register'),
    loginURL:  baseUrl.concat('/Auth/login'),
    refreshUrl: baseUrl.concat('/Auth/refresh'),
    getUserUrl: baseUrl.concat('/User/me'),
    excludedUrls: ['/Auth/register', '/Auth/login', '/Auth/refresh'],
}