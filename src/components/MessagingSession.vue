<template>
  <div class="messaging-session">
    <h2>Chat with {{ contact.name }}</h2>
    <!-- Add your messaging interface here -->
  </div>
</template>

<script>
export default {
  props: ['contact'],
};
</script>

<style scoped>
.messaging-session {
  padding: 20px;
  background-color: #f5f5f5;
  flex: 1;
}
</style>
