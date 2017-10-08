import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import AuthReducer from './auth_reducer';
import wp from './wp_reducer';

const rootReducer = combineReducers({
  form: formReducer,
  auth: AuthReducer,
  wp
});

export default rootReducer;
