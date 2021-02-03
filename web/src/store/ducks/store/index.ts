import { Reducer } from 'redux';
import { StoreData, StoreState, StoresTypes } from './types';

const INITIAL_STATE: StoreState = {
    info: <StoreData>{},
    error: false,
    loading: false
}

const reducer: Reducer<StoreState> = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case StoresTypes.LOAD_REQUEST:
            return { ...state, loading: true };
        case StoresTypes.LOAD_SUCCESS:
            return { ...state, loading: false, error: false, data: action.payload.info }
        case StoresTypes.LOAD_FAILURE:
            return { ...state, loading: false, error: true, data: [] }
        default:
            return state
    }
}

export default reducer;