import initialState from '../initialState'
import * as types from '../types'


export const taskReducer = (state = initialState.tasks, action) => {
    switch (action.type) {

      case types.SET_TASKS: {
        return {...action.payload?.data}
      }

      case types.ADD_TASK: {
        let initial = {...state}
        let newTasks = [...initial.queryResult, action.payload?.data]
        initial.queryResult = newTasks
        return initial
      }

      case types.DELETE_TASK: {
        let initial = {...state}
        let filtered = state?.queryResult?.filter(
          (c) => String(c?.id) !== String(action.taskID)
        )
        initial.queryResult = filtered
        return initial
      }
          
      case types.UPDATE_TASK: {

        let initial = {...state}

        if (!action?.payload?.data?._id) {
          console.log('not@!')
          console.log('action.payload', action.payload)
            return state
        }

        const found = state?.queryResult?.find(
            (c) => c?.id === action?.payload?.data?._id
        )

        console.log('found', found)

        if (!found && action?.payload) {
          console.log('check not found')
            return [...state, action?.payload?.data]
        }

        console.log('state?.queryResult', state?.queryResult)

        const data =  state?.queryResult?.map((taskItem) => {
            if (taskItem?.id === action?.payload?.data?._id) {
              console.log('check')
                return action.payload.data
            }
            return taskItem
        })
        console.log('data', data)
        initial.queryResult = data
        return initial
      }

      default:
        return state
    }
  }
  
  export default taskReducer
  