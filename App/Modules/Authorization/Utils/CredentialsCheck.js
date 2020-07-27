import _ from "lodash";
import val from "validate.js"
import I18n from "react-native-i18n"
import { TextNames } from "../../../I18n/languages/Names";


const emailConstraint = {
    from: {
        email: true
    }
};

export default ({email, password, passwordConfirm}) => {
    
    if (_.isEmpty(email) || _.isEmpty(password) || (passwordConfirm !== undefined && _.isEmpty(passwordConfirm))) {
        return {
            ok: false,
            message: I18n.t(TextNames.errorMessages.fillAllFields)
        };
    }
    if (val({ from: email }, emailConstraint)) {
        return {
            ok: false,
            message: I18n.t(TextNames.errorMessages.enterValidEmail)
        };
    }
    if (passwordConfirm !== undefined && password !== passwordConfirm) {
        return {
            ok: false,
            message: I18n.t(TextNames.errorMessages.passwordsDontMatch)
        };
    }

    return {
        ok: true
    };
}