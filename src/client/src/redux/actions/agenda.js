import { openNotification } from '../../helpers/notifications'
import { agendaService } from '../../services/agenda.service'
import * as types from '../types'



const agendaActions = {
    setAgendas: (user_id) => {
        return async (dispatch) => {
            return new Promise(async function (resolve, reject) {
                agendaService
                .getUserAgendas(user_id)
                .then((response) => {
                    if (response) {
                        dispatch({
                            type: types.SET_AGENDAS,
                            payload: response?.data,
                        })
                        resolve(response)
                    } else {
                        reject()
                    }
                }).catch((error) => reject(error))
            })
        }
    },

    add: (payload) => {
        return async (dispatch) => {
            return new Promise(async function (resolve, reject) {
                agendaService
                .createAgenda(payload)
                .then((resp) => {
                    if (resp) {
                        openNotification(
                            resp?.data?.response_type,
                            `Agenda ${resp?.data?.data?._id} Created Successfully`
                        )
                        dispatch({ type: types.ADD_AGENDA, payload: resp?.data })
                        resolve(resp)
                    } else {
                        reject()
                    }
                })
                .catch((error) => {
                    console.error('Error Creating Agenda:', error)
                    openNotification(
                        error?.data?.response_type,
                        `Error Creating Agenda ${error?.data?.data?._id}`
                    )
                    reject(error)
                })
            })
        }
    },

    delete: (agendaID) => {
        return async (dispatch) => {
            return new Promise(async function (resolve, reject) {
                return agendaService
                    .deleteAgenda(agendaID)
                    .then((resp) => {
                        openNotification(
                            resp?.data?.response_type,
                            `Agenda ${agendaID} Deleted Successfully`
                        )
                        dispatch({ type: types.DELETE_AGENDA, agendaID })
                        return resolve(resp)
                    })
                    .catch((error) => {
                        console.error('Error Deleting Agenda:', error)
                        openNotification(
                            error?.data?.response_type,
                            `Error Deleting Agenda ${agendaID}`
                        )
                        reject(error)
                    })
            })
        }
    },

    update: (agendaID, payload) => {
        return async (dispatch) => {
            return new Promise(async function (resolve, reject) {
                return agendaService
                    .updateAgenda(agendaID, payload)
                    .then((resp) => {
                        if (resp) {
                            openNotification(
                                resp?.data?.response_type,
                                `Agenda ${agendaID} Updated Successfully`
                            )
                            dispatch({ type: types.UPDATE_AGENDA, payload: resp?.data })
                            resolve(resp)
                        }
                        return reject()
                    })
                    .catch((error) => {
                        console.error('Error Updating Agenda:', error)
                        openNotification(
                            error?.data?.response_type,
                            `Error Updating Agenda ${agendaID} `
                        )
                        reject(error)
                    })
            })
        }
    },

}


export default agendaActions
