import _ from "lodash";
import val from "validate.js"

import { Texts, localized } from "../../../Localization";


const emailConstraint = {
    from: {
        email: true
    }
};

export default ({email, password, passwordConfirm, displayName}) => {
    
    if (
        (email !== undefined && _.isEmpty(email)) || 
        (password !== undefined && _.isEmpty(password)) || 
        (passwordConfirm !== undefined && _.isEmpty(passwordConfirm)) || 
        (displayName !== undefined && _.isEmpty(displayName))) 
    {
        return {
            ok: false,
            message: localized.text(Texts.errorMessages.fillAllFields)
        };
    }
    if (val({ from: email }, emailConstraint)) {
        return {
            ok: false,
            message: localized.text(Texts.errorMessages.enterValidEmail)
        };
    }
    if (passwordConfirm !== undefined && password !== passwordConfirm) {
        return {
            ok: false,
            message: localized.text(Texts.errorMessages.passwordsDontMatch)
        };
    }

    return {
        ok: true
    };
}