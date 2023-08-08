import { Component, OnInit } from '@angular/core';
import { CourseService } from "../../services/course.service";
import { Course } from "../../models/course.model";

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {
  courses?: Course[];
  currentCourse: Course = {};
  currentIndex = -1;
  title = '';

  constructor(private courseService: CourseService) { }

  retrieveCourse(): void {
    this.courseService.getAll().subscribe({
      next: (data) => {
        this.courses = data;
        console.log(data);
      },
      error: (err) => console.error(err)
    });
  }

  refreshCourses(): void {
    this.retrieveCourse();
    this.currentCourse = {};
    this.currentIndex = -1;
  }

  setActiveCourse(course: Course, index: number): void {
    this.currentCourse = course;
    this.currentIndex = index;
  }

  removeAllCourses(): void {
    this.courseService.deleteAll().subscribe({
      next: (result) => {
        console.log(result);
        this.refreshCourses();
      },
      error: (err) => console.error(err)
    });
  }

  searchCourseTitle(): void {
    this.currentCourse = {};
    this.currentIndex = -1;
    this.courseService.findByTitle(this.title).subscribe({
      next: (data) => {
        this.courses = data;
        console.log(data);
      },
      error: (err) => console.error(err)
    });
  }

  ngOnInit(): void {
    this.retrieveCourse();
  }

}
