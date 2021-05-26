import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { User } from 'src/app/models/User';
import { AdminService } from 'src/app/services/admin.service';
import { PromptComponent } from '../../prompt/prompt.component';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss']
})
export class ManageUsersComponent implements OnInit {
  isLoading = false;
  isDeleteLoading = false;
  deleteIndex = 0;
  usersCount: number;
  pageSize = 25;
  pageCount= 1;
  errors: string[] = [];
  users: Partial<User>[] = [];

  constructor(public dialog: MatDialog, private adminService: AdminService) { }

  ngOnInit(): void {
    this.fetchUsers();
  }
  onDelete(id:string, index: number) {
    this.isDeleteLoading = true;
    this.deleteIndex = index;
    const dialogRef = this.dialog.open(PromptComponent, {data: this.users[index].username});
    dialogRef.afterClosed().subscribe(result => {
      this.isDeleteLoading = false;
      if(result) {
        this.adminService.deleteUser(id).subscribe(() => {
          this.users.splice(index, 1);
        }, err => {
          console.log(err);
        });
      }
    });
  }
  paginatorReload(e: PageEvent) {
    this.pageCount = e.pageIndex + 1;
    this.pageSize = e.pageSize;
    this.fetchUsers();
  }
  fetchUsers() {
    this.isLoading = true;
    this.errors = [];
    this.adminService.getUsers(this.pageSize, this.pageCount).subscribe(res => {
      this.users = res.data;
      this.usersCount = res.size;
      this.isLoading = false;
    }, err => {
      if(typeof(err.error) == 'string')
        this.errors.push(err.error);
      else if(typeof(err.error) == 'object' && err.error.errors) {
        const errors = Object.values(err.error.errors);
        errors.forEach((errArray: []) => {
          errArray.forEach(err => {
            this.errors.push(err);
          });
        });
      }
      this.isLoading = false;
      this.users = [];
    });
  }

}
