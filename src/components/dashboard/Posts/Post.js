import React from 'react';
import { Link } from 'react-router-dom';

const Post = ({ post, deleting, postToDelete, triggerDeleteModal }) =>{
    return(
        <div key={post.id} className={ deleting && post.id === postToDelete ? `card text-muted` : `card` }>
                    { post.better_featured_image && <img className="card-img-top img-fluid" src={ post.better_featured_image.source_url } alt={post.title.rendered} /> }
             <div className="card-body">
                <h4 className="card-title">{ post.title.rendered }</h4>
                <p className="card-text">{ post.excerpt.rendered.replace(/<\/?[^>]+(>|$)/g, "").substring(0, 150)+`...` }</p>
                <p className="card-text"><small className="text-muted">Updated last { (new Date(post.modified)).toString() }</small></p>
            </div>
            <div className="card-footer">
                <Link to={`/posts/edit/${post.id}`} className="card-link text-info">Edit</Link>
                <a href={post.link} target="_blank" rel="noopener noreferrer" className="card-link text-info">View</a>
                <button onClick={ ()=> triggerDeleteModal(post.id) } className="btn btn-link text-danger">Delete</button>
          </div>
        </div>
    );
}

export default Post;