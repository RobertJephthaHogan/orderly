import initialState from '../initialState'
import * as types from '../types'


export const agendaReducer = (state = initialState.agendas, action) => {
    switch (action.type) {

      case types.SET_AGENDAS: {
        return {...action.payload?.data}
      }

      case types.ADD_AGENDA: {
        let initial = {...state}
        let newAgendas = [...initial.queryResult, action.payload?.data]
        initial.queryResult = newAgendas
        return initial
      }

      case types.DELETE_AGENDA: {
        let initial = {...state}
        let filtered = state?.queryResult?.filter(
          (c) => String(c?.id) !== String(action.agendaID)
        )
        initial.queryResult = filtered
        return initial
      }
          
      case types.UPDATE_AGENDA: {

        let initial = {...state}

        if (!action?.payload?.data?._id) {
            return state
        }

        const found = state?.queryResult?.find(
            (c) => c?.id === action?.payload?.data?._id
        )

        if (!found && action?.payload) {
            return [...state, action?.payload?.data]
        }

        const data =  state?.queryResult?.map((agenda) => {
            if (agenda?.id === action?.payload?.data?._id) {
                return action.payload.data
            }
            return agenda
        })

        initial.queryResult = data

        return initial
      }

      default:
        return state
    }
  }
  
  export default agendaReducer
  