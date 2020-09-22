<template>
  <div id="rooms">
    <div id="search">
      <div class="icon search"></div>
      <input
        type="text"
        placeholder="Search"
        tabindex="-1"
        v-model.trim="search"
      >
    </div>
    <div id="list">
      <div
        id="room"
        class="click"
        :class="{ active: selected == room.name }"
        v-for="room in sortedRooms"
        :key="room.name"
        @click="select(room.name)"
      >
        <div id="name">
          {{ room.name }}
        </div>
        <div id="text">
          <b>{{ room.last_message.sender.username }}:</b> {{ room.last_message.text }}
        </div>
        <div id="time">
          {{ humanDate(room.last_message.created) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapState } from 'vuex';

export default {
  name: 'list-rooms',
  data: () => ({
    search: ''
  }),
  computed: {
    ...mapState(['rooms', 'selected']),
    ...mapGetters(['humanDate', 'sortedRooms']),

    sortedRooms() {
      return this.rooms.filter((room) => room.name.search(this.search) !== -1);
    },
  },
  methods: {
    ...mapMutations(['select'])
  }
}
</script>