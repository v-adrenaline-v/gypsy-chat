<template>
  <div
    id="chat"
    v-if="selected"
  >
    <div id="info">
      <div id="name"><b>{{ selected }}</b></div>
      <Panel />
    </div>
    <div id="history">
      <div
        id="message"
        v-for="message in history"
        :key="message.created"
      >
        <div id="name"><b>{{ message.sender.username }}</b></div>
        <div id="text">{{ message.text }}</div>
        <div id="time">{{ humanDate(message.created) }}</div>
      </div>
    </div>
    <div id="editor">
      <form @submit.prevent>
        <input
          type="text"
          placeholder="Message"
          tabindex="-1"
          :maxlength="settings.max_message_length"
          v-model.trim="text"
        >
        <button
          tabindex="-1"
          @click="sendMessage"
        >Send</button>
      </form>
    </div>
  </div>
  <div
    id="chat"
    v-else
  >
    <div id="newRoom">
      <form @submit.prevent>
        <input
          type="text"
          placeholder="Name"
          tabindex="-1"
          :maxlength="settings.max_room_title_length"
          v-model.trim="newRoom"
        >
        <button
          tabindex="-1"
          @click="select(newRoom)"
        >Create Room</button>
      </form>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState, mapMutations } from 'vuex';
import Panel from './Panel';

export default {
  name: 'chat',
  components: {
    Panel
  },
  data: () => ({
    newRoom: '',
    text: ''
  }),
  computed: {
    ...mapState(['settings', 'history', 'selected']),
    ...mapGetters(['isRoom', 'humanDate', 'getSelected', 'getNewMessage'])
  },
  watch: {
    getSelected() {
      if (this.selected && !this.newRoom)
        this.$store.dispatch('getRoomHistory');
      if (this.newRoom)
        this.clearHistory();
    },
    getNewMessage(event) {
      if (this.selected && event.room == this.selected)
        this.$store.dispatch('getRoomHistory');
      this.$store.dispatch('getListRooms');
    }
  },
  methods: {
    ...mapMutations(['select', 'clearHistory']),

    sendMessage() {
      this.$store.commit('send', JSON.stringify({
        room: this.selected,
        text: this.text
      }));
      this.text = '';
      this.newRoom = '';
    }
  }
}
</script>