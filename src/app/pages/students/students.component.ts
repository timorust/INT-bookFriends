import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {StudentInterface} from "../../interfaces/student.interface";
import {CoreService} from "../../services/core.service";
import {UserInterface} from "../../interfaces/user.interface";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'cb-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit, OnDestroy {


  user: UserInterface;
  userSub;

  students: StudentInterface[];
  studentsSub;


  constructor(private coreService: CoreService,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.getUser();
    this.studentsSub = this.coreService.getStudent().subscribe((studentsDoc: any) => {
      this.students = studentsDoc;
    })
  }
  getUser() {
    this.userSub = this.authService.user.subscribe((userDoc: UserInterface | undefined) => {
      this.user = userDoc;
    })
  }

 ngOnDestroy() {
    if(this.studentsSub) this.studentsSub.unsubscribe();
 }

 async deleteCard(student) {
    if(this.user?.uid !== student.uid) return alert('You are not the owner');
    await this.coreService.deleteCard(student.id);
    alert('Success delete');
 }

}
