/* eslint-disable */
import Api from './Api'
import axios from 'axios'

class UserAuthenticationService {
    static register(credentials) {
        return Api().post('register', credentials)
    }

    static login(credentials) {
        return Api().post('login', credentials)
    }
}

export default UserAuthenticationService;