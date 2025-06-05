import { Component, OnInit } from '@angular/core';
import { UsersDataService } from '../services/users-data.service';
import { inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { user } from '../data-type';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})

export class TableComponent implements OnInit {

  // generalService = inject(UsersDataService)
  // updateForm: FormGroup
  // showForm = false;
  // userMessage = '';
  // showEdit=false;
  // showPatch=false;

  // users: any[] = [];

  // constructor(private userData: UsersDataService, private fb: FormBuilder, private route: ActivatedRoute) {
  //   this.generalService.onButtonClick.subscribe(() => {
  //     this.getData()
  //   })
  //   this.updateForm = this.fb.group({
  //     username: [''],
  //     email: [''],
  //     id: ['']
  //   })
  // }
  // ngOnInit() {
  //   this.getData();

  // }
  
  // isImage(url: string): boolean {
  //   return url.match(/\.(jpeg|jpg|gif|png)$/i) !== null;
  // }

  // isVideo(url: string): boolean {
  //   return url.match(/\.(mp4|webm|ogg)$/i) !== null;
  // }

  // getData() {
  //   this.userData.users().subscribe(result => {
  //     this.users = result;
  //   }, (Error) => {
  //     console.log(Error)
  //   })
  // }

  // deleteIndex(id: any): void {
  //   if (confirm('Are you sure, you want to delete this user?')) {
  //     this.userData.deleteData(id).subscribe(() => {
  //       this.getData();
  //     })
  //   }
  // };

  // editUser(id: user) {
  //   this.showEdit=true
  //   this.showPatch=false
  //   this.userData.editUser(id).subscribe((data: user) => {
  //     if (data) {
  //       this.updateForm.patchValue({
  //         username: data.username,
  //         email: data.email,
  //         id: data.id
  //       })
  //     }
  //     console.log(id, "UserId");

  //     this.showForm = true
  //   })
  // }

  // updateData(data: user) {
  //   this.userData.updateUserInfo(data).subscribe((result) => {
  //     console.log(result, "Result after update");

  //     if (result) {
  //       console.log("user data has been updated");
  //       this.getData()
  //     }
  //   })
  //   this.showForm = false
  // };

  // patchButton(id:user){
  //   this.showPatch=true
  //   this.showEdit=false
  //   this.userData.editUser(id).subscribe((data: user) => {
  //     if (data) {
  //       this.updateForm.patchValue({
  //         username: data.username,
  //         email: data.email,
  //         id: data.id
  //       })
  //     }
  //     console.log(id, "UserId");

  //     this.showForm = true
  //   })
  // }

  // patchUser(data:user){
  //   this.userData.patchMethod(data).subscribe((result)=>{
  //     console.log(result,"result of patch");
  //     this.getData()
  //   })
  // }

  // dispayData(id:user){
  //   this.userData.getDataFromApi(id).subscribe((result)=>{
  //     console.log(result,"this is the response from api");
  //   })
  // }

  sort:number=1;

  constructor(private service:UsersDataService){}
  
  ngOnInit(): void {
    this.getUserList();
  }

  getUserList(){
    let obj = {
      page: 1,
      limit: 10,
      sort: this.sort,
    };
    this.service.getUserList(obj).subscribe((res:any) => {
      console.log(res, "User List Response");
    })
  }

  deleteIndex(id: any): void {
    console.log("Id of delete", id);
  }

  editUser(id: user) {
    console.log(id, "UserId for edit");
  }
}
