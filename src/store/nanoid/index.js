import {nanoid} from 'nanoid';

export const getNanoId = () => {
    let nanoid_token = sessionStorage.getItem('nanoid_token')
    if(!nanoid_token){
        nanoid_token = nanoid()
        sessionStorage.setItem('nanoid_token',nanoid_token)
    }
    return nanoid_token
}
