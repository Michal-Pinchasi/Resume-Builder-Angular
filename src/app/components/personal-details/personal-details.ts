import { Component, Output, EventEmitter } from '@angular/core'; // הוספנו Output ו-EventEmitter
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-personal-details',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './personal-details.html',
  styleUrl: './personal-details.css'
})
export class PersonalDetailsComponent {
  @Output() update = new EventEmitter<any>();

  personalInfo = {
    fullName: '',
    email: '',
    phone: '',
    description: ''
  };

  onInputChange() {
    this.update.emit(this.personalInfo);
  }

  onSubmit() {
    console.log('נתוני פרטים אישיים נשלחו:', this.personalInfo);
  }
onlyNumbers(event: any) {
  const pattern = /[0-9]/;
  const inputChar = String.fromCharCode(event.charCode);
  if (!pattern.test(inputChar)) {
    event.preventDefault();
  }
}
}