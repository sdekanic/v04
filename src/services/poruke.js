	
import axios from 'axios'
const osnovniUrl = '/api/poruke'
//const osnovniUrl = 'http://localhost:3001/api/poruke'
 
const dohvatiSve = () => {   
    const promise = axios.get(osnovniUrl);
    return promise.then( response => response.data)
}
 
const stvori = noviObjekt => {
    return axios.post(osnovniUrl, noviObjekt)
}
 
const osvjezi = (id, noviObjekt) => {
    return axios.put(`${osnovniUrl}/${id}`, noviObjekt)
}

const brisi = id => {
    return axios.delete(`${osnovniUrl}/${id}`)
}
 
export default { dohvatiSve, stvori, osvjezi, brisi}
/* export default {
    dohvatiSve: dohvatiSve,
    stvori: stvori,
    osvjezi: osvjezi
} */