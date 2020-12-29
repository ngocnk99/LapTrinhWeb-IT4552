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
            password: employer.password,
            companyName: employer.companyName,
            webLink: employer.webLink,
            banner: employer.banner,
            avatar: employer.avatar
        });
    }

    getAll() {
        return axios.get(API_URL);
    }
    getInfo(employerName) {
        return axios.get(API_URL + `${employerName}`);
    }

    editInfo(employer) {
        return axios.post(API_URL + `${employer.username}/edit`, employer);
    }

    search(search) {
        return axios.get(API_URL + `search`, {
            params: {
                keyword: search
            }
        });
    }
}

export default new EmployerService();