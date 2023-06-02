import initialState from '../initialState'
import * as types from '../types'


export const intakeReducer = (state = initialState.intakes, action) => {
    switch (action.type) {

      case types.SET_INTAKES: {
        return {...action.payload?.data}
      }

      case types.ADD_INTAKE: {
        let initial = {...state}
        let newIntakes = [...initial?.queryResult, action.payload?.data]
        initial.queryResult = newIntakes
        return initial
      }

      case types.DELETE_INTAKE: {
        let initial = {...state}
        let filtered = state?.queryResult?.filter(
          (c) => String(c?.id) !== String(action.intakeID)
        )
        initial.queryResult = filtered
        return initial
      }
          
      case types.UPDATE_INTAKE: {

        let initial = {...state}

        console.log('initial', initial)

        if (!action?.payload?.data?._id) {
            return state
        }

        const found = state?.queryResult?.find(
            (c) => c?.id === action?.payload?.data?._id
        )

        if (!found && action?.payload) {
            let workingObj = {...state}
            let workingQR = [...workingObj?.queryResult] 
            workingQR = [...workingQR, action?.payload?.data]
            workingObj.queryResult = workingQR
            return workingObj
        }

        const data =  state?.queryResult?.map((intake) => {
            if (intake?.id === action?.payload?.data?._id) {
                return action.payload.data
            }
            return intake
        })

        initial.queryResult = data

        return initial
      }

      default:
        return state
    }
}
  
export default intakeReducer
  