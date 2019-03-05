import axios from 'axios';
import { AUTH_USER, UNAUTH_USER, AUTH_ERROR, FETCH_LOGGED_IN_USER, CLEAR_ERROR, FETCH_POSTS, FETCH_POST, FETCH_CATEGORY,UPDATE_POST, ADD_POST, DELETE_POST } from './types';

const ROOT_URL = `https://api.lougiequisel.com/wp-json`;

export function tokenHeader(){
	const token = localStorage.getItem('_wp_react_token');
	return { headers: { Authorization: `Bearer ${token}` } };
}

export function signInUser(credentials){
	return (dispatch) => {
		dispatch(clearError());
		axios.post(`${ROOT_URL}/jwt-auth/v1/token`, credentials)
			.then(response => {
				localStorage.setItem('_wp_react_token',response.data.token);
				dispatch(fetchLoggedInUserData());
				dispatch({ type: AUTH_USER });
			})
			.catch((error) =>{
				dispatch(authError('Bad login info.')) 
			});
	}
}

export function fetchLoggedInUserData(){
	return dispatch => {
		axios.get(`${ROOT_URL}/wp/v2/users/me`, tokenHeader())
		.then(response => {
			dispatch({ type: FETCH_LOGGED_IN_USER, payload: response.data });			
		})
		.catch(error => { dispatch(signoutUser('Please log in again.')); });
	}
}

export function fetchPosts(){
	return dispatch => {
		axios.get(`${ROOT_URL}/wp/v2/posts`, tokenHeader())
		.then(response => {
			dispatch({ type: FETCH_POSTS, payload: response.data })
		})
		.catch(error => dispatch(signoutUser('Please log in again.')) );
	}
}

export function fetchPost(id){
	return dispatch => {
		axios.get(`${ROOT_URL}/wp/v2/posts/${id}`, tokenHeader())
		.then(response => {
			dispatch({ type: FETCH_POST, payload: response.data })
		})
		.catch(error => dispatch(signoutUser('Please log in again.')) )
	}
}

export function updatePost(id, data){
	return dispatch => {
		axios.post(`${ROOT_URL}/wp/v2/posts/${id}`, { 'title': data.title, 'content': data.content} , tokenHeader())
		.then(response => {
			dispatch({ type: UPDATE_POST, payload: response.data })
		})
		.catch(error => dispatch(signoutUser('Please log in again.')) )
	}
}

export function addPost(data, callback){
	data.status = 'publish';
	return dispatch => {
		axios.post(`${ROOT_URL}/wp/v2/posts/`, data , tokenHeader())
		.then(response => {
			dispatch({ type: ADD_POST, payload: response.data })
			callback();
		})
		.catch(error => dispatch(signoutUser('Please log in again.')) )
	}
}

export function deletePost(id, callback){
	return dispatch => {
		axios.delete(`${ROOT_URL}/wp/v2/posts/${id}`, tokenHeader())
		.then(response => {
			dispatch({ type: DELETE_POST, payload: response.data })
			callback();
		})
		.catch(error => dispatch(signoutUser('Please log in again.')) )
	}
}

export function fetchCategory(cat_id){
	return dispatch => {
		axios.get(`${ROOT_URL}/wp/v2/categories/${cat_id}`, tokenHeader)
		.then(response => {
			dispatch({ type: FETCH_CATEGORY, payload: response.data });
		})
		.catch(error => dispatch(signoutUser('Please log in again.')) );
	}
}

export function authError(error){
	return {
		type: AUTH_ERROR,
		payload: error
	};
}

export function clearError(){
	return{ type: CLEAR_ERROR }
}

export function signoutUser(msg = 'You are successfully logged out.'){
	localStorage.removeItem('_wp_react_token');
	return { type: UNAUTH_USER, payload: msg};
}