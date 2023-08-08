import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/services/course.service';
import { Course } from './../../models/course.model';

@Component({
  selector: 'app-course-add',
  templateUrl: './course-add.component.html',
  styleUrls: ['./course-add.component.css']
})
export class CourseAddComponent implements OnInit {
  course: Course = {
    title: '', description: '', price: 0, published: false
  };
  submitted = false;

  constructor(private courseService: CourseService) { }

  ngOnInit(): void { }

  saveCourse(): void {
    const data = {
      title: this.course.title,
      price: this.course.price,
      description: this.course.description,
    };

    this.courseService.create(data).subscribe({
      next: (result) => {
        console.log(result);
        this.submitted = true;
      },
      error: (err) => console.error(err)
    });
  }

  newCourse(): void {
    this.submitted = false;
    this.course = {
      title: '',
      description: '',
      price: 0,
      published: false,
    };
  }

}
