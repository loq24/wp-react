import { AUTH_USER, UNAUTH_USER, AUTH_ERROR, FETCH_LOGGED_IN_USER, CLEAR_ERROR } from '../actions/types';

export default function(state = {}, action){
	switch(action.type){
		case AUTH_USER:
			return {...state, signInError: '', authenticated: true, info: ''};
		case UNAUTH_USER:
			return {...state, authenticated: false, loggedInUser: '' , info: action.payload };
		case FETCH_LOGGED_IN_USER:
			return {...state, loggedInUser: action.payload};
		case AUTH_ERROR:
			return {...state, signInError: action.payload};
		case CLEAR_ERROR:
			return {...state, signInError: '', info: ''};
		default:
			return state;
	}
}