import { Component, EventEmitter, Input, Output } from '@angular/core';
import { log } from 'console';
import { ApiService } from '../../services/api.service';
@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
})
export class CourseComponent  {
  @Input() property: any;
  @Output() edit = new EventEmitter<any>();
  @Output() deleted = new EventEmitter<number>();

  constructor(private apiService:ApiService) {}
  
  deleteProperty(id: number) {
    this.apiService.deleteProperty(id).subscribe({
      next: () => {
        this.deleted.emit(id); 
      },
      error: (err) => console.log(err),
    });
  }
  editProperty() {
    this.edit.emit(this.property);
  }
}

