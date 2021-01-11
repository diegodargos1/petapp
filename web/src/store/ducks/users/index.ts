import { Reducer } from 'redux';
import { UsersState, UsersTypes } from './types';

const INITIAL_STATE: UsersState = {
    info: { id: 1, email: 'diegodargos@gmail.com' },
    error: false,
    loading: false
}

const reducer: Reducer<UsersState> = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case UsersTypes.LOAD_REQUEST:
            return { ...state, loading: true };
        case UsersTypes.LOAD_SUCCESS:
            return { ...state, loading: false, error: false, data: action.payload.info }
        case UsersTypes.LOAD_FAILURE:
            return { ...state, loading: false, error: true, data: [] }
        default:
            return state
    }
}

export default reducer;