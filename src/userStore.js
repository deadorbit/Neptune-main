import { ref, provide, inject } from 'vue';

const user = ref({
  userName: '',
  profilePictureUrl: 'img/default_pfp.jpg',
});

const setUserProfilePicture = (profilePictureUrl) => {
  user.value.profilePictureUrl = profilePictureUrl;
};

const setUsername = (userName) => {
    user.value.userName = userName;

}

const provideUser = () => {
  provide('user', user);
};

const useUser = () => {
  const userObject = inject('user');
  if (!userObject) {
    throw new Error('user must be provided');
  }
  return userObject;
};

export { user, setUserProfilePicture, provideUser, useUser, setUsername };