import { getConfig } from '../config/Constants'
import axios from 'axios'


const config = getConfig()

const apiInstance = axios.create({
    baseURL: `${config.apiUrl}/`,
    headers: {
        'Content-Type': 'application/json',
    },
})


export const agendaService = {
    getAgendas,
    getUserAgendas,
    getAnAgenda,
    createAgenda,
    deleteAgenda,
    updateAgenda,
}


async function getAgendas() {
    return new Promise((resolve, reject) => {
        apiInstance
            .get(`/agenda/get_all_agendas`)
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

async function getUserAgendas(userID) {
    return new Promise((resolve, reject) => {
        apiInstance
            .get(`/agenda/user/${userID}`)
            .then((response) => {
                return resolve(response)
            })
            .catch((error) => {
                console.error(error)
                reject(error)
            })
    })
}

async function createAgenda(agendaData) {
    return new Promise((resolve, reject) => {
        apiInstance
            .post(`/agenda/create_agenda`, agendaData)
            .then((response) => {
                return resolve(response)
            })
            .catch((error) => {
                console.error(error)
                reject(error)
            })
    })
}

async function getAnAgenda(agendaID) {
    return new Promise((resolve, reject) => {
        apiInstance
            .get(`/agenda/${agendaID}`)
            .then((response) => {
                return resolve(response)
            })
            .catch((error) => {
                console.error(error)
                reject(error)
            })
    })
}

async function updateAgenda(agendaID, newAgendaObj) {
    return new Promise((resolve, reject) => {
        apiInstance
            .put(`/agenda/${agendaID}`, newAgendaObj)
            .then((response) => {
                return resolve(response)
            })
            .catch((error) => {
                console.error(error)
                reject(error)
            })
    })
}

async function deleteAgenda(agendaID) {
    return new Promise((resolve, reject) => {
        apiInstance
            .delete(`/agenda/${agendaID}`)
            .then((response) => {
                return resolve(response)
            })
            .catch((error) => {
                console.error(error)
                reject(error)
            })
    })
}

