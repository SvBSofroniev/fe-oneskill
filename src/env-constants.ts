const JWT_TOKEN = 'JWT_TOKEN';
const USER = 'USER';
const ROLES = 'ROLES';
const ROLE_LECTOR = 'lector';
const ROLE_USER = 'user';
const ROLE_DEV = 'dev';
const ROLE_ADMIN = 'admin';

const environment = {
    production: false,
    firebase: {
        apiKey: "AIzaSyDFGScto8kE-HAxK2gYCD4qL6yl0MLq58c",
        authDomain: "oneskill-1f9f5.firebaseapp.com",
        projectId: "oneskill-1f9f5",
        storageBucket: "oneskill-1f9f5.firebasestorage.app",
        messagingSenderId: "600181751476",
        appId: "1:600181751476:web:941d24935dfc0742f8e1e1"
    }
};


export default {
    JWT_TOKEN, USER, ROLES, ROLE_DEV, ROLE_LECTOR, ROLE_USER, ROLE_ADMIN, environment
}


