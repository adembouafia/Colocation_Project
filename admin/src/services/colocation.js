import http from "./axioscontext"

const createColocation = (data) => {
    return http.post('/colocation/', data)
}

const getColocation = () => {
    return http.get('/colocation/')
}

const getColocationbyId = (id) => {
    return http.get(`/colocation/${id}`)
}

const updateColocation = (id, data) => {
    return http.put(`/colocation/${id}`, data)
}

const deleteColocation = (id) => {
    return http.delete(`/colocation/${id}`)
}

export default{createColocation,getColocation,getColocationbyId,updateColocation,deleteColocation}