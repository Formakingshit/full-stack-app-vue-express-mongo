import axios from 'axios';

const url = "api/posts/";

class PostService {
  // Get 
  static getPosts() {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(url);
        const data = res.data;

        resolve(data.map(post => ({
          ...post, createdAt: new Date(post.createdAt)
        })))
      } catch (error) {
        reject(error);
      }
    })
  }

  // Post 
  static insertPost(text) {
    return axios.post(url, {
      text
    })
  }

  //Delete 
  static deletePost(id) {
    return axios.delete(`${url}${id}`)
  }
}

export default PostService;