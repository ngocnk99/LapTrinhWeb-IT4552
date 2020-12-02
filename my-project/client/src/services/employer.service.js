import axios from 'axios';

const API_URL = 'http://localhost:8082/api/employer/';

class EmployerService {
    login(employer) {
        return axios
            .post(API_URL + 'signin', {
                username: employer.username,
                password: employer.password
            })
            .then(response => {
                if (response.data.accessToken) {
                    localStorage.setItem('employer', JSON.stringify(response.data));
                }

                return response.data;
            });
    }

    logout() {
        localStorage.removeItem('employer');
    }

    register(employer) {
        return axios.post(API_URL + 'signup', {
            username: employer.username,
            email: employer.email,
            password: employer.password
        });
    }
}

export default new EmployerService();