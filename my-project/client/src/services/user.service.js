import axios from 'axios';
import authHeader from './auth-header';
import employerHeader from './employer-header';

const API_URL = 'http://localhost:8082/api/test/';

class UserService {
    getPublicContent() {
        return axios.get(API_URL + 'all');
    }

    getUserBoard() {
        return axios.get(API_URL + 'user', { headers: authHeader() });
    }

    getEmployerBoard() {
        return axios.get(API_URL + 'mod', { headers: employerHeader() });
    }

    getAdminBoard() {
        return axios.get(API_URL + 'admin', { headers: authHeader() });
    }
}

export default new UserService();