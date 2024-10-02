import http from "./axioscontext"

const createContrat = (data) => {
    return http.post('/contrat/', data)
}

const getContrat = () => {
    return http.get('/contrat/')
}

const getContratbyId = (id) => {
    return http.get(`/contrat/${id}`)
}

const updateContrat = (id, data) => {
    return http.put(`/contrat/${id}`, data)
}

const deleteContrat = (id) => {
    return http.delete(`/contrat/${id}`)
}

export default{createContrat,getContrat,getContratbyId,updateContrat,deleteContrat}