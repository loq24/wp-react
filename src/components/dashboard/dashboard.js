import React, { Component } from 'react';
import Navbar from '../common/Navbar';

class Dashboard extends Component{
	render(){
        return(
			<div>
				<Navbar pathname={this.props.location.pathname} />
				<div className="content-wrapper">
    				<div className="container-fluid">
    					{this.props.children}
    				</div>
    			</div>
			</div>
		);
	}
}

export default Dashboard;