import { getConfig } from '../config/Constants'
import axios from 'axios'


const config = getConfig()

const apiInstance = axios.create({
    baseURL: `${config.apiUrl}/`,
    headers: {
        'Content-Type': 'application/json',
    },
})


export const checklistService = {
    getChecklists,
    getUserChecklists,
    getAChecklist,
    createChecklist,
    updateChecklist,
    deleteChecklist,
}


async function getChecklists() {
    return new Promise((resolve, reject) => {
        apiInstance
            .get(`/checklist/get_all_checklists`)
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

async function getUserChecklists(userID) {
    return new Promise((resolve, reject) => {
        apiInstance
            .get(`/checklist/user/${userID}`)
            .then((response) => {
                return resolve(response)
            })
            .catch((error) => {
                console.error(error)
                reject(error)
            })
    })
}

async function createChecklist(checklistData) {
    return new Promise((resolve, reject) => {
        apiInstance
            .post(`/checklist/create_checklist`, checklistData)
            .then((response) => {
                return resolve(response)
            })
            .catch((error) => {
                console.error(error)
                reject(error)
            })
    })
}

async function getAChecklist(checklistID) {
    return new Promise((resolve, reject) => {
        apiInstance
            .get(`/checklist/${checklistID}`)
            .then((response) => {
                return resolve(response)
            })
            .catch((error) => {
                console.error(error)
                reject(error)
            })
    })
}

async function updateChecklist(checklistID, newChecklistObj) {
    return new Promise((resolve, reject) => {
        apiInstance
            .put(`/checklist/${checklistID}`, newChecklistObj)
            .then((response) => {
                return resolve(response)
            })
            .catch((error) => {
                console.error(error)
                reject(error)
            })
    })
}

async function deleteChecklist(checklistID) {
    return new Promise((resolve, reject) => {
        apiInstance
            .delete(`/checklist/${checklistID}`)
            .then((response) => {
                return resolve(response)
            })
            .catch((error) => {
                console.error(error)
                reject(error)
            })
    })
}

