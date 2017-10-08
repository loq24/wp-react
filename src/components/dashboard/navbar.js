import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class Navbar extends Component{
	constructor(props){
		super(props);
		this.state = {
			showUserDropdown: false,
			selectedTab: 1
		};
	}
	handleLogout(){
		this.props.signoutUser();
	}

	handleUserDropdown(){
		const { showUserDropdown } = this.state;
		if(showUserDropdown){
			this.setState({ showUserDropdown: false });
		}
		else{
			this.setState({ showUserDropdown: true });	
		}
	}

	renderUserAvatar(avatar){
		return <img style={{marginRight: '5px'}} src={avatar} alt="avatar" />;
	}

	setSelectedTab(selectedTab){
		this.setState({ selectedTab });
	}

	render(){
		const {selectedTab} = this.state;
		let userName = <i className='fa fa-circle-o-notch fa-spin'></i>;
		let avatar;
		if(this.props.user){
			const { name, avatar_urls } = this.props.user;
			userName = name;
			avatar = avatar_urls[24];
		}
		return(
			<nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top" id="mainNav">
			    <Link className="navbar-brand" to="/">TravelWid Us</Link>
			    <div className="collapse navbar-collapse" id="navbarResponsive">
			    <ul className="navbar-nav navbar-sidenav" id="exampleAccordion">
			        <li className={ selectedTab === 1 ? `nav-item active` : `nav-link` } data-toggle="tooltip">
			          <Link onClick={ this.setSelectedTab.bind(this, 1) } className="nav-link" to="/posts">
			            <i className="fa fa-fw fa-globe"></i>
			            <span className="nav-link-text"> Travel Posts</span>
			          </Link>
			        </li>
			        <li className={ selectedTab === 2 ? `nav-item active` : `nav-link` } data-toggle="tooltip">
			          <Link onClick={ this.setSelectedTab.bind(this, 2) } className="nav-link" to="/pages">
			            <i className="fa fa-fw fa-clipboard"></i>
			            <span className="nav-link-text"> Pages</span>
			          </Link>
			        </li>
			        <li className={ selectedTab === 3 ? `nav-item active` : `nav-link` } data-toggle="tooltip">
			          <Link onClick={ this.setSelectedTab.bind(this, 3) } className="nav-link" to="/comments">
			            <i className="fa fa-fw fa-comments"></i>
			            <span className="nav-link-text"> Comments</span>
			          </Link>
			        </li>
			    </ul>
				<ul className="navbar-nav ml-auto">
					<li className="dropdown open">
	                    <a className="dropdown-toggle" onClick={ this.handleUserDropdown.bind(this) }>
	                         { avatar && this.renderUserAvatar(avatar) }{ userName }
	                    </a>
	                    <ul className={ this.state.showUserDropdown ? `dropdown-menu show` : `dropdown-menu` }>
	                        <a className="dropdown-item" onClick={ this.handleLogout.bind(this) } ><i className="fa fa-sign-out fa-fw"></i> Logout</a>
	                    </ul>
	                </li>
				</ul>
				</div>
			</nav>
		);
	}
}

function mapStateToProps(state){
	return { user: state.auth.loggedInUser };
}

export default connect(mapStateToProps, actions)(Navbar);