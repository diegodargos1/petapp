import { action } from 'typesafe-actions';
import { UserData, UsersTypes } from './types';

export const loadRequest = () => action(UsersTypes.LOAD_REQUEST)

export const loadSuccess = (info: UserData) => action(UsersTypes.LOAD_SUCCESS, info)

export const loadFailure = () => action(UsersTypes.LOAD_FAILURE)

