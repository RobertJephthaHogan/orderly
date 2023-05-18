import { openNotification } from '../../helpers/notifications'
import { checklistService } from '../../services/checklist.service'
import * as types from '../types'



const checklistActions = {
    setChecklists: (user_id) => {
        return async (dispatch) => {
            return new Promise(async function (resolve, reject) {
                checklistService
                .getUserChecklists(user_id)
                .then((response) => {
                    if (response) {
                        dispatch({
                            type: types.SET_CHECKLISTS,
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
                checklistService
                .createChecklist(payload)
                .then((resp) => {
                    if (resp) {
                        openNotification(
                            resp?.data?.response_type,
                            `Checklist ${resp?.data?.data?._id} Created Successfully`
                        )
                        dispatch({ type: types.ADD_CHECKLIST, payload: resp?.data })
                        resolve(resp)
                    } else {
                        reject()
                    }
                })
                .catch((error) => {
                    console.error('Error Creating Checklist:', error)
                    openNotification(
                        error?.data?.response_type,
                        `Error Creating Checklist ${error?.data?.data?._id}`
                    )
                    reject(error)
                })
            })
        }
    },

    delete: (checklistID) => {
        return async (dispatch) => {
            return new Promise(async function (resolve, reject) {
                return checklistService
                    .deleteChecklist(checklistID)
                    .then((resp) => {
                        openNotification(
                            resp?.data?.response_type,
                            `Checklist ${checklistID} Deleted Successfully`
                        )
                        dispatch({ type: types.DELETE_CHECKLIST, checklistID })
                        return resolve(resp)
                    })
                    .catch((error) => {
                        console.error('Error Deleting Checklist:', error)
                        openNotification(
                            error?.data?.response_type,
                            `Error Deleting Checklist ${checklistID}`
                        )
                        reject(error)
                    })
            })
        }
    },

    update: (checklistID, payload) => {
        return async (dispatch) => {
            return new Promise(async function (resolve, reject) {
                return checklistService
                    .updateChecklist(checklistID, payload)
                    .then((resp) => {
                        console.log('resp', resp)
                        if (resp) {
                            openNotification(
                                resp?.data?.response_type,
                                `Checklist ${checklistID} Updated Successfully`
                            )
                            dispatch({ type: types.UPDATE_CHECKLIST, payload: resp?.data })
                            resolve(resp)
                        }
                        return reject()
                    })
                    .catch((error) => {
                        console.error('Error Updating Checklist:', error)
                        openNotification(
                            error?.data?.response_type,
                            `Error Updating Checklist ${checklistID} `
                        )
                        reject(error)
                    })
            })
        }
    },

}


export default checklistActions
