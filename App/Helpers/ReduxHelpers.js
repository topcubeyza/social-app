export const UpdateCauses = {
    irrelevant: "irrelevant",
    fetching: "fetching",
    fail: "fail",
    success: "success"
}

// returns if component updated because redux props updated
// if it did, then returns the cause for update
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