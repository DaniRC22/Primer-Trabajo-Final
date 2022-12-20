import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Student } from 'src/app/shared/modules/students.model';
import { StudentDialogComponent } from '../../shared/components/student-dialog/student-dialog.component';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent {
  students: Student[] = [
    new Student(1,'Daniel', 'Rivero', true),
    new Student(2, 'Matias', 'Bueno', false),
    new Student(3, 'Sebastian', 'Miloro', false),
    new Student(4,'Karen', 'Rosales', true),
  ]
  displayedColumns =['id','primernombre', 'apellido', 'activo','editar','eliminar']

  constructor(private readonly dialogService: MatDialog) { }

addStudent(){
const dialog = this.dialogService.open(StudentDialogComponent)

dialog.afterClosed().subscribe((value) => {
  if (value) {
    const lastId = this.students[this.students.length - 1]?.id;
   // this.students.push(new Student(lastId + 1, value.primernombre, value.apellido, true))
   this.students = [...this.students, new Student(lastId + 1, value.primernombre, value.apellido, true)];
  }
})
}
removeStudent(student: Student) {
  this.students = this.students.filter((stu) => stu.id !== student.id);
}
editStudent(student: Student) {
  const dialog = this.dialogService.open(StudentDialogComponent, {
    data: student,
  })
  dialog.afterClosed().subscribe((data) => {
    if (data) {
      this.students = this.students.map((stu) => stu.id === student.id ? {...stu, ...data} : stu);
    }
  })
}
 
}
