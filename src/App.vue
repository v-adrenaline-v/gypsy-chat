<template>
  <div id="app">
    <Start />
    <ListRooms />
    <Chat />
  </div>
</template>

<script>
import Start from './components/Start';
import ListRooms from './components/ListRooms';
import Chat from './components/Chat';

export default {
  name: 'App',
  components: {
    Start,
    ListRooms,
    Chat
  },
  created() {
    this.$store.dispatch('getServerSettings');
    this.$store.dispatch('getListRooms');
  }
}
</script>
