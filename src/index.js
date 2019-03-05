import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ReduxThunk from 'redux-thunk';

import SignIn from './components/Signin';
import RequireAuth from './components/auth/require_auth';
import UnRequireAuth from './components/auth/unrequire_auth';
import Dashboard from './components/dashboard/Dashboard';
import Introduction from './components/dashboard/Introduction';
import Posts from './components/dashboard/Posts/Posts';
import PostEdit from './components/dashboard/PostEdit';
import AddNew from './components/dashboard/AddNew';
import Account from './components/dashboard/Account';
import reducers from './reducers';
import { fetchLoggedInUserData } from './actions';
import { AUTH_USER } from './actions/types.js';

const store =  createStore(reducers, {}, applyMiddleware(ReduxThunk));
const token = localStorage.getItem('_wp_react_token');
if(token){
	store.dispatch({ type: AUTH_USER });
	store.dispatch(fetchLoggedInUserData(token));
}

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
    		<Switch>
    			<Route path="/signin" component={UnRequireAuth(SignIn)} />
    			<Dashboard>
            <Route path="/" exact component={RequireAuth(Introduction)} />
	    			<Route path="/account" exact component={RequireAuth(Account)} />
            <Route path="/posts" exact component={RequireAuth(Posts)} />
	    			<Route path="/add-post" exact component={RequireAuth(AddNew)} />
	    			<Route path="/posts/edit/:id" component={RequireAuth(PostEdit)} />
	    		</Dashboard>
	    	</Switch>
    	
    </BrowserRouter>
  </Provider>
  , document.querySelector('#root'));
registerServiceWorker();
