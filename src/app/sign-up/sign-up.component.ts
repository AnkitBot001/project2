import { Component, EventEmitter, inject, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersDataService } from '../services/users-data.service';
import { HttpClient } from '@angular/common/http';
import { NgbAlert, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
   @Output() triggerUserList = new EventEmitter<void>();
  generalService = inject(UsersDataService);
  routeEndpoint: string = '';
  routeParam: string | null = null;
  imageUrl: string = '';
  selectedFile: File | null = null;
  signUpForm: FormGroup;
  staticAlertClosed=true;
  showMsg = false;

  constructor(
    private fb: FormBuilder,
    private userData: UsersDataService,
    private http: HttpClient,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
  ) {
    // Initialize the form
    this.signUpForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      age : ['', [Validators.required, Validators.min(18), Validators.max(100)]],
    });
  }

  ngOnInit() {
    console.log('Signup Component Initialized');
    this.generalService.onButtonClick.next('');
  }

  // Handle file selection
  onFileSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files[0]) {
      this.selectedFile = fileInput.files[0];
    }
  }

  // Submit the form
  // onSubmit(): void {
  //   if (this.signUpForm.valid && this.selectedFile) {
  //     // Upload the image first, then submit the form data
  //     this.spinner.show();
  //     this.uploadImg(this.selectedFile).pipe(
  //       switchMap((imageResponse: any) => {
  //         // Extract the image URL from the upload response
  //         // this.imageUrl = imageResponse.location; // Assuming API returns `location`

  //         // Prepare the form data with the image URL
  //         const formData = {
  //           name: this.signUpForm.get('name')?.value,
  //           email: this.signUpForm.get('email')?.value,
  //           // imageUrl: this.imageUrl,
  //         };

  //         // Submit the form data to the backend
  //         return this.userData.postData(formData);
  //       })
  //     ).subscribe({
  //       next: (response) => {
  //         console.log('Form submitted successfully:', response);
  //         if(response){
  //           this.spinner.hide()
  //         }
  //         this.signUpForm.reset()
  //         this.ngOnInit() 
  //         this.showMsg=true
  //         setTimeout(() => {
  //         this.showMsg=false
  //         }, 2000);
          
  //       },
  //       error: (error) => {
  //         console.error('Error during form submission:', error);
  //       },
  //     });
  //   } else {
  //     alert('Please complete the form and select a file!');
  //   }
  // }


  onSubmit():void {
    console.log('Form submitted:', this.signUpForm.value);
    if (this.signUpForm.valid) {
      this.userData.signUp(this.signUpForm.value).subscribe((res:any)=>{
        console.log('Response from signUp:', res);
        if(res.code === 200){
          this.toastr.success('Data saved successfully!', 'Success');
          this.signUpForm.reset();
          this.triggerUserList.emit();
        }else{
          this.toastr.error('Something went wrong!', 'Error');
        }
      }) 
    }
  }
  // Method to upload the image and return an observable
  uploadImg(file:File) {
    const formData = new FormData();
    formData.append('file', file);

    const apiUrl = 'https://api.escuelajs.co/api/v1/files/upload';

    // Return the HTTP POST request as an observable
    return this.http.post(apiUrl, formData);
  }
}
