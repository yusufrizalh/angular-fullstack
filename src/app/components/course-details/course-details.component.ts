import { Component, OnInit, Input } from '@angular/core';
import { CourseService } from 'src/app/services/course.service';
import { Course } from './../../models/course.model';
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent implements OnInit {
  @Input() viewMode = false;
  @Input() currentCourse: Course = {
    title: '', description: '', price: 0, published: false
  };
  message = '';

  constructor(
    private courseService: CourseService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  getCourse(id: string): void {
    this.courseService.get(id).subscribe({
      next: (data) => {
        this.currentCourse = data;
        console.log(data);
      },
      error: (err) => console.error(err)
    });
  }

  updatePublished(status: boolean): void {
    const data = {
      title: this.currentCourse.title,
      description: this.currentCourse.description,
      price: this.currentCourse.price,
      published: status,
    };
    this.message = '';

    this.courseService.update(this.currentCourse.id, data).subscribe({
      next: (result) => {
        console.log(result);
        this.currentCourse.published = status;
        this.message = result.message ? result.message : 'Status was updated!';
      },
      error: (err) => console.error(err)
    });
  }

  updateCourse(): void {
    this.message = '';
    this.courseService.update(this.currentCourse.id, this.currentCourse).subscribe({
      next: (result) => {
        console.log(result);
        this.message = result.message ? result.message : 'This Course was updated!';
      },
      error: (err) => console.error(err)
    });
  }

  deleteCourse(): void {
    this.courseService.delete(this.currentCourse.id).subscribe({
      next: (result) => {
        console.log(result);
        this.router.navigate(['/courses']);
      },
      error: (err) => console.error(err)
    });
  }

  ngOnInit(): void {
    if (!this.viewMode) {
      this.message = '';
      this.getCourse(this.route.snapshot.params["id"]);
    }
  }

}
