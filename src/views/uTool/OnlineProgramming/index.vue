<template>
  <IFrame :frameSrc="url" />
</template>

<script setup lang="ts">
  import IFrame from '@/layouts/components/iframe/index.vue';
  import { ref } from 'vue';

  defineOptions({ name: 'Admin' });

  const url = ref<string>('https://jsfiddle.net/');
</script>

<style scoped></style>
