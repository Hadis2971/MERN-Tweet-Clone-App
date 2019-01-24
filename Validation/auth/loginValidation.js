const Validator = require("validator");
const isEmpty   = require("is-empty");

module.exports = input => {
    let errors = {};
    
    const email = isEmpty(input.email)? "" : input.email;
    const password = isEmpty(input.password)? "" : input.password;    

    if(Validator.isEmpty(email)){
        errors.email = "The Email Field is Required!!!";
    }else if(!Validator.isEmail(email)){
        errors.email = "Please Enter a Valida Emaim Address!!!";
    }

    if(Validator.isEmpty(password)){
        errors.password = "The Password Field is Required!!!";
    }else if(!Validator.isLength(password, {min: 5, max: 15})){
        errors.password = "The Password Field Must be Between 5 and 15 Characters Long";
    }

    return{
        errors, 
        isValid: isEmpty(errors)
    }

};
