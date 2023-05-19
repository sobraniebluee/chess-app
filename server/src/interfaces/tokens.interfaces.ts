export interface TokensResponse {
    refresh_token: string,
    access_token: string
}

type TokenUserData = { id: string };

export interface UserIdentityRequest {
    identity: TokenUserData
}

export interface TokenData {
    payload: TokenUserData
}

