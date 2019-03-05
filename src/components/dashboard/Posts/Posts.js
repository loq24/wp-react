import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../actions';
import Post from './Post';
import DeleteModal from './DeleteModal';

class Posts extends Component{
	constructor(props){
		super(props);
		this.state = { 
			showDeleteModal: false, 
			postToDelete: 0,
			deleting: false
		};
		this.deletePost = this.deletePost.bind(this);
		this.hideDeleteModal = this.hideDeleteModal.bind(this);
		this.triggerDeleteModal = this.triggerDeleteModal.bind(this);
	}

	componentDidMount(){
		this.props.fetchPosts();
	}

	deletePost(){
		this.setState({ deleting: true, showDeleteModal: false });
		this.props.deletePost(this.state.postToDelete, this.deletePostCallback.bind(this));
	}

	deletePostCallback(){
		this.setState({ postToDelete: 0, deleting: false });
	}

	triggerDeleteModal(postID){
		this.setState({ showDeleteModal : true, postToDelete: postID });
	}

	hideDeleteModal(){
		this.setState({ showDeleteModal: false });
	}

	renderPosts(posts){
		const { deleting, postToDelete } = this.state;
		return posts.map(post => {
			return <Post key={post.id} post={post} deleting={deleting} postToDelete={postToDelete} triggerDeleteModal={(postID) => this.triggerDeleteModal(postID)} />;
		});
	}

	render(){
		const { posts } = this.props;
		const { showDeleteModal } = this.state;
		if(!posts) return <div>Loading...</div>;
		return(
			<div>
				{ showDeleteModal && <DeleteModal deletePost={this.deletePost} hideDeleteModal={this.hideDeleteModal} /> }
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