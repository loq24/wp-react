import { FETCH_POSTS, FETCH_POST, UPDATE_POST, DELETE_POST } from '../actions/types';
import _ from 'lodash';

export default function(state = {}, action){
	switch(action.type){
		case FETCH_POSTS:
			console.log(action.payload);
			return { ...state, statusInfo: '', posts: action.payload }
		case FETCH_POST:
			return { ...state, statusInfo: '', post: action.payload }
		case UPDATE_POST:
			return { ...state, statusInfo: 'Update successful!', post: action.payload, posts: null }
		case DELETE_POST:
			return { ...state, statusInfo: 'The post was successfully deleted.', posts: _.reject(state.posts, { id: action.payload.id }) }
		default:
			return state;
	}
}