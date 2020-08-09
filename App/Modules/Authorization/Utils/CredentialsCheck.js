import _ from "lodash";
import val from "validate.js"

import { Texts, localized } from "../../../Localization";

// Email constraint object used by validate.js
const emailConstraint = {
    from: {
        email: true
    }
};

/**
 * Checks each of the given credential fields.
 * Returns {ok: true} if fields are valid,
 *  {ok: false, message: error} if fields are not valid
 */
const checkCredentials = ({email, password, passwordConfirm, displayName}) => {
    
    // If any of the fields are defined/given but are empty strings, it is not valid
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

    // If email field is not a valid email address, it is not valid
    if (val({ from: email }, emailConstraint)) {
        return {
            ok: false,
            message: localized.text(Texts.errorMessages.enterValidEmail)
        };
    }

    // If passwordConfirm is present but does not match password, it is not valid
    if (passwordConfirm !== undefined && password !== passwordConfirm) {
        return {
            ok: false,
            message: localized.text(Texts.errorMessages.passwordsDontMatch)
        };
    }

    // If passed all checks, return ok: true
    return {
        ok: true
    };
}

export default checkCredentials;