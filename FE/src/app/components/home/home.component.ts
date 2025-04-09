import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Property } from '../../models/course';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  properties:Property[]=[];
  selectedProperty!: Property;
  showEditModal = false;
   stats = [
    {
      number: '1,000+',
      label: 'Properties Listed',
    },
    {
      number: '850+',
      label: 'Happy Buyers',
    },
    {
      number: '500+',
      label: 'Verified Agents',
    },
    {
      number: '24/7',
      label: 'Customer Support',
    },
  ];
  
  features = [
    {
      icon: "../../../assets/icons/people.png",
      title: 'Trusted Agents',
      description: 'Work with experienced real estate professionals',
    },
    {
      icon: "../../../assets/icons/trophy.png",
      title: 'Verified Properties',
      description: 'Each listing is vetted for authenticity',
    },
    {
      icon: "../../../assets/icons/clock.png",
      title: 'Flexible Visits',
      description: 'Schedule property tours at your convenience',
    },
    {
      icon: '../../../assets/icons/book.png',
      title: 'Smart Investments',
      description: 'Explore valuable real estate opportunities',
    },
  ];
  
  getBadgeStyles(difficulty: string): string {
    const badgeStyles: { [key: string]: string } = {
      Beginner: 'bg-green-500/20 text-green-400',
      Intermediate: 'bg-yellow-500/20 text-yellow-400',
      Advanced: 'bg-orange-500/20 text-orange-400',
      Expert: 'bg-red-500/20 text-red-400',
    };
    return badgeStyles[difficulty] || '';
  }
  constructor(private apiService:ApiService){};

  ngOnInit(): void {
    const data = this.apiService.getAllCourses().subscribe({
      next:(data) =>{

        this.properties = data.properties
        console.log("api data properties-->",this.properties)
      },
      error:(error)=>{
        console.log("Error in fetching the courses",error);
        
      },
    });
   
    // Ensure the code runs only on the client-side (browser)
    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
      // Wait for the DOM to be fully loaded
      document.addEventListener('DOMContentLoaded', () => {
        const viewCoursesButton = document.getElementById('viewCoursesButton') as HTMLButtonElement | null;

        if (viewCoursesButton) {
          viewCoursesButton.addEventListener('click', () => {
            const coursesSection = document.getElementById('courses') as HTMLElement | null;

            if (coursesSection) {
              coursesSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
              });
            }
          });
        }
      });
    }
  }  
  onUserClick() {
    console.log("fsdfg")
  }

  openEditModal(property: Property) {
    this.selectedProperty = property;
    this.showEditModal = true;
  }
  
  closeEditModal() {
    this.showEditModal = false;
  }
  
  saveEditedProperty(updated: Property) {
    const index = this.properties.findIndex(p => p.id === updated.id);
    if (index > -1) {
      this.properties[index] = updated;
    }
    this.showEditModal = false;
  }

  onPropertyDeleted(id: number) {
    this.properties = this.properties.filter(p => p.id !== id);
  }
}
