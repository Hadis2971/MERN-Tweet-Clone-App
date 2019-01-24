import React, { Component } from "react";
import { post, getPosts, deletePost, updatePost } from "../../actions/postActions";
import { connect } from "react-redux";


import Modal from "./modal/modal";
import PostImage from "./postImage/postImage";
import ProfileImage from "./profileImage/profileImage";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt  } from '@fortawesome/free-solid-svg-icons'

import "./dashboard.css";



class Dashboard extends Component {

    state = {
        post: "",
        posts: [],
        showModal: false,
        updateID: null
    }

    
    componentDidMount(){
        if(this.props.auth.user){
            this.props.getPosts(this.props.auth.user.id); 
        }
    }

    addPostHandler = (evt) => {
        evt.preventDefault();
        if(!this.state.post){
            alert("Posts Must Not Be Empty");
        }else {
            this.props.addPost(this.props.auth.user.id, this.state.post);
            this.setState({post: ""});
        }
    }

    addPostOnEnter = (evt) => {
        if(evt.key === "Enter"){
            this.props.addPost(this.props.auth.user.id, this.state.post);
            this.setState({post: ""});
        }
    }

    showModal = (id) => {
        this.setState({showModal: true, updateID: id});
    }

    hideModal = () => {
        this.setState({showModal: false});
    }

    inputChangeHandler = (evt) => {
        this.setState({
            post: evt.target.value
        });
    }    

    

    updatePostHandler = (newText) => {
        this.props.updatePost(this.state.updateID, newText, this.props.auth.user.id);
        this.setState({showModal: false});
    }
    

    render(){   
        
        let posts = null;
        if(this.props.post.posts){
            posts = this.props.post.posts.map((post) => {
                const id = (post.hasOwnProperty("_id"))? post._id : post.id;
                return <li className="list-item" key={id}>
                <PostImage 
                profileImage={this.props.auth.user.profileImage} />
                
                {post.text} 
                <span className="date">{post.date}</span>
                <span onClick={() => this.props.deletePost(this.props.auth.user.id, id)} className="close">&times;</span>
                <FontAwesomeIcon className="update" onClick={() => this.showModal(id)} icon={faPencilAlt} /></li>
            });
        }

        

        if(this.props.auth.isAuthenticated && !this.state.loading){
            return (
                <div>
                    {this.state.showModal && 
                    <Modal updatePostHandler={this.updatePostHandler} 
                    hideModal={this.hideModal}/>}

                    <div className="row" style={{padding: "3.5%"}}>
                        <div className="col-lg-3">
                        <div className="card" style={{width: "18rem"}}>
                            <div className="card-body">
                            <ProfileImage profileImage={this.props.auth.user.profileImage} />
                                <h5 className="card-title">
                                Name: {this.props.auth.user.name}</h5>
                            </div>
                        </div>
                        </div>

                        <div className="col-lg-9" id="box">
                        <h1 className="text-center display-3" style={{color: "#0080ff"}}>Your Posts...</h1>
                            <ul id="list">{posts}</ul>
                            <form onSubmit={this.addPostHandler}>
                                <div className="form-group">
                                    <input className="form-control" 
                                    value={this.state.post} 
                                    onChange={this.inputChangeHandler} 
                                    type="text" id="post" 
                                    name="post" placeholder="Your Post..." />
                                </div>
                                <button type="submit" className="btn btn-primary">Add Post</button>
                            </form>
                        </div>
                    </div>
                </div>
            )
            
        }else {
            return <h1 className="text-center display-1" style={{color: "#0080ff", marginTop: "13%"}}>Please Login</h1>
        } 
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        post: state.post
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addPost: (id, text) => dispatch(post(id, text)),
        getPosts: (id) => dispatch(getPosts(id)),
        deletePost: (user, id) => dispatch(deletePost(user, id)),
        updatePost: (id, newText, user) => dispatch(updatePost(id, newText, user))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);