<template>
  <div id="panel">
    <div
      class="icon click close"
      title="Close"
      @click="unselect"
    ></div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  name: 'panel-block',
  methods: mapMutations(['unselect']),
}
</script>