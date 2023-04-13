import * as types from '../types'
import { eventService } from '../../services/event.service'
import { openNotification } from '../../helpers/notifications'



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
                        openNotification(
                            resp?.data?.response_type,
                            `Event ${resp?.data?.data?._id} Created Successfully`
                        )
                        dispatch({ type: types.ADD_EVENT, payload: resp?.data })
                        resolve(resp)
                    } else {
                        reject()
                    }
                })
                .catch((error) => {
                    console.error('Error Creating Event:', error)
                    openNotification(
                        error?.data?.response_type,
                        `Error Creating Event ${error?.data?.data?._id}`
                    )
                    reject(error)
                })
            })
        }
    },

    delete: (eventID) => {
        return async (dispatch) => {
            return new Promise(async function (resolve, reject) {
                return eventService
                    .deleteEvent(eventID)
                    .then((resp) => {
                        openNotification(
                            resp?.data?.response_type,
                            `Task ${eventID} Deleted Successfully`
                        )
                        dispatch({ type: types.DELETE_EVENT, eventID })
                        return resolve(resp)
                    })
                    .catch((error) => {
                        console.error('Error Deleting Event:', error)
                        openNotification(
                            error?.data?.response_type,
                            `Error Deleting Event ${eventID}`
                        )
                        reject(error)
                    })
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
                            openNotification(
                                resp?.data?.response_type,
                                `Event ${eventID} Updated Successfully`
                            )
                            dispatch({ type: types.UPDATE_EVENT, payload: resp?.data })
                            return resolve(resp?.data)
                        }
                        return reject()
                    })
                    .catch((error) => {
                        console.error('Error Updating Event:', error)
                        openNotification(
                            error?.data?.response_type,
                            `Error Updating Event ${eventID} `
                        )
                        reject(error)
                    })
            })
        }
    },

}


export default eventActions
