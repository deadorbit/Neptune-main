<template>
    <div class="account-setup">
        <!-- Background image -->
        <div class="background-image"></div>

        <!-- Account setup form -->
        <div class="form-container">
            <form @submit.prevent="submitForm">
                <div class="form-group">
                    <label for="username">Enter your alias:</label>
                    <input type="text" id="username" v-model="username" :class="{ 'is-invalid': usernameError }" required />
                    <div v-if="usernameError" class="invalid-feedback">{{ usernameError }}</div>
                </div>
                <button type="submit" class="btn btn-primary" @click="submitForm">Continue</button>
            </form>
        </div>
    </div>
</template>
  
<script>
import { getAuth } from "firebase/auth";
import { getDatabase, ref as dbRef, child, get, set } from 'firebase/database';

export default {
    data() {
        return {
            usernameError: null,
            username: '', // Add a data property to store the username
        };
    },
    methods: {
        async submitForm() {
            // Reset the previous error message
            this.usernameError = null;

            // Check if the username is already taken
            const usernameExists = await this.checkUsernameExists(this.username);

            if (usernameExists) {
                this.usernameError = "Username already exists. Please choose a different one.";
            } else {
                // Save the username to the user's account information
                const user = getAuth().currentUser;
                if (user) {
                    try {
                        await this.saveUsernameToDatabase(user.uid, this.username);
                        this.$emit("continueToFinalAccountSetup");
                    } catch (error) {
                        console.error("Error saving username to database:", error);
                    }
                    // Update the user's data in the Realtime Database
                }
                // Continue to the Final Account Setup step and emit the event
            }
        },
        async checkUsernameExists(username) {
            try {
                // Firebase Realtime Database reference to 'usernames' node
                const db = getDatabase();
                const usernamesRef = dbRef(db, 'usernames');

                // Check if the username exists in the database
                const snapshot = await get(child(usernamesRef, username));
                return snapshot.exists();
            } catch (error) {
                console.error('Error checking username existence:', error);
                return false;
            }
        },
        async saveUsernameToDatabase(uid, username) {
            try {
                // Firebase Realtime Database reference to 'users' node
                const db = getDatabase();
                const userRef = dbRef(db, `users/${uid}`);

                // Update the user's data with the username
                await set(userRef, {
                    username: username,
                    // Add other user data as needed
                });

                // Also, update the 'usernames' node to record that this username is taken
                const usernamesRef = dbRef(db, 'usernames');
                await set(child(usernamesRef, username), uid);
            } catch (error) {
                console.error("Error saving username to database:", error);
                // Handle the error, e.g., display an error message to the user
            }
        },

        async getUsernameFromDatabase(uid) {
            try {
                const db = getDatabase();
                const userRef = dbRef(db, `users/${uid}`);
                const snapshot = await get(userRef);
                if (snapshot.exists()) {
                    return snapshot.val().username;
                }
                return null;
            } catch (error) {
                console.error("Error retrieving username from database:", error);
                return null;
            }
        },

        async continueToFinalAccountSetup() {
            // Emit an event to notify the parent component to navigate to the final setup page
            this.$emit("continueToFinalAccountSetup");
        },
    },
    async created() {
        // Retrieve the username from the user's account information
        const user = getAuth().currentUser;
        if (user) {
            const username = await this.getUsernameFromDatabase(user.uid);
            if (username) {
                this.username = username;
            }
        }
    },
};
</script>



  
<style scoped>
.account-setup {
    position: relative;
    height: 65vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

.background-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url('/public/img/login_register_background.jpg');
    background-size: cover;
    background-repeat: no-repeat;
    background-attachment: fixed;
    opacity: 0.8;
    z-index: -1;
}

.form-container {
    /* Remove or change the background-color property to make it transparent */
    /* background-color: rgba(255, 255, 255, 0.9); */
    padding: 20px;
    border-radius: 10px;
    text-align: center;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
}

form {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.form-group {
    margin: 15px 0;
    width: 100%;
}

label {
    font-weight: bold;
    font-size: 1.2rem;
    margin-bottom: 5px;
}

input[type="text"] {
    width: 100%;
    padding: 10px;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 5px;
}

.invalid-feedback {
    color: #f00;
    margin-top: 5px;
    font-size: 0.9rem;
}

.btn-primary {
    background-color: #007bff;
    color: #fff;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    font-size: 1rem;
    cursor: pointer;
}

.btn-primary:hover {
    background-color: #0056b3;
}
</style>
  
  