/* eslint-disable */

/* eslint-disable no-async-promise-executor */
import axios from 'axios'

const url = 'http://localhost:8082/post'


class PostService {
    // get posts
    static getPosts() {
        return new Promise(async(resolve, reject) => {
            try {
                const res = await axios.get(url)
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
    static getPostByEmployer(employerId) {
        return axios.post(url + `/employer`, { employerId: employerId })
    }

    static getOnePost(postId) {
            return axios.get(`${url}/${postId}`)
        }
        // Create post
    static insertPost(post) {
        return axios.post(`${url}/creat`, {
            post
        })
    }

    static index(search) {
        return axios.get(url, {
            params: search
        })
    }

    static editPost(post) {
        return axios.post(`${url}/${post._id}/edit`, post)
    }

    // delete post
    static deletePost(id) {
        return axios.get(`${url}/${id}/delete`)
    }
}

export default PostService