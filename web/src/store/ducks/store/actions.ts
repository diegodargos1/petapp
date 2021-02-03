import { action } from 'typesafe-actions';
import { StoreData, StoresTypes } from './types';

export const loadRequest = () => action(StoresTypes.LOAD_REQUEST)

export const loadSuccess = (info: StoreData) => action(StoresTypes.LOAD_SUCCESS, info)

export const loadFailure = () => action(StoresTypes.LOAD_FAILURE)

