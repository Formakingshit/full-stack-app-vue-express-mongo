<template>
  <div>
    <h1>Latest Posts</h1>
    <div>
      <label for="create-post">Input something</label>
      <input type="text" id="create-post" v-model="text">
      <button @click="createPost">Post!</button>
    </div>
    <hr>
    <p v-if="error">Waiting for response...</p>
    <div>
      <div v-for="(post, index) in posts" :key="index" @dblclick="deletePost(post._id)">
        <p>{{post.text}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import PostService from "@/PostService";

export default {
  name: "Post",
  data() {
    return {
      posts: [],
      error: "",
      text: ""
    };
  },
  async created() {
    try {
      this.posts = await PostService.getPosts();
    } catch (error) {
      this.error = error.message;
    }
  },
  methods: {
    async createPost() {
      await PostService.insertPost(this.text);
      this.posts = await PostService.getPosts();
    },
    async deletePost(id) {
      await PostService.deletePost(id);
      this.posts = await PostService.getPosts();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
