import { Component, OnInit } from '@angular/core';
import { UsersDataService } from '../services/users-data.service';
import { inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { user } from '../data-type';
import { DeleteConfirmationComponent } from '../popups/delete-confirmation/delete-confirmation.component';
import { MatDialog } from '@angular/material/dialog';
import { debounceTime, Subject, takeUntil } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
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

  sort: number = 1;
  dataSource: any;
  displayedColumns: string[] = ['index', 'username', 'email', 'age', 'actions'];
  search: string = '';
  searchSubject: Subject<string> = new Subject<string>();
  destroy$: Subject<void> = new Subject<void>();
  pagination:any;
  pageSize:number = 5;
  pageIndex:number = 0;
  constructor(private service: UsersDataService, private dialog: MatDialog, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.getUserList();
      this.searchSubject
      .pipe(
        debounceTime(300),
        takeUntil(this.destroy$)
      )
      .subscribe(value => {
        this.getUserList(value);
      });
  }

   onSearchChange() {
    this.searchSubject.next(this.search);
  }

  getUserList(search:string = ''):void {
    let obj = {
      page: this.pageIndex,
      limit: this.pageSize || 5,
      sort: this.sort,
      search: search || ''
    };
    this.service.getUserList(obj).subscribe((res: any) => {
      console.log(res, "User List Response");
      this.dataSource = res.data;
      this.pagination = res.pagination;
    })
  }

  deleteIndex(id: any): void {
    console.log("Id of delete", id);
    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      width: '400px',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if (result) {
        this.service.deleteUserById(id).subscribe((res: any) => {
          console.log(res, "Response after delete");
          this.getUserList();
        })
      }
    })
  }

  editUser(id: user) {
    // console.log(id, "UserId for edit");
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        edit: true,
        id: id,
      }
    });
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = (1 + event.pageIndex);
    this.pageSize = event.pageSize;
    this.getUserList();
  }
}
