import initialState from '../initialState'
import * as types from '../types'


export const projectReducer = (state = initialState.projects, action) => {
    switch (action.type) {
      case types.SET_PROJECTS: {
        return {...action.payload?.data}
      }

      case types.ADD_PROJECT: {
        let initial = {...state}
        let newProjects = [...initial.queryResult, action.payload?.data]
        initial.queryResult = newProjects
        return initial
      }

      case types.DELETE_PROJECT: {
        let initial = {...state}
        let filtered = state?.queryResult?.filter(
          (c) => String(c?.id) !== String(action.projectID)
        )
        initial.queryResult = filtered
        return initial
      }

      case types.UPDATE_PROJECT: {
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
  
  export default projectReducer
  