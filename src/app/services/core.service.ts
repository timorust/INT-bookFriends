import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/firestore";
import {StudentInterface} from "../interfaces/student.interface";
import firebase from "firebase";
import firestore = firebase.firestore;

@Injectable({
  providedIn: 'root'
})
export class CoreService {

  constructor(private afs: AngularFirestore) { }

  saveStudent(student: StudentInterface): any {
    return this.afs.collection('students').add(student);
  }

  getStudent() {
    return this.afs.collection('students').valueChanges({idField: 'id'});
  }

  deleteCard(student) {
    return this.afs.doc(`students/${student}`).delete()
    // return this.afs.doc(`students`).update({
   //   student: firestore.FieldValue.arrayRemove(student)
   // })
  }
}
