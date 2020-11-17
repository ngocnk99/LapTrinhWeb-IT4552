/* eslint-disable */

/* eslint-disable no-async-promise-executor */
import axios from 'axios'

const url = 'http://localhost:5000/post'


class PostService {
    // get posts
    static getPosts() {
            return new Promise(async(resolve, reject) => {
                try {
                    const res = await axios.get(url)
                    const data = res.data
                    console.log(data)
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
        // Create post
    static insertPost(song) {
        return axios.post(url, {
            song
        })
    }

    // delete post
    static deletePost(id) {
        return axios.get(`${url}/${id}/delete`)
    }
}

export default PostService