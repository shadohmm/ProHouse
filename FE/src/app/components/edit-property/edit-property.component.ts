import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Property } from '../../models/course';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-edit-property',
  templateUrl: './edit-property.component.html',
  styleUrl: './edit-property.component.css'
})
export class EditPropertyComponent {

  @Input() property!: Property;
  @Input() visible = false;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<Property>();

  editedProperty!: Property;
  constructor(private apiService:ApiService) {}

  ngOnChanges() {
    this.editedProperty = { ...this.property };
  }

  onSave() {
    this.save.emit(this.editedProperty);
    const id = this.editedProperty!.id
    if (id !== undefined) {
      this.apiService.editPropertyDetails(id, this.editedProperty).subscribe({
        next: (res) => {
          console.log(res);
          
        },
        error: (err) => {
          console.error("Error updating property:", err);
        }
      });
    }
  }

  onClose() {
    this.close.emit();
  }

}
