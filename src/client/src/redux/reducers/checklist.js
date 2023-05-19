import initialState from '../initialState'
import * as types from '../types'


export const checklistReducer = (state = initialState.checklists, action) => {
    switch (action.type) {

      case types.SET_CHECKLISTS: {
        return {...action.payload?.data}
      }

      case types.ADD_CHECKLIST: {
        let initial = {...state}
        let newChecklists = [...initial?.queryResult, action.payload?.data]
        initial.queryResult = newChecklists
        return initial
      }

      case types.DELETE_CHECKLIST: {
        let initial = {...state}
        let filtered = state?.queryResult?.filter(
          (c) => String(c?.id) !== String(action.checklistID)
        )
        initial.queryResult = filtered
        return initial
      }
          
      case types.UPDATE_CHECKLIST: {

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

        const data =  state?.queryResult?.map((checklist) => {
            if (checklist?.id === action?.payload?.data?._id) {
                return action.payload.data
            }
            return checklist
        })

        initial.queryResult = data

        return initial
      }

      default:
        return state
    }
  }
  
  export default checklistReducer
  