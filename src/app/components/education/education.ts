import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-education',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './education.html',
  styleUrl: './education.css'
})
export class EducationComponent implements OnInit {
  @Output() update = new EventEmitter<any>(); 
  educationForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.educationForm = this.fb.group({
      educations: this.fb.array([this.createEducationItem()])
    });
   
    this.onInputChange();
  }

  onInputChange() {
    
    this.update.emit(this.educationForm.value.educations);
  }

  createEducationItem(): FormGroup {
  const group = this.fb.group({
    institution: ['', Validators.required],
    degree: ['', Validators.required],
    field: ['', Validators.required],
    startDate: ['', Validators.required],
    endDate: [''],
    status: ['סיימתי', Validators.required],
    grade: [null, [Validators.required, Validators.min(0), Validators.max(100)]],
    courses: this.fb.array([this.fb.control('', Validators.required)], Validators.required)
  }, { 
    validators: this.dateLessThan('startDate', 'endDate') 
  });

  group.get('status')?.valueChanges.subscribe(status => {
    const endDate = group.get('endDate');
    if (status === 'במהלך') {
      endDate?.clearValidators();
    } else {
      endDate?.setValidators([Validators.required]);
    }
    endDate?.updateValueAndValidity();
  });

  return group;
}

  get educations() { return this.educationForm.get('educations') as FormArray; }

  addEducation() { 
    this.educations.push(this.createEducationItem()); 
    this.onInputChange();
  }

  removeEducation(index: number) { 
    if (this.educations.length > 1) {
      this.educations.removeAt(index); 
      this.onInputChange();
    }
  }

  getCourses(eduIndex: number): FormArray {
    return this.educations.at(eduIndex).get('courses') as FormArray;
  }

  addCourse(eduIndex: number) {
    this.getCourses(eduIndex).push(this.fb.control('', Validators.required));
  }

  removeCourse(eduIndex: number, courseIndex: number) {
    const courses = this.getCourses(eduIndex);
    if (courses.length > 1) { 
      courses.removeAt(courseIndex);
    }
  }
  
dateLessThan(firstControlName: string, secondControlName: string) {
  return (group: FormGroup): {[key: string]: any} | null => {
    const first = group.get(firstControlName)?.value;
    const second = group.get(secondControlName)?.value;
    const status = group.get('status')?.value;

    if (status === 'במהלך') return null;

    if (first && second && new Date(first) > new Date(second)) {
      return { 'invalidDate': true };
    }
    return null;
  };
}


}