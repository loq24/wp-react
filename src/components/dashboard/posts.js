import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { Link } from 'react-router-dom';

class Posts extends Component{
	constructor(props){
		super(props);

		this.state = { 
			showDeleteModal: false, 
			postToDelete: 0,
			deleting: false
		};
	}

	componentDidMount(){
		this.props.fetchPosts();
	}

	deletePost(){
		this.setState({ deleting: true, showDeleteModal: false });
		this.props.deletePost(this.state.postToDelete, this.deletePostCallback.bind(this));
	}

	deletePostCallback(){
		this.setState({ postToDelete: 0, deleting: false })
	}

	deleteModal(){
		return (
			<div className="modal fade show" id="myModal" style={{display: 'block', top: '150px'}}>
			  <div className="modal-dialog" role="document">
			    <div className="modal-content">
			      <div className="modal-header">
			        <h5 className="modal-title" id="exampleModalLabel">Confirmation</h5>
			        <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={ () => this.setState({ showDeleteModal: false }) }>
			          <span aria-hidden="true">&times;</span>
			        </button>
			      </div>
			      <div className="modal-body">
			        Do you really want to delete this post?
			      </div>
			      <div className="modal-footer">
			        <button type="button" className="btn btn-secondary" onClick={ () => this.setState({ showDeleteModal: false }) } >Close</button>
			        <button type="button" className="btn btn-danger" onClick={ this.deletePost.bind(this) }>Yes</button>
			      </div>
			    </div>
			  </div>
			</div>
		);
	}

	renderPosts(posts){
		const { deleting, postToDelete } = this.state;
		return posts.map(post => {
			return ( 
				<div key={post.id} className={ deleting && post.id === postToDelete ? `card text-muted` : `card` }>
					<img className="card-img-top img-fluid" src={ post.better_featured_image.source_url } alt={post.title.rendered} />
					 <div className="card-body">
					    <h4 className="card-title">{ post.title.rendered }</h4>
					    <p className="card-text">{ post.excerpt.rendered.replace(/<\/?[^>]+(>|$)/g, "") }</p>
					    <p className="card-text"><small className="text-muted">Updated last { (new Date(post.modified)).toString() }</small></p>
				    </div>
				    <div className="card-footer">
				    	<Link to={`/posts/edit/${post.id}`} className="card-link text-info">Edit</Link>
						<a href={post.link} target="_blank" rel="noopener noreferrer" className="card-link text-info">View</a>
						<button onClick={ () => this.setState({ showDeleteModal : true, postToDelete: post.id }) } className="btn btn-link text-danger">Delete</button>
				  </div>
				</div>
			 );
		});
	}

	render(){
		const { posts } = this.props;
		const { showDeleteModal } = this.state;
		if(!posts){
			return <div>Loading...</div>;
		}
		return(
			<div>
				{ showDeleteModal && this.deleteModal() }
				<div className="card-columns">
					{this.renderPosts(posts)}	
				</div>	
			</div>
		);
	}
}

function mapStateToProps(state){
	return { 
		posts: state.wp.posts
	}
}

export default connect(mapStateToProps, actions)(Posts);