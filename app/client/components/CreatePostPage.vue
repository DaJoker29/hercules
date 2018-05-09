<template>
  <main class="editor">
    <div 
      v-if="showCounter" 
      :class="{completed: isTargetCompleted}"
      class="wordCount">
      <span>
        {{ count }}/{{ getWordTarget }}
      </span>
    </div>
    <textarea 
      v-model="title"
      class="title" 
      rows="1" 
      placeholder="Title..."/>
    <textarea 
      v-model="brief"
      class="summary" 
      placeholder="Brief summary or Excerpt..."
      rows="2" />
    <textarea 
      v-model="content"
      class="content" 
      placeholder="Content..."
      rows="15" />
    <h2 
      v-if="preview" 
      class="preview-header">Live Preview</h2>
    <h2 
      v-if="preview" 
      class="preview-title">{{ title }}</h2>
    <div 
      v-if="preview" 
      class="preview-summary">{{ brief }}</div>
    <div 
      v-if="preview" 
      class="preview-content">{{ content }}</div>
    <div 
      class="buttons">
      <button 
        class="previewBtn" 
        @click="togglePreview">{{ preview ? 'Hide Preview' : ' Show Preview' }}</button>
      <button 
        class="counterBtn" 
        @click="toggleCounter">{{ showCounter ? 'Hide Counter' : ' Show Counter' }}</button>
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
      preview: false,
      showCounter: false
    };
  },
  computed: {
    ...mapGetters(['getWordTarget']),
    count() {
      return this.content
        .trim()
        .split(/\s+/)
        .filter(e => e.length > 0).length;
    },
    isTargetCompleted() {
      return this.getWordTarget <= this.count;
    }
  },
  methods: {
    togglePreview() {
      return (this.preview = !this.preview);
    },
    toggleCounter() {
      return (this.showCounter = !this.showCounter);
    }
  }
};
</script>

<style scoped>
.editor {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto;
  grid-gap: 1rem;
  align-items: center;
  grid-template-areas:
    'title title title title'
    'summary summary summary summary'
    'content content content content'
    'buttons buttons . counter'
    'preview-header preview-header . .'
    'preview-title preview-title preview-title preview-summary'
    'preview-content preview-content preview-content preview-content';
}

textarea {
  resize: none;
  overflow: hidden;
  box-shadow: 0 0 5px -1px inset var(--gray-d);
  background-color: var(--gray-l);
  padding: 0.5em 1em;
  border-radius: 2px;
  color: var(--black);
  font-weight: normal;
  font-size: 1rem;
  margin: 0;
}

.buttons {
  grid-area: buttons;
  padding: 1rem;
}

.title {
  grid-area: title;
  font-weight: bold;
}

.summary {
  grid-area: summary;
  font-family: var(--font-sans);
}

.content {
  grid-area: content;
}

.wordCount {
  grid-area: counter;
  text-align: right;
  transition: 0.2s;
  font-weight: bold;
}

.wordCount.completed {
  color: var(--green);
}
.preview-title,
.preview-summary,
.preview-content {
  font-family: var(--font-serif);
}

.preview-header {
  grid-area: preview-header;
}

.preview-title {
  grid-area: preview-title;
}
.preview-summary {
  grid-area: preview-summary;
  font-style: italic;
  border-left: 2px solid var(--gray-d);
  color: var(--gray-d);
  padding-left: 1rem;
  margin-left: 2rem;
}
.preview-content {
  grid-area: preview-content;
}
</style>
