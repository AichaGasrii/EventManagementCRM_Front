import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/User/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-organizer',
  templateUrl: './view-organizer.component.html',
  styleUrls: ['./view-organizer.component.css']
})
export class ViewOrganizerComponent implements OnInit {

  organizers:any;
  constructor(private memberService : UserService) { }

  // Get All Organizers
  ngOnInit(): void {
    this.memberService.getUsersByRoleOrganiser().subscribe(
      (data)=>{
        this.organizers = data;
      },
      (error)=>{
        console.log(error);
      }
    )
  }

  }

