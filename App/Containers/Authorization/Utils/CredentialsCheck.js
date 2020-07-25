import _ from "lodash";
import val from "validate.js"


const emailConstraint = {
    from: {
        email: true
    }
};

export default ({email, password, passwordConfirm}) => {
    
    if (_.isEmpty(email) || _.isEmpty(password) || (passwordConfirm !== undefined && _.isEmpty(passwordConfirm))) {
        return {
            ok: false,
            message: "Please fill all fields."
        };
    }
    if (val({ from: email }, emailConstraint)) {
        return {
            ok: false,
            message: "Please enter a valid e-mail address."
        };
    }
    if (passwordConfirm !== undefined && password !== passwordConfirm) {
        return {
            ok: false,
            message: "Passwords do not match."
        };
    }

    return {
        ok: true
    };
}