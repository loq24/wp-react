import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ReduxThunk from 'redux-thunk';

import SignIn from './components/auth/signin';
import RequireAuth from './components/auth/require_auth';
import UnRequireAuth from './components/auth/unrequire_auth';
import Dashboard from './components/dashboard/dashboard';
import Introduction from './components/dashboard/introduction';
import Posts from './components/dashboard/posts';
import PostEdit from './components/dashboard/post_edit';
import reducers from './reducers';
import { fetchLoggedInUserData } from './actions';
import { AUTH_USER } from './actions/types.js';

const createStoreWithMiddleware = applyMiddleware(ReduxThunk)(createStore);

const store = createStoreWithMiddleware(reducers);
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
	    			<Route path="/posts" exact component={RequireAuth(Posts)} />
	    			<Route path="/posts/edit/:id" component={RequireAuth(PostEdit)} />
	    			<Route path="/pages" exact component={() => <div>This page is still under development.</div>} />
	    			<Route path="/comments" exact component={() => <div>This page is still under development.</div>} />
	    		</Dashboard>
	    	</Switch>
    	
    </BrowserRouter>
  </Provider>
  , document.querySelector('#root'));
registerServiceWorker();
