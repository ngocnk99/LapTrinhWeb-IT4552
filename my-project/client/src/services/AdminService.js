import axios from 'axios';

const API_URL = 'http://localhost:8082/api/admin/';

class AdminService {
    login(username, password) {
        return axios
            .post(API_URL + 'signin', {
                username: username,
                password: password
            })
            .then(response => {
                if (response.data.accessToken) {
                    sessionStorage.setItem('admin', JSON.stringify(response.data));
                }
                return response.data;
            });
    }
    getPosts() {
        return new Promise(async(resolve, reject) => {
            try {
                const res = await axios.get(API_URL + 'post')
                const data = res.data

                resolve(
                    data.map((post) => ({
                        ...post,
                        createdAt: new Date(post.createdAt)
                    }))
                )
            } catch (err) {
                reject(err)
            }
        })
    }
}

export default new AdminService();