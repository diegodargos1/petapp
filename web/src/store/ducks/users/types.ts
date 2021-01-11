export enum UsersTypes {
    LOAD_REQUEST = '@user/LOAD_REQUEST',
    LOAD_SUCCESS = '@user/LOAD_SUCCESS',
    LOAD_FAILURE = '@user/LOAD_FAILURE',
}

export interface UserData {
    id: number,
    email: string,

}

export interface UsersState {
    readonly info: UserData,
    readonly loading: boolean,
    readonly error: boolean
}