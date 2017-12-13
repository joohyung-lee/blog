//액션
const actions=(type)=>{
    return {
        PENDING : `${type}_PENDING`,
        SUCCESS : `${type}_SUCCESS`,
        FAILURE : `${type}_FAILURE`
    }
}
//pending 리듀서
//type:action_type,name:state_name,successResult:요청이 성공했을때 state설정
export const pending= ({
    type,
    name,
    successResult=(state)=>state
}) => {
    const actionType=actions(type);
    return{
        [actionType.PENDING]: (state, action) => {
            return state.setIn([...name,'pending'],true)
                        .setIn([...name,'state'],'waiting')
                        .setIn([...name,'error'],-1)
        },
        [actionType.SUCCESS]: (state, action) => {
            return successResult(state,action).setIn([...name,'pending'],false)
                                              .setIn([...name,'state'],'success')
           
        },
        [actionType.FAILURE]: (state, action) => {
            
            return state.setIn([...name,'pending'],false)
                        .setIn([...name,'error'],action.payload.error)
                        .setIn([...name,'state'],'fail')
        }
    }
};