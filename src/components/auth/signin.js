import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import * as actions from '../../actions';
import { connect } from 'react-redux';

class SignIn extends Component{
	constructor(props){
		super(props);
		this.state = { busy: false };
	}

	componentWillUpdate(nextProps){
		if(nextProps.errorMsg && this.state.busy){
			this.setState({ busy: false });
		}
	}

	renderField({disabled, placeholder, type, input, name, meta: { touched, error }}){
		const className = `form-group ${touched && error ? 'has-danger' : ''}`;
		return ( 
			<div className={className}>
				<input 
					placeholder={placeholder}
					className="form-control"
					type={type}
					name={name}
					disabled={disabled}
					{...input}
				/>
				{touched && (error && <span className="text-help">{error}</span>)}
			</div> 
		);
	}

	onSubmit( values ){
		this.setState({ busy: true });
		this.props.signInUser(values, () => {
			this.props.history.push('/posts');
		});
	}

	renderInfoMsg(){
		return (
			<div className="alert alert-info" role="alert">
			  {this.props.info}
			</div>
		);
	}

	renderErrorMsg(){
		return (
			<div className="alert alert-danger" role="alert">
			  {this.props.errorMsg}
			</div>
		);
	}

	render(){
		const { handleSubmit, errorMsg } = this.props;
		const submitting = this.state.busy;
		return(
			<div className="wrapper">
				<form className="form-signin" onSubmit={ handleSubmit(this.onSubmit.bind(this)) }>
					{this.props.info && this.renderInfoMsg()}
					{this.props.errorMsg && this.renderErrorMsg()}
					<h2 className="form-signin-heading">Please sign in</h2>
					<Field
		        		placeholder="Username"
		        		disabled={submitting}
		        		name="username"
		        		type="text"
		        		component={this.renderField}
		        	/>
		        	<Field
		        		placeholder="Password"
		        		disabled={submitting}
		        		name="password"
		        		type="password"
		        		component={this.renderField}
		        	/>
		        	<button style={{marginRight:"10px"}} type="submit" className="btn btn-lg btn-primary btn-block btn-signin" disabled={submitting}>{submitting && !errorMsg ? <span><i className='fa fa-circle-o-notch fa-spin'></i> Signing in...</span> : `Sign In`}</button>
    		    </form>
			</div>
		);
	}
}

function mapStateToProps(state){
	return { 
		info: state.auth.info, 
		errorMsg: state.auth.signInError
	};
}

const validate = values => {
	const errors = {};
	const username = values.username;
	const password = values.password;

	if(!username){
		errors.username = 'Username field is required!'	
	}
	if(!password){
		errors.password = 'You should provide a password.'	
	}

	return errors;
}

export default reduxForm({
	form: 'SignInForm',
	validate: validate,
})(connect(mapStateToProps, actions)(SignIn));