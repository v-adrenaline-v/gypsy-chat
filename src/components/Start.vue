<template>
  <div
    id="start"
    v-if="!connection"
  >
    <div id="content">
      <form>
        <input
          type="text"
          placeholder="Nickname"
          tabindex="-1"
          :maxlength="this.$store.state.settings.max_username_length"
          v-model.trim="username"
        >
        <button
          tabindex="-1"
          @click="enter"
        >Enter</button>
      </form>
    </div>
    <div id="backdrop"></div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';

export default {
  name: 'start-block',
  data: () => ({
    username: ''
  }),
  computed: {
    ...mapState(['connection']),
    ...mapGetters(['getConnectionStatus'])
  },
  watch: {
    getConnectionStatus(event) {
      if (event.type == 'close' || event.type == 'error')
        this.$store.dispatch('openConnection');
    }
  },
  methods: {
    enter() {
      this.$store.commit('setUsername', this.username);
      this.$store.dispatch('openConnection');
      this.username = '';
    }
  }
}
</script>