import { Component, Input } from '@angular/core'; 
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cv-preview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cv-preview.html',
  styleUrl: './cv-preview.css'
})
export class CvPreviewComponent {

  @Input() data: any; 
}