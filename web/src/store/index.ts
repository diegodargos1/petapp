import { createStore, Store } from 'redux';
import rootReducer from './ducks/rootReducer';
import { StoreState } from './ducks/store/types';
import { UsersState } from './ducks/users/types';

export interface ApplicationState {
    users: UsersState,
    stores: StoreState,
}

const store: Store<ApplicationState> = createStore(rootReducer);

export default store;