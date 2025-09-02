<template>
  <Topbar />
  <RouterView />
</template>
<script setup lang="ts">
import Topbar from '@/components/topbar.vue';
</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

body {
  font-family: 'Roboto', sans-serif;
  margin: 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
}
</style>