import React, { Component } from "react";
import isEmpty from "is-empty";
import { connect } from "react-redux";
import { registerNewUser } from "../../actions/authActions";

class Register extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            name: [],
            email: [],
            password: [],
            password2: [],
            errors: {}
        }
        this.fileInput = React.createRef();
      }
    
    

    componentWillReceiveProps(nextProps){
        if(nextProps.error){
            this.setState({
                errors: nextProps.error
            });
        }
        //console.log(nextProps.error);
    }    


    inputUpdateHandler = (evt) => {
        this.setState({[evt.target.id]: [evt.target.value]});
    }

    formSubmitHandler = (evt) => {
        evt.preventDefault();

        //const userData = { name, email, password, password2 } = this.state;
        let { name, email, password, password2 } = this.state

        let formData = new FormData();

        if(name.length > 1){
            name = name.join(" ");
        }else {
            name = (name instanceof Array)? name.join("") : ""
        }

        formData.append("name", name);
        formData.append("email", email.join(""));
        formData.append("password", password.join(""));
        formData.append("password2", password2.join(""));
        formData.append("profileImage", this.fileInput.current.files[0]);

        

        

        

        

        this.props.registerNewUser(formData, this.props.history);
    }

    render(){

        let errorArray = null;
        let errors = null;
        if(!isEmpty(this.state.errors.errors) && this.state.errors.errors){
            errorArray = Object.keys(this.state.errors.errors).map(key => {
                return this.state.errors.errors[key];
            });

            errors = errorArray.map(error => {
                return <div className="alert alert-danger" key={error}>{error}</div>
            });
            
        }

        return(
            <form encType="multipart/form-data" onSubmit={this.formSubmitHandler} style={{width: "50%", border: "0.07em solid #0080ff", padding: "3.5%", margin: "5% auto"}}>
            {errors}
            <h1 className="text-center display-2" style={{color: "#0080ff", marginBottom: "7%"}}>Sing Up</h1>    
                <div className="form-group">
                    <input value={this.state.name} onChange={this.inputUpdateHandler} type="text" id="name" name="name" className="form-control" placeholder="Your Name..." />
                </div>
                <div className="form-group">
                    <input value={this.state.email} onChange={this.inputUpdateHandler} type="email" id="email" name="email" className="form-control" placeholder="Your Email..." />
                </div>
                <div className="form-group">
                    <input value={this.state.password} onChange={this.inputUpdateHandler} type="password" id="password" name="password" className="form-control" placeholder="Your Password..." />
                </div>
                <div className="form-group">
                    <input value={this.state.password2} onChange={this.inputUpdateHandler} type="password" id="password2" name="password2" className="form-control" placeholder="Confirm Password..." />
                </div>
                <div className="custom-file">
                    <input ref={this.fileInput} type="file" className="custom-file-input" id="profileImage" name="profileImage" />
                    <label className="custom-file-label" htmlFor="profileImage">Choose file...</label>
                    <div className="invalid-feedback">Example invalid custom file feedback</div>
                </div>
                <button type="submit" className="btn btn-block mt-3">Register</button>
            </form>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        error: state.error
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        registerNewUser: (userData, history) => dispatch(registerNewUser(userData, history))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Register);