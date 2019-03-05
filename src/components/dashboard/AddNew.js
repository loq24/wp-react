import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';

class AddNew extends Component{
    constructor(props){
        super(props);
        this.state = {
            busy: false,
            showSuccessMessage: false
        };
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
        this.setState({ busy: true });
        console.log('Post Data', values);
        this.props.addPost(values, () => {
            this.setState({ busy: false, showSuccessMessage: true });
        });
    }

    renderForm(){
        const { handleSubmit } = this.props;
        const { busy } = this.state
        return(
            <form className="post-edit-form" onSubmit={ handleSubmit(this.onSubmit.bind(this)) }>
                <h2 style={{marginBottom: '15px'}} className="heading">Add a new post</h2>    
                <Field
                    placeholder="Title"
                    disabled={busy}
                    name="title"
                    type="text"
                    component={this.renderField}
                />
                <Field
                    placeholder="Content"
                    disabled={busy}
                    name="content"
                    component={this.renderField}
                />
                <button style={{marginRight:"10px"}} type="submit" className="btn btn-lg btn-primary btn-block btn-signin" disabled={busy}>{busy ? <span><i className='fa fa-circle-o-notch fa-spin'></i> Submitting...</span> : `Publish`}</button>
            </form>
        );
    }

    renderSuccessMessage(){
        return(
            <div className="success-message alert alert-success">
                <p>You have successfully published a post. <Link to="/posts" className="pull-right">Visit All Posts &raquo;</Link></p>
            </div>
        );
    }

    render(){
        const { showSuccessMessage } = this.state
        return(
            <div>
                {showSuccessMessage && this.renderSuccessMessage()}
                {!showSuccessMessage && this.renderForm()}        
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

const mapStateToProps = state =>{
    return { 
        post: state.wp.post,
        statusInfo: state.wp.statusInfo
    }
}

export default reduxForm({
    form: 'PostAddForm',
    validate: validate,
    enableReinitialize : true
})(connect(mapStateToProps, actions)(AddNew));