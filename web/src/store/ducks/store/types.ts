import { Double } from "typeorm";

export enum StoresTypes {
    LOAD_REQUEST = '@store/LOAD_REQUEST',
    LOAD_SUCCESS = '@store/LOAD_SUCCESS',
    LOAD_FAILURE = '@store/LOAD_FAILURE',
}

export interface StoreData {
    id: number,
    email: string,
    nome: string,
    endereco: string,
    lat: Double,
    lon: Double,
    img: string,
    tel: string,
    website: string,
}

export interface StoreState {
    readonly info: StoreData,
    readonly loading: boolean,
    readonly error: boolean
}