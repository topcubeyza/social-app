export const UpdateCauses = {
    // The update is not relevant to the field of interest
    irrelevant: "irrelevant",
    // The update is due to a change into fetching state
    fetching: "fetching",
    // The update is due to failure/error in request
    fail: "fail",
    // The update is due to successful completion of request
    success: "success"
}

/**
 * Returns if component updated because of the update in the relevant field of props.
 * If it did, then returns the cause for update.
 * Used for watching changes in redux state.
 * 
 * @param {{fetching, error}} prevProps - previous props before update
 * @param {{fetching, error}} currentProps  - current props after update
 * @param {String} dataFieldName - the name of the field of props whose value will be sent to isDataFieldSuccess
 * @param {Function} isDataFieldSuccess - a function that takes data field value as params and returns if the request was successfull
 */
export const getUpdateCause = (prevProps, currentProps, dataFieldName, isDataFieldSuccess) => {
    if (prevProps == currentProps) {
        return UpdateCauses.irrelevant
    }
    if (!prevProps.fetching && currentProps.fetching) {
        return UpdateCauses.fetching
    }
    if (prevProps.fetching && currentProps.error) {
        return UpdateCauses.fail
    }
    if (prevProps.fetching && isDataFieldSuccess(currentProps[dataFieldName])) {
        return UpdateCauses.success
    }

    return UpdateCauses.irrelevant;
}