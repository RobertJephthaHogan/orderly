import { openNotification } from '../../helpers/notifications'
import { intakeService } from '../../services/intake.service'
import * as types from '../types'



const intakeActions = {
    setIntakes: (user_id) => {
        return async (dispatch) => {
            return new Promise(async function (resolve, reject) {
                intakeService
                .getUserIntakes(user_id)
                .then((response) => {
                    if (response) {
                        dispatch({
                            type: types.SET_INTAKES,
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
                intakeService
                .createIntake(payload)
                .then((resp) => {
                    if (resp) {
                        openNotification(
                            resp?.data?.response_type,
                            `Intake ${resp?.data?.data?._id} Created Successfully`
                        )
                        dispatch({ type: types.ADD_INTAKE, payload: resp?.data })
                        resolve(resp)
                    } else {
                        reject()
                    }
                })
                .catch((error) => {
                    console.error('Error Creating Intake:', error)
                    openNotification(
                        error?.data?.response_type,
                        `Error Creating Intake ${error?.data?.data?._id}`
                    )
                    reject(error)
                })
            })
        }
    },

    delete: (intakeID) => {
        return async (dispatch) => {
            return new Promise(async function (resolve, reject) {
                return intakeService
                    .deleteIntake(intakeID)
                    .then((resp) => {
                        openNotification(
                            resp?.data?.response_type,
                            `Intake ${intakeID} Deleted Successfully`
                        )
                        dispatch({ type: types.DELETE_INTAKE, intakeID })
                        return resolve(resp)
                    })
                    .catch((error) => {
                        console.error('Error Deleting Intake:', error)
                        openNotification(
                            error?.data?.response_type,
                            `Error Deleting Intake ${intakeID}`
                        )
                        reject(error)
                    })
            })
        }
    },

    update: (intakeID, payload) => {
        return async (dispatch) => {
            return new Promise(async function (resolve, reject) {
                return intakeService
                    .updateIntake(intakeID, payload)
                    .then((resp) => {
                        console.log('resp', resp)
                        if (resp) {
                            openNotification(
                                resp?.data?.response_type,
                                `Intake ${intakeID} Updated Successfully`
                            )
                            dispatch({ type: types.UPDATE_INTAKE, payload: resp?.data })
                            resolve(resp)
                        }
                        return reject()
                    })
                    .catch((error) => {
                        console.error('Error Updating Intake:', error)
                        openNotification(
                            error?.data?.response_type,
                            `Error Updating Intake ${intakeID} `
                        )
                        reject(error)
                    })
            })
        }
    },

}


export default intakeActions
