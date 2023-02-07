import * as types from '../types'
import { noteService } from '../../services/note.service'



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
                        dispatch({ type: types.ADD_NOTE, payload: resp })
                        resolve(resp)
                    } else {
                        reject()
                    }
                })
                .catch((error) => reject(error))
            })
        }
    },

    delete: (noteID) => {
        return async (dispatch) => {
            return new Promise( async function (resolve, reject) {
                return noteService
                    .deleteNote(noteID)
                    .then((data) => {
                        dispatch({ type: types.DELETE_NOTE, noteID })
                        return resolve(data)
                    })
                    .catch((error) => reject(error))
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
                            dispatch({ type: types.UPDATE_NOTE, payload: resp?.data })
                            return resolve(resp?.data)
                        }
                        return reject()
                    })
                    .catch((error) => reject(error))
            })
        }
    },
}

export default noteActions
