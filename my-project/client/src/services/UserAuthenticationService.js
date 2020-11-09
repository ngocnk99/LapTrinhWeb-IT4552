/* eslint-disable */
import Api from './Api'
import axios from 'axios'

class UserAuthenticationService {
    static register(credentials) {
        return Api().post('register', credentials)
    }

}

export default UserAuthenticationService;