import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class Navbar extends Component {

    render(){

        let loginLogout = null;
        if(this.props.auth.isAuthenticated){
            loginLogout = <Link className="nav-link" style={{color: "#FFF"}} to="/auth/logout">Logout</Link>
        }else {
            loginLogout = <Link className="nav-link" style={{color: "#FFF"}} to="/auth/login">Login</Link>
        }

        return(
            <nav className="navbar navbar-expand-lg" style={{backgroundColor: "#0080ff", color: "#FFF"}}>
                 <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapseContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="collapseContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <Link className="nav-link" style={{color: "#FFF"}} to="/">Home <span className="sr-only">(current)</span></Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" style={{color: "#FFF"}} to="/auth/register">Register</Link>
                    </li>
                    <li className="nav-item">
                        {loginLogout}
                    </li>
                </ul>
                </div>
            </nav>  
        );
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}


export default connect(mapStateToProps, null)(Navbar);