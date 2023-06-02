import { getConfig } from '../config/Constants'
import axios from 'axios'


const config = getConfig()

const apiInstance = axios.create({
    baseURL: `${config.apiUrl}/`,
    headers: {
        'Content-Type': 'application/json',
    },
})


export const intakeService = {
    getIntakes,
    getUserIntakes,
    createIntake,
    getAnIntake,
    updateIntake, 
    deleteIntake
}


async function getIntakes() {
    return new Promise((resolve, reject) => {
        apiInstance
            .get(`/intake/get_all_intakes`)
            .then((response) => {
                const resp = response.data
                return resolve(resp)
            })
            .catch((error) => {
                console.error(error)
                reject(error)
            })
    })
}

async function getUserIntakes(userID) {
    return new Promise((resolve, reject) => {
        apiInstance
            .get(`/intake/user/${userID}`)
            .then((response) => {
                return resolve(response)
            })
            .catch((error) => {
                console.error(error)
                reject(error)
            })
    })
}

async function createIntake(intakeData) {
    return new Promise((resolve, reject) => {
        apiInstance
            .post(`/intake/new`, intakeData)
            .then((response) => {
                return resolve(response)
            })
            .catch((error) => {
                console.error(error)
                reject(error)
            })
    })
}

async function getAnIntake(intakeID) {
    return new Promise((resolve, reject) => {
        apiInstance
            .get(`/intake/${intakeID}`)
            .then((response) => {
                return resolve(response)
            })
            .catch((error) => {
                console.error(error)
                reject(error)
            })
    })
}

async function updateIntake(intakeID, newIntake) {
    return new Promise((resolve, reject) => {
        apiInstance
            .put(`/intake/${intakeID}`, newIntake)
            .then((response) => {
                return resolve(response)
            })
            .catch((error) => {
                console.error(error)
                reject(error)
            })
    })
}

async function deleteIntake(intakeID) {
    return new Promise((resolve, reject) => {
        apiInstance
            .delete(`/intake/${intakeID}`)
            .then((response) => {
                return resolve(response)
            })
            .catch((error) => {
                console.error(error)
                reject(error)
            })
    })
}

