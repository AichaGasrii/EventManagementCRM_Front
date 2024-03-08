import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './BackOffice/dashboard/dashboard.component';
import { LoginComponent } from './User/login/login.component';
import { RegisterComponent } from './User/register/register.component';
import { ErrorComponent } from './BackOffice/error/error.component';
import { LockScreenComponent } from './User/lock-screen/lock-screen.component';
import { EditUserComponent } from './BackOffice/edit-user/edit-user.component';
import { CheckmailComponent } from './User/checkmail/checkmail.component';
import { ResetpasswordComponent } from './User/resetpassword/resetpassword.component';

 const routes: Routes = [
   
            // Default route. Redirects to '/home' if no other paths match.
        {
        path: "",
        redirectTo: "/login",
          pathMatch: "full",
        }
         // Route for the admin page.
         ,
         {
           path:'Dashboard',
           component:DashboardComponent
         } 
         ,
         {
           path:'EditUser',
           component:EditUserComponent
         } 
         ,{
           path:'register',
           component:RegisterComponent
         }
         ,
         {
          path:'login',
          component:LoginComponent
        }
        ,
        {
         path:'check',
         component:CheckmailComponent
       }
       ,
       {
        path:'resetpassword',
        component:ResetpasswordComponent
      }
      ,
        {
          path:'LockScreen',
          component:LockScreenComponent
        }
        ,
        {
         path:'error',
         component:ErrorComponent
       }
  ];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
