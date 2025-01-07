import { Injectable } from '@angular/core';
import { Auth, signInWithPopup, GoogleAuthProvider } from '@angular/fire/auth';

@Injectable({
    providedIn: 'root'
})
export class FirebaseSSOService {
    constructor(private auth: Auth) { }

    googleSignIn() {
        const provider = new GoogleAuthProvider();
        return signInWithPopup(this.auth, provider);
    }

    getCurrentUser() {
        return this.auth.currentUser;
    }

    logout() {
        return this.auth.signOut();
    }
}
