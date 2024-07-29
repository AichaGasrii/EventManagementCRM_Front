import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/services/User/auth/model';
import { UserService } from 'src/app/services/User/user.service';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})
export class ViewUserComponent implements OnInit {

  users: User[] = [];
  constructor(private memberService : UserService) { }

  ngOnInit(): void {
    this.memberService.getUsersByRoleUser().subscribe(data => {
      this.users = data;
      console.log(this.users);
    });
  }

}
