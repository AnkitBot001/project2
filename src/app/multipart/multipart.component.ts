import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgxFileDropEntry } from 'ngx-file-drop';

@Component({
  selector: 'app-multipart',
  templateUrl: './multipart.component.html',
  styleUrls: ['./multipart.component.css']
})
export class MultipartComponent {
  uploadForm!: FormGroup;
  selectedFiles: any = {};

  constructor(private fb: FormBuilder, private httpClient: HttpClient) { }

  ngOnInit(): void {
    // Initialize the form with 5 fields
    this.uploadForm = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],  // Simple 10-digit phone number validation
      files: [null]  // File input is initially null
    });
  }

  // Method to handle file selection
  onFileSelect(event: any): void {
    this.selectedFiles = event.target.files;
  }

  // Method to handle form submission
  onSubmit(): void {
    if (this.uploadForm.valid) {
      const formData = new FormData();
      console.log(formData, "formData by multipart");

      // Append form data values
      formData.append('name', this.uploadForm.get('name')?.value);
      formData.append('address', this.uploadForm.get('address')?.value);
      formData.append('email', this.uploadForm.get('email')?.value);
      formData.append('phone', this.uploadForm.get('phone')?.value);

      // Append selected files if any
      if (this.selectedFiles && this.selectedFiles.length > 0) {
        for (let i = 0; i < this.selectedFiles.length; i++) {
          formData.append('files', this.selectedFiles[i]);
        }
      }

      // Send the FormData to the server
      this.uploadFormData(formData);
    } else {
      console.error('Form is invalid');
    }

  }

  // Method to send the FormData to the server
  uploadFormData(formData: FormData): void {
    const url = 'https://api.escuelajs.co/api/v1/files/upload';  // Your backend URL
    this.httpClient.post(url, formData).subscribe(
      (response) => {
        console.log('Form submitted successfully:', response);
      },
      (error) => {
        console.error('Form submission failed:', error);
      }
    );
  }
  // public files: NgxFileDropEntry[] = [];

  // constructor(private http: HttpClient) { }

  // public dropped(files: NgxFileDropEntry[]) {
  //   this.files = files;
  //   for (const droppedFile of files) {

  //     // Is it a file?
  //     if (droppedFile.fileEntry.isFile) {
  //       const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
  //       fileEntry.file((file: File) => {

  //         // Here you can access the real file
  //         console.log(droppedFile.relativePath, file);

  //         // You could upload it like this:
  //         const formData = new FormData()
  //         formData.append('logo', file, droppedFile.relativePath)

  //         // Headers
  //         const headers = new HttpHeaders({
  //           'security-token': 'mytoken'
  //         })

  //         // this.http.post('https://api.escuelajs.co/api/v1/files/upload', formData, { headers: headers, responseType: 'blob' })
  //         // .subscribe(data => {
  //         //   console.log(data,"Data by api");
  //         // })

  //       });
  //     } else {
  //       // It was a directory (empty directories are added, otherwise only files)
  //       const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
  //       console.log(droppedFile.relativePath, fileEntry);
  //     }
  //   }
  // }

  // public fileOver(event: any) {
  //   console.log(event);
  // }

  // public fileLeave(event: any) {
  //   console.log(event);
  // }
}
