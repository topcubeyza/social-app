import _ from "lodash";
import val from "validate.js"

import { Texts, localized } from "../../../Localization";

export default ({password, passwordConfirm, displayName}) => {
    
    if (
        (password !== undefined && _.isEmpty(password)) || 
        (passwordConfirm !== undefined && _.isEmpty(passwordConfirm)) || 
        (displayName !== undefined && _.isEmpty(displayName))) 
    {
        return {
            ok: false,
            message: localized.text(Texts.errorMessages.fillAllFields)
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