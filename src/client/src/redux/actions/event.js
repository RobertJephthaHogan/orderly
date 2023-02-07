import * as types from '../types'
import { eventService } from '../../services/event.service'



const eventActions = {
    setEvents: (user_id) => {
        return async (dispatch) => {
            return new Promise(async function (resolve, reject) {
                eventService
                .getUserEvents(user_id)
                .then((response) => {
                    if (response) {
                        dispatch({
                            type: types.SET_EVENTS,
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
                eventService
                .createEvent(payload)
                .then((resp) => {
                    if (resp) {
                        dispatch({ type: types.ADD_EVENT, payload: resp?.data })
                        resolve(resp)
                    } else {
                        reject()
                    }
                })
                .catch((error) => reject(error))
            })
        }
    },

    delete: (eventID) => {
        return async (dispatch) => {
            return new Promise(async function (resolve, reject) {
                return eventService
                    .deleteEvent(eventID)
                    .then((data) => {
                        dispatch({ type: types.DELETE_EVENT, eventID })
                        return resolve(data)
                    })
                    .catch((error) => reject(error))
            })
        }
    },

    update: (eventID, payload) => {
        return async (dispatch) => {
            return new Promise(async function (resolve, reject) {
                return eventService
                    .updateEvent(eventID, payload)
                    .then((resp) => {
                        if (resp) {
                            dispatch({ type: types.UPDATE_EVENT, payload: resp?.data })
                            return resolve(resp?.data)
                        }
                        return reject()
                    })
                    .catch((error) => reject(error))
            })
        }
    },

}


export default eventActions
