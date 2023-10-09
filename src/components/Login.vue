<template>
  <div>
    <!-- Wrap the form fields in a form element -->
    <form @submit.prevent="login">
      <div class="header">
        <h4 style="color: white; font-size: 32px; font-weight: bold; font-family: 'Verdana', sans-serif;">Neptune</h4>
      </div>
      
      <label>Email:</label>
      <!-- Apply DOMPurify to sanitize the email input -->
      <input type="email" v-model="email" required>

      <label>Password:</label>
      <!-- Apply DOMPurify to sanitize the password input -->
      <input type="password" v-model="password" required>

      <div class="bottomForm">
        <p v-if="!loggedIn">Don't have an account? <button @click="navigateToRegister" class="btn btn-link">Register</button></p>
        <!-- Mark the "Login" button as type="submit" -->
        <button type="submit" class="btn btn-primary mt-3">Login</button>
      </div>
    </form>
  </div>
</template>

<script>
import { ref, inject } from 'vue';
import { signInWithEmailAndPassword, getAuth } from 'firebase/auth';
import DOMPurify from 'dompurify'; // Import DOMPurify

export default {
  setup() {
    const email = ref('');
    const password = ref('');
    const auth = getAuth();
    const handleNavigate = inject('handleNavigate');
    const handleLoggedIn = inject('handleLoggedIn'); // Inject the handleNavigate method

    const login = async () => {
      try {
        // Sanitize email and password inputs using DOMPurify
        const sanitizedEmail = DOMPurify.sanitize(email.value);
        const sanitizedPassword = DOMPurify.sanitize(password.value);

        await signInWithEmailAndPassword(auth, sanitizedEmail, sanitizedPassword);
        alert('Login successful!');
        // Redirect to the home page after successful login
        handleLoggedIn(true);
        email.value = '';
        password.value = '';
      } catch (error) {
        alert(`Login failed: ${error.message}`);
      }
    };

    const navigateToRegister = () => {
      // Trigger a page transition to the register page
      handleNavigate('register');
    };

    return {
      email,
      password,
      login,
      navigateToRegister,
    };
  },
};
</script>


<style>
/* Add styling for the clickable eye icon */
.toggle-password {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  user-select: none; /* Prevent text selection when clicking */
  color: #555; /* Adjust color as needed */
  font-size: 20px; /* Adjust font size as needed */
}

/* Style the eye icon as a button */
.toggle-password:hover {
  color: #333; /* Change color on hover */
}
form {
  max-width: 500px;
  margin: 125px auto;
  background: #25222B;
  text-align: left;
  padding: 40px;
  border-radius: 10px;
}

label {
  color: white;
  display: inline-block;
  margin: 25px 0 15px;
  font-size: 1em;
  text-transform: capitalize;
  letter-spacing: 1px;
  font-weight: lighter;
}

input,
select {
  display: block;
  padding: 10px 6px;
  width: 100%;
  box-sizing: border-box;
  border: none;
  border-bottom: 1px solid #ddd;
  color: #343434;
}

.passwordreset p {
  margin: 0px !important;
  padding: 5px !important;
  padding-left: 0px !important;
  color: rgb(172, 16, 16);
  margin-left: 10px;
  font-size: 0.8em;
  font-weight: bold;
}

.bottomForm {
  display: flex;
  justify-content: space-between;
}

.bottomForm p {
  padding-top: 5%;
  margin: 0px;
  color: rgb(253, 244, 243);
  font-size: 1em;
  font-weight: bold;
}

.header {
  display: flex;
  justify-content: center;
  font-family: 'Roboto', sans-serif; /* Apply the "Roboto" font */
}

/* Loading indicator style */
.loading-indicator {
  text-align: center;
  color: #1874a5;
  /* Oceanic blue */
  margin-top: 10px;
}
</style>