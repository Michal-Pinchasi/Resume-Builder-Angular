import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PersonalDetailsComponent } from './components/personal-details/personal-details';
import { EducationComponent } from './components/education/education';
import { CvPreviewComponent } from './components/cv-preview/cv-preview';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, 
    RouterOutlet, 
    PersonalDetailsComponent, 
    EducationComponent, 
    CvPreviewComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent {
  cvData = {
    personal: { fullName: '', email: '', phone: '', description: '' },
    education: []
  };

  updatePersonal(data: any) {
    this.cvData.personal = data;
  }

  updateEducation(data: any) {
  this.cvData = {
    ...this.cvData,
    education: data 
  };
}
}