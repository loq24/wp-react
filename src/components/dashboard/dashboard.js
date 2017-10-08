import React, { Component } from 'react';
import Navbar from '../dashboard/navbar';

class Dashboard extends Component{
	render(){
		return(
			<div>
				<Navbar />
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