//액션
const actions=(type)=>{
    return {
        PENDING : `${type}_PENDING`,
        SUCCESS : `${type}_SUCCESS`,
        FAILURE : `${type}_FAILURE`
    }
}


//리듀서
export const pending= ({
    type
}) => {
    const actionType=actions(type);
    return{
        [actionType.PENDING]: (state, action) => {
            return {
                ...state,
                pending: true,
                error: false
            };
        },
        [actionType.SUCCESS]: (state, action) => {
            return {
                ...state,
                pending: false,
                data:action.payload.data
            };
        },
        [actionType.FAILURE]: (state, action) => {
            return {
                ...state,
                pending: false,
                error: true
            }
        }
    }
};