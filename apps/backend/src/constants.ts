

const API = {
  HOST_URL: process.env.HOST_URL || `http://localhost:4200`,
  BASE_URL: process.env.BASE_URL || `http://localhost:3000`,
  PREFIX: 'api',
  VERSION: '1.0',
  NAME: 'Penny Task',

  USER: {
    TAG: 'users',
    PATH: 'users',

    MESSAGES: {
      PROFILE_UPDATE_SUCCESS: 'Profile updated successfully',
      ALL_USERS: 'Return all users',
      ALL_PUBLIC_PROFILES: 'Return all public profiles',
    },

    PUBLIC_USERS: {
      PATH: '/',
      SUMMARY: 'Get all public profiles'
    },

    UPDATE_PROFILE: {
      PATH: '/profile',
      SUMMARY: 'Update user profile'
    },
  },

  AUTH: {
    TAG: 'auth',
    PATH: 'auth',

    MESSAGES: {
      REGISTER_SUCCESS: 'User successfully created',
      LOGIN_SUCCESS: 'User successfully logged in',
      BAD_REQUEST: 'Bad Request',

      ALREADY_REGISTER: 'User already register',
      INVALID_CREDENTIALS: 'Invalid credentials',
      UNAUTHORIZED: 'Unauthorized',
      USER_NOT_FOUND: 'User not found',

      RESET_EMAIL_SENT: 'Password reset email sent',
      PASSWORD_RESET: 'Password has been reset',
      INVALID_OR_EXPIRED_TOKEN: 'Reset token is invalid or has expired',

      LOGGED_IN_PROFILE: 'Logged In User Profile',
    },

    REGISTER: {
      PATH: 'register',
      SUMMARY: 'User Registration',
    },

    LOGIN: {
      PATH: 'login',
      SUMMARY: 'User Login',
    },

    FORGET: {
      PATH: 'forgot-password',
      SUMMARY: 'Forgot Password',
    },

    RESET_PASSWORD: {
      PATH: 'reset-password',
      SUMMARY: 'Reset Password',
      PARAMS: {
        TOKEN: 'token'
      },
    },

    PROFILE: {
      PATH: 'profile',
      SUMMARY: 'Get User Profile',
    },
  }
}

const AUTH = {
  EXPIRES_IN: '8h',
  TOKEN_TYPE: 'hex',
  TOKEN_BYTES: 32,
  TOKEN_EXPIRES_IN: 360000, // 1hour
}


export { API, AUTH };