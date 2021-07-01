import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/firestore";
import {StudentInterface} from "../interfaces/student.interface";

@Injectable({
  providedIn: 'root'
})
export class CoreService {

  constructor(private afs: AngularFirestore) { }

  saveStudent(student: StudentInterface) {
    return this.afs.collection('students').add(student);
  }

  getStudent() {
    return this.afs.collection('students').valueChanges({idField: 'id'});
  }
}
