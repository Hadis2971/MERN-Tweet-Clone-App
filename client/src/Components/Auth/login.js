import React, { Component } from "react";
import isEmpty from "is-empty";
import { connect } from "react-redux";
import { login } from "../../actions/authActions";

class Login extends Component {
    state = {
        email: [],
        password: [],
        errors: {}
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.error){
            this.setState({
                errors: nextProps.error
            });
        }
    }

    inputUpdateHandler = (evt) => {
        this.setState({[evt.target.id]: [evt.target.value]});
    }

    formSubmitHandler = (evt) => {
        evt.preventDefault();

        const userData = {
            email: this.state.email.join(""),
            password: this.state.password.join("")
        }
        
        //console.log(userData);

        this.props.login(userData, this.props.history);
    }

    render(){

        let errorsArray = null;
        let errors = null;

        if(!isEmpty(this.state.errors) && this.state.errors.errors){
            errorsArray = Object.keys(this.state.errors.errors).map(key => {
                return this.state.errors.errors[key];
            });

            errors = errorsArray.map(error => {
                return <div className="alert alert-danger" key={error}>{error}</div>
            });
        }


        return(
            <form onSubmit={this.formSubmitHandler} style={{width: "50%", border: "0.07em solid #0080ff", padding: "3.5%", margin: "5% auto"}}>
            {errors}
            <h1 className="text-center display-2" style={{color: "#0080ff", marginBottom: "7%"}}>Sing In</h1>    
                <div className="form-group">
                    <input value={this.state.email} onChange={this.inputUpdateHandler} type="email" id="email" name="email" className="form-control" placeholder="Your Email..." />
                </div>
                <div className="form-group">
                    <input value={this.state.password} onChange={this.inputUpdateHandler} type="password" id="password" name="password" className="form-control" placeholder="Your Password..." />
                </div>
                <button type="submit" className="btn btn-block">Login</button>
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
        login: (userData, history) => dispatch(login(userData, history))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Login);