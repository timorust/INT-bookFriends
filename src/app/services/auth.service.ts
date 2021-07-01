import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable, of} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import firebase from 'firebase/app';
import 'firebase/auth';
import {UserInterface} from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: Observable<UserInterface | undefined | null> | null;

  constructor(private afAuth: AngularFireAuth,
              private afs: AngularFirestore) {

    this.user = this.afAuth.authState.pipe(
      switchMap( auth => {
        if (auth) {
          return this.afs.doc<any>(`users/${auth.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );

  }

  createUserDoc(auth: any) {
    return this.afs.doc(`users/${auth.uid}`).set({
      email: auth.email,
      displayName: auth.displayName,
      photoURL: auth.photoURL,
      uid: auth.uid
    });
  }

  signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.afAuth.signInWithPopup(provider);
  }

  logout() {
    return this.afAuth.signOut();
  }

}
