import axios from 'axios';

const API_URL = 'http://localhost:8082/api/auth/';

class AuthService {
    login(user) {
        return axios
            .post(API_URL + 'signin', {
                username: user.username,
                password: user.password
            })
            .then(response => {
                if (response.data.accessToken) {
                    localStorage.setItem('user', JSON.stringify(response.data));
                }

                return response.data;
            });
    }

    logout() {
        localStorage.removeItem('user');
    }

    register(user) {
        return axios.post(API_URL + 'signup', {
            username: user.username,
            email: user.email,
            password: user.password
        });
    }

    getInfo(userName) {
        return axios.get(API_URL + `${userName}`);
    }

    editInfo(user) {
        return axios.post(API_URL + `${user.username}/edit`, user);
    }

    apply(username, postId) {
        return axios.post(API_URL + `${username}/apply`, { postId: postId });
    }

    watchNotifyApply(username, postId) {
        return axios.post(API_URL + `${username}/watchNotifyApply`, { postId: postId });
    }

    accesApply(username, postId) {
        return axios.post(API_URL + `${username}/accesApply`, { postId: postId });
    }

    refuseApply(username, postId) {
        return axios.post(API_URL + `${username}/refuseApply`, { postId: postId });
    }

}

export default new AuthService();