import http from "./axioscontext"

const createAnnonce = (data) => {
    return http.post('/annonce/', data)
}

const getAnnonce = () => {
    return http.get('/annonce/')
}

const getAnnoncebyId = (id) => {
    return http.get(`/annonce/${id}`)
}

const updateAnnonce = (id, data) => {
    return http.put(`/annonce/${id}`, data)
}

const deleteAnnonce = (id) => {
    return http.delete(`/annonce/${id}`)
}

export default{createAnnonce,getAnnonce,getAnnoncebyId,updateAnnonce,deleteAnnonce}