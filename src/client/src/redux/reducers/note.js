import initialState from '../initialState'
import * as types from '../types'


export const noteReducer = (state = initialState.notes, action) => {
    switch (action.type) {
      case types.SET_NOTES: {
        return {...action.payload}
      }

      case types.ADD_NOTE: {
        let initial = {...state}
        let newProjects = [...initial.queryResult, action.payload?.data]
        initial.queryResult = newProjects
        return initial
      }

      case types.DELETE_NOTE: {
        let initial = {...state}
        let filtered = state?.queryResult?.filter(
          (c) => String(c?.id) !== String(action.noteID)
        )
        initial.queryResult = filtered
        return initial
      }

      case types.UPDATE_NOTE: {
        if (!action?.payload?.data?.data?._id) {
            return state
        }

        const found = state?.queryResult?.find(
          (c) => c?.id === action?.payload?.data?.data?._id
      )

        if (!found && action?.payload) {
          return [...state, action?.payload?.data?.data]
      }

      return state?.queryResult?.map((note) => {
          if (note?.id === action?.payload?.data?.data?._id) {
              return action.payload.data?.data
          }

          return note
      })
      }

      default:
        return state
    }
  }
  
  export default noteReducer
  