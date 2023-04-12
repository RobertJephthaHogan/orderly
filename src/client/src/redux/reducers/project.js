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

        let initial = {...state}
        console.log(action?.payload)
        if (!action?.payload?.data?._id) {
            return state
        }

        const found = state?.queryResult?.find(
            (c) => c?._id === action?.payload?.data?._id
        )

        if (!found && action?.payload) {
            return [...state, action?.payload?.data]
        }

        const data =  state?.queryResult?.map((item) => {
            if (item?.id === action?.payload?.data?._id) {
                return action.payload.data
            }
            return item
        })

        initial.queryResult = data

        return initial
      }

      default:
        return state
    }
  }
  
  export default projectReducer
  