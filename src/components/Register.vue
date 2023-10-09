<template>
  <div>
    <form @submit.prevent="register" @keyup.enter="register">
      <div class="header">
        <h4 style="color: white; font-size: 32px; font-weight: bold; font-family: 'Verdana', sans-serif;">Neptune</h4>
      </div>
      <label>Email:</label> <!-- Updated label to specify Email -->
      <input type="email" v-model="email" required> <!-- Use type="email" for email validation -->

      <label>Password:</label>
      <div class="password-field">
        <input :type="passwordVisibility ? 'text' : 'password'" v-model="password" required>
      </div>

      <label>Confirm Password:</label>
      <div class="password-field">
        <input :type="passwordVisibility ? 'text' : 'password'" v-model="confirmPassword" required>
      </div>

      <div v-if="loading" class="loading-indicator">
        Generating Key Pair...
      </div>  

      <div class="bottomForm">
        <p>Already have an account? <button @click="navigateToLogin" class="btn btn-link">Login</button></p>
        <button :disabled="loading" type="submit" class="btn btn-primary mt-3">Register</button>
      </div>
    </form>
  </div>
</template>

<script>
import { ref, inject } from 'vue';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { getDatabase, ref as dbRef, set } from 'firebase/database';
import DOMPurify from 'dompurify';
import forge from 'node-forge';

export default {
  setup() {
    const email = ref('');
    const password = ref('');
    const confirmPassword = ref('');
    const loading = ref(false);
    const passwordVisibility = ref(false);
    const handleNavigate = inject('handleNavigate');
    const handleLoggedIn = inject('handleLoggedIn');
    const auth = getAuth();

    const generateKeyPair = async () => {
      try {
        loading.value = true;
        console.log('Generating keys with the following data:');

        console.log('Email:', email.value);
        console.log('Password:', password.value);

        // Generate an RSA key pair
        const keys = forge.pki.rsa.generateKeyPair({ bits: 2048 });
        const publicKey = forge.pki.publicKeyToPem(keys.publicKey);
        const privateKey = forge.pki.privateKeyToPem(keys.privateKey);

        console.log('publicKey', publicKey);
        console.log('privateKey', privateKey);

        if (!publicKey || !privateKey) {
          console.error('Key pair generation returned empty keys.');
          throw new Error('Key pair generation returned empty keys.');
        }

        const userKeyPair = {
          publicKey, // Send the public key to the server
          privateKey,
        };
        loading.value = false;

        console.log('Generated key pair successfully:', userKeyPair);

        // Store the public key on the server
        await sendPublicKeyToServer(userKeyPair.publicKey);

        return userKeyPair;
      } catch (error) {
        loading.value = false;
        console.error('Key pair generation error:', error);
        throw error;
      }
    };

    const sendPublicKeyToServer = async (publicKey) => {
      try {
        // Make an HTTP request to send the public key to the server
        const response = await fetch('http://localhost:3000/storePublicKey', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId: 'replace-with-authenticated-user-id', publicKey }),
        });

        if (!response.ok) {
          console.error('Error storing public key on the server.');
        }
      } catch (error) {
        console.error('Network error:', error);
      }
    };

    const togglePasswordVisibility = () => {
      passwordVisibility.value = !passwordVisibility.value;
    };

    const register = async () => {
      try {
        if (password.value !== confirmPassword.value) {
          alert('Passwords do not match.');
          return;
        }
        if (!email.value || !password.value || !confirmPassword.value) {
          alert('Please fill in all the fields.');
          return;
        }
        // Generate an asymmetric key pair


        const userKeyPair = await generateKeyPair();

        const sanitizedEmail = DOMPurify.sanitize(email.value);
        const sanitizedPassword = DOMPurify.sanitize(password.value);

        const authUserCredential = await createUserWithEmailAndPassword(auth, sanitizedEmail, sanitizedPassword);
        const authUser = authUserCredential.user;

        const db = getDatabase();
        const userKeyRef = dbRef(db, `userKeys/${authUser.uid}`);
        await set(userKeyRef, {
          publicKey: userKeyPair.publicKey,
          // ...other user information...
        });

        alert('Registration successful!');
        handleLoggedIn(true);
      } catch (error) {
        console.error('Registration error:', error);
        alert(`Registration failed: ${error.message}`);
        // You can choose to clear the password fields or not based on your preference
        // username.value = '';
        // email.value = '';
        // password.value = '';
        // confirmPassword.value = '';
      }
    };


    const navigateToLogin = () => {
      // Trigger a page transition to the login page
      handleNavigate('login');
    };

    return {
      email,
      password,
      confirmPassword,
      loading,
      register,
      togglePasswordVisibility,
      navigateToLogin,
      
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
  user-select: none;
  /* Prevent text selection when clicking */
  color: #555;
  /* Adjust color as needed */
  font-size: 20px;
  /* Adjust font size as needed */
}

/* Style the eye icon as a button */
.toggle-password:hover {
  color: #333;
  /* Change color on hover */
}

form {
  max-width: 500px;
  margin: 185px auto;
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
  font-weight: bold;
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
  font-family: 'Roboto', sans-serif;
  /* Apply the "Roboto" font */
}

/* Loading indicator style */
.loading-indicator {
  text-align: center;
  color: #1874a5;
  /* Oceanic blue */
  margin-top: 10px;
}</style>
