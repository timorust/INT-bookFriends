import {Component, OnDestroy, OnInit} from '@angular/core';
import {StudentInterface} from "../../interfaces/student.interface";
import {CoreService} from "../../services/core.service";

@Component({
  selector: 'cb-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit, OnDestroy {

  students: StudentInterface[];
  studentsSub;


  constructor(private coreService: CoreService) { }

  ngOnInit(): void {
    this.studentsSub = this.coreService.getStudent().subscribe((studentsDoc: any) => {
      this.students = studentsDoc;
    })
  }

 ngOnDestroy() {
    if(this.studentsSub) this.studentsSub.unsubscribe();
 }


}
