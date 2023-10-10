<template>
  <div class="messaging-session">
    <h2 style="color: white; font-family: Verdana, sans-serif; font-weight: bold;">{{ contact.name }}</h2>

    <div class="messages">
      <div
        v-for="message in messages"
        :key="message.id"
        :class="messageClass(message)"
        class="message"
      >
        <div class="message-text">{{ message.text }}</div>
        <div class="message-timestamp">{{ formatTime(message.timestamp) }}</div>
      </div>
    </div>

    <div class="message-input">
      <input
        v-model="newMessage"
        @keyup.enter="sendMessage"
        placeholder="Type your message..."
      />
      <button @click="sendMessage">Send</button>
    </div>
  </div>
</template>

<script>
export default {
  props: ['contact'],
  data() {
    return {
      newMessage: '',
      messages: [
        // Sample messages, replace with your own data
        { id: 1, text: 'Hi there!', sender: 'contact', timestamp: new Date() },
        { id: 2, text: 'Hello!', sender: 'user', timestamp: new Date() },
      ],
    };
  },
  methods: {
    sendMessage() {
      if (this.newMessage.trim() === '') {
        return; // Don't send empty messages
      }
      const message = {
        id: Date.now(),
        text: this.newMessage.trim(),
        sender: 'user', // You can change this to 'contact' for received messages
        timestamp: new Date(),
      };
      this.messages.push(message);
      this.newMessage = '';
    },
    messageClass(message) {
      return {
        'user-message': message.sender === 'user',
        'contact-message': message.sender === 'contact',
      };
    },
    formatTime(timestamp) {
      const options = { hour: 'numeric', minute: 'numeric' };
      return new Date(timestamp).toLocaleTimeString(undefined, options);
    },
  },
};
</script>

<style scoped>
.messaging-session {
  padding: 15px;
  background-color: #525252;
  flex: 1;
}

.messages {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
  overflow-y: auto;
  /* Adjust the height to leave more space for the message input */
  height: 10%; /* Lowered from 70% */
}

.message-input {
  display: flex;
  gap: 10px;
  align-items: center;
  padding: 10px;
  border-top: 1px solid #ddd;
  background-color: 343434;
  /* Adjust the flex property to push it lower on the screen */
  flex: 1; /* Added this line */
}

.message {
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 10px;
}

.user-message {
  align-self: flex-end;
  background-color: #343434;
  color: white;
}

.contact-message {
  align-self: flex-start;
  background-color: #1fb9e0;
  color: white;
}

.message-text {
  word-wrap: break-word;
}

.message-timestamp {
  text-align: right;
  font-size: 12px;
  color: #777;
}

.message-input input {
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  
}

.message-input button {
  background-color: white;
  color: #343434;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.message-input button:hover {
  background-color: #343434;
}
</style>
