import initialState from '../initialState'
import * as types from '../types'


export const eventReducer = (state = initialState.events, action) => {
    switch (action.type) {

      case types.SET_EVENTS: {
        return {...action.payload?.data}
      }

      case types.ADD_EVENT: {
        let initial = {...state}
        let newEvents = [...initial.queryResult, action.payload?.data]
        initial.queryResult = newEvents
        return initial
      }

      case types.DELETE_EVENT: {
        let initial = {...state}
        let filtered = state?.queryResult?.filter(
          (c) => String(c?.id) !== String(action.eventID)
        )
        initial.queryResult = filtered
        return initial
      }

      case types.UPDATE_EVENT: {
        if (!action?.payload?.data?.data?._id) {
            return state
        }

        const found = state?.queryResult?.find(
            (c) => c?.id === action?.payload?.data?.data?._id
        )

        if (!found && action?.payload) {
            return [...state, action?.payload?.data?.data]
        }

        return state?.queryResult?.map((taskItem) => {
            if (taskItem?.id === action?.payload?.data?.data?._id) {
                return action.payload.data?.data
            }
            return taskItem
        })
      }

      default:
        return state
    }
  }
  
  export default eventReducer
  