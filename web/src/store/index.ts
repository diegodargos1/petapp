import { createStore, Store } from 'redux';
import rootReducer from './ducks/rootReducer';
import { UsersState } from './ducks/users/types';

export interface ApplicationState {
    users: UsersState
}

const store: Store<ApplicationState> = createStore(rootReducer);

export default store;