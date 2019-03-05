import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class Account extends Component{
    render(){
        const { user } = this.props;
        if(!user) return <div>Loading...</div>;
        return(
            <dl className="row">
                <dt className="col-sm-3">Name</dt>
                <dd className="col-sm-9">{user.name}</dd>

                <dt className="col-sm-3">Bio</dt>
                <dd className="col-sm-9">{user.description}</dd>
    
                <dt className="col-sm-3">Website</dt>
                <dd className="col-sm-9">{user.url}</dd>
            </dl>
        );
    }
}

const mapStateToProps = state =>{
    return{
        user: state.auth.loggedInUser
    };
}

export default connect(mapStateToProps, actions)(Account);