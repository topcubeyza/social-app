import {Types} from "../Actions/users"
import { act } from "react-test-renderer";

const INITIAL_STATE = {
    items: []
}

export default function users(state = INITIAL_STATE, action) {
    switch (action.type) {
        case Types.GET_USERS_SUCCESS: {
            return {
                items: action.payload.items
            }
        }
        default: {
            return state;
        }  
    }
}