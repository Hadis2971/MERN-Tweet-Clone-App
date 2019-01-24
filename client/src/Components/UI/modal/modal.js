import React, { Component } from "react";


import "./modal.css";

class Modal extends Component {

    state = {
        inputValue: ""
    }

    updatePostHandlerOnEnter = (evt) => {
        if(evt.key === "Enter"){
            this.props.updatePostHandler(this.state.inputValue)
        }
    }

    inputChangeHandler = (evt) => {
        this.setState({inputValue: evt.target.value});
    }    

    render(){
        return(
            <div id="myModal" className="modal">
                <div className="modal-content">
                    
                    <span className="close" 
                    onClick={this.props.hideModal}>&times;</span>
                    <h2 className="hdr">Change Your Post</h2>
                    
                    
                    <div className="form-group">
                        <input onChange={this.inputChangeHandler} 
                        value={this.state.inputValue} type="text" 
                        className="form-control" 
                        onKeyPress={this.updatePostHandlerOnEnter}/>
                    </div>
                        <button onClick={() => this.props.updatePostHandler(this.state.inputValue)} 
                        className="btn btn-dark btn-block mt-3">Submit</button>
                </div>
            </div>
        );
    }
    
}

export default Modal;