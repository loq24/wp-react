import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class Navbar extends Component{
	constructor(props){
		super(props);
		this.state = {
			showUserDropdown: false
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

	render(){
		let userName = <i className='fa fa-circle-o-notch fa-spin'></i>;
		let avatar;
		const { user, pathname } = this.props;
		if(user){
			const { name, avatar_urls } = user;
			userName = name;
			avatar = avatar_urls[24];
		}
		return(
			<nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top" id="mainNav">
			    <Link className="navbar-brand" to="/">WP React Demo</Link>
			    <div className="collapse navbar-collapse" id="navbarResponsive">
			    <ul className="navbar-nav navbar-sidenav" id="exampleAccordion">
			        <li className={ pathname === '/posts' || pathname.includes('/posts/edit/') ? `nav-item active` : `nav-link` } data-toggle="tooltip">
			          <Link className="nav-link" to="/posts">
			            <i className="fa fa-fw fa-globe"></i>
			            <span className="nav-link-text"> Posts</span>
			          </Link>
			        </li>
			        <li className={ pathname === '/add-post' ? `nav-item active` : `nav-link` } data-toggle="tooltip">
			          <Link className="nav-link" to="/add-post">
			            <i className="fa fa-fw fa-file"></i>
			            <span className="nav-link-text"> Add New</span>
			          </Link>
			        </li>	
			        <li className={ pathname === '/account' ? `nav-item active` : `nav-link` } data-toggle="tooltip">
			          <Link className="nav-link" to="/account">
			            <i className="fa fa-fw fa-info"></i>
			            <span className="nav-link-text"> Account Info</span>
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