import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';

class PostEdit extends Component{
	constructor(props){
		super(props);

		this.state = {
			showComponent: false,
			busy: false
		};
	}

	componentDidMount(){
		const { id }  = this.props.match.params;	
		this.props.fetchPost(id);

	}

	componentWillReceiveProps(nextProps){
		if(nextProps.post !== this.props.post){
			this.setState({ showComponent: true });
			this.setState({ busy: false });
			this.props.change('title', nextProps.post.title.rendered);
			this.props.change('content', nextProps.post.content.rendered);
		}
	}

	renderField({disabled, placeholder, type, input, name, meta: { touched, error }}){
		const className = `form-group ${touched && error ? 'has-danger' : ''}`;
		if(type){
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
		else{
			return (
				<div className={className}>
					<textarea 
						style={{height: '350px'}}
						placeholder={placeholder}
						className="form-control"
						name={name}
						disabled={disabled}
						{...input}
					/>
					{touched && (error && <span className="text-help">{error}</span>)}
				</div> 
			);
		}
	}

	onSubmit( values ){
		const { id }  = this.props.match.params;	
		this.setState({ busy: true });
		this.props.updatePost(id, values);
	}

	renderStatusInfo(statusInfo){
		return (
			<div className="alert alert-success">
			  {statusInfo}
			</div>
		);
	}

	render(){
		const { post, handleSubmit, statusInfo } = this.props;
		const submitting = this.state.busy;
		if(!post || !this.state.showComponent){
			return <div>Loading...</div>;
		}		
		return(
			<div>
				{ statusInfo && !submitting && this.renderStatusInfo(statusInfo) }
				<form className="post-edit-form" onSubmit={ handleSubmit(this.onSubmit.bind(this)) }>
					<h2 style={{marginBottom: '15px'}} className="heading">Update post <small><Link to="/posts" className="pull-right">All Posts &raquo;</Link></small></h2>	
					<Field
		        		placeholder="Title"
		        		disabled={submitting}
		        		name="title"
		        		type="text"
		        		component={this.renderField}
		        	/>
		        	<Field
		        		placeholder="Content"
		        		disabled={submitting}
		        		name="content"
		        		component={this.renderField}
		        	/>
		        	<button style={{marginRight:"10px"}} type="submit" className="btn btn-lg btn-primary btn-block btn-signin" disabled={submitting}>{submitting ? <span><i className='fa fa-circle-o-notch fa-spin'></i> Updating...</span> : `Update`}</button>
				</form>
			</div>
		);
	}
}

const validate = values => {
	const errors = {};
	const title = values.title;
	if(!title){
		errors.title = 'Please input title';
	}
	return errors;
}

function mapStateToProps(state){
	return { 
		post: state.wp.post,
		statusInfo: state.wp.statusInfo
	}
}


export default reduxForm({
	form: 'PostEditForm',
	validate: validate,
	enableReinitialize : true
})(connect(mapStateToProps, actions)(PostEdit));