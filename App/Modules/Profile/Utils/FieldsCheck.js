import _ from "lodash";
import val from "validate.js"

import { Texts, localized } from "../../../Localization";

/**
 * Checks each of the given credential fields.
 * Returns {ok: true} if fields are valid,
 *  {ok: false, message: error} if fields are not valid
 */
export default ({ password, passwordConfirm, displayName }) => {

    // If any of the fields are defined/given but are empty strings, it is not valid
    if (
        (password !== undefined && _.isEmpty(password)) ||
        (passwordConfirm !== undefined && _.isEmpty(passwordConfirm)) ||
        (displayName !== undefined && _.isEmpty(displayName))) {
        return {
            ok: false,
            message: localized.text(Texts.errorMessages.fillAllFields)
        };
    }

    // If passwordConfirm is present but does not match password, it is not valid
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