import { FETCH_POSTS, FETCH_POST, UPDATE_POST, ADD_POST, DELETE_POST } from '../actions/types';
import _ from 'lodash';

const INTITAL_STATE = {
	posts: null,
	post: null,
	statusInfo: ''
}

export default function(state = INTITAL_STATE, action){
	switch(action.type){
		case FETCH_POSTS:
			return { ...state, statusInfo: '', posts: action.payload, post: null}
		case FETCH_POST:
			return { ...state, statusInfo: '', post: action.payload }
		case UPDATE_POST:
			return { ...state, statusInfo: 'Update successful!', post: action.payload, posts: null }
		case ADD_POST:
			return { ...state, post: action.payload, posts: null }
		case DELETE_POST:
			return { ...state, statusInfo: 'The post was successfully deleted.', posts: _.reject(state.posts, { id: action.payload.id }) }
		default:
			return state;
	}
}