<template>
  <div class="postList">
    <Post 
      v-for="post in posts" 
      :post="post" 
      :key="post._id"/>
  </div>
</template>

<script>
import Post from './Post';

export default {
  components: {
    Post
  },
  props: {
    posts: {
      type: Array,
      required: true
    }
  }
};
</script>
