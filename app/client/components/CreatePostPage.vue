<template>
  <main>
    <button @click="togglePreview">Preview</button>
    <span>{{ count }}/{{ getWordTarget }}</span>
    <div 
      v-if="!preview" 
      class="input-container">
      <input 
        v-model="title" 
        type="text" 
        placeholder="Title...">
      <textarea 
        v-model="content" 
        placeholder="Title..."
        rows="7" />
      <textarea 
        v-model="brief" 
        placeholder="Brief summary or Excerpt..."
        rows="2" />
    </div>
    <div v-else>
      <h2 class="title">{{ title }}</h2>
      <div class="brief">{{ brief }}</div>
      <div class="content">{{ content }}</div>
    </div>
  </main>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      title: 'Enter Title Here',
      content: '',
      brief: '',
      preview: false
    };
  },
  computed: {
    ...mapGetters(['getWordTarget']),
    count() {
      return this.content
        .trim()
        .split(/\s+/)
        .filter(e => e.length > 0).length;
    }
  },
  methods: {
    togglePreview() {
      return (this.preview = !this.preview);
    }
  }
};
</script>

<style scoped>
.input-container {
  display: flex;
  flex-flow: column nowrap;
  justify-content: stretch;
}

input,
textarea {
  font-family: var(--font-serif);
}

.title,
.brief,
.content {
  font-size: 2em;
}

.title {
  font-family: var(--font-serif);
}

.brief {
  margin-left: 2rem;
  color: var(--gray-d);
  border-left: 2px solid var(--gray-d);
  padding: 1rem;
}

.content {
  margin: 1rem;
}
</style>
