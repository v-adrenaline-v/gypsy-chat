<template>
  <div
    id="start"
    v-if="!connection"
  >
    <div id="content">
      <input
        type="text"
        placeholder="Nickname"
        :maxlength="this.$store.state.settings.max_username_length"
        v-model.trim="username"
      >
      <button @click="enter">Enter</button>
    </div>
    <div id="backdrop"></div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'start-block',
  data: () => ({
    username: ''
  }),
  computed: {
    ...mapState(['connection'])
  },
  methods: {
    enter() {
      this.$store.commit('setUsername', this.username);
      this.$store.dispatch('openConnection');
    }
  }
}
</script>