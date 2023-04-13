import * as types from '../types'
import { noteService } from '../../services/note.service'
import { openNotification } from '../../helpers/notifications'



const noteActions = {
    setNotes: (user_id) => {
        return async (dispatch) => {
            return new Promise(async function (resolve, reject) {
                noteService
                .getUserNotes(user_id)
                .then((response) => {
                    if (response) {
                        dispatch({
                            type: types.SET_NOTES,
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
                noteService
                .createNote(payload)
                .then((resp) => {
                    if (resp) {
                        openNotification(
                            resp?.data?.response_type,
                            `Note ${resp?.data?.data?._id} Created Successfully`
                        )
                        dispatch({ type: types.ADD_NOTE, payload: resp })
                        resolve(resp)
                    } else {
                        reject()
                    }
                })
                .catch((error) => {
                    console.error('Error Creating Note:', error)
                    openNotification(
                        error?.data?.response_type,
                        `Error Creating Note ${error?.data?.data?._id}`
                    )
                    reject(error)
                })
            })
        }
    },

    delete: (noteID) => {
        return async (dispatch) => {
            return new Promise( async function (resolve, reject) {
                return noteService
                    .deleteNote(noteID)
                    .then((resp) => {
                        openNotification(
                            resp?.data?.response_type,
                            `Note ${noteID} Deleted Successfully`
                        )
                        dispatch({ type: types.DELETE_NOTE, noteID })
                        return resolve(resp)
                    })
                    .catch((error) => {
                        console.error('Error Deleting Note:', error)
                        openNotification(
                            error?.data?.response_type,
                            `Error Deleting Note ${noteID}`
                        )
                        reject(error)
                    })
            })
        }
    },

    update: (noteID, payload) => {
        return async (dispatch) => {
            return new Promise(async function (resolve, reject) {
                return noteService
                    .updateNote(noteID, payload)
                    .then((resp) => {
                        if (resp) {
                            openNotification(
                                resp?.data?.response_type,
                                `Note ${noteID} Updated Successfully`
                            )
                            dispatch({ type: types.UPDATE_NOTE, payload: resp?.data })
                            return resolve(resp?.data)
                        }
                        return reject()
                    })
                    .catch((error) => {
                        console.error('Error Updating Note:', error)
                        openNotification(
                            error?.data?.response_type,
                            `Error Updating Note ${noteID} `
                        )
                        reject(error)
                    })
            })
        }
    },
}

export default noteActions
