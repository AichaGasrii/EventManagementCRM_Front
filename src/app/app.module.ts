import { NgModule , CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './BackOffice/dashboard/dashboard.component';
import { SidebarComponent } from './BackOffice/Public/sidebar/sidebar.component';
import { TopheaderComponent } from './BackOffice/Public/topheader/topheader.component';
import { LoginComponent } from './User/login/login.component';
import { RegisterComponent } from './User/register/register.component';
import { ErrorComponent } from './BackOffice/error/error.component';
import { LockScreenComponent } from './User/lock-screen/lock-screen.component';
import { EditUserComponent } from './BackOffice/edit-user/edit-user.component';
import { AuthServiceService } from './Services/User/auth/auth-service.service';
import { CheckmailComponent } from './User/checkmail/checkmail.component';
import { ResetpasswordComponent } from './User/resetpassword/resetpassword.component';
import { NgxCaptchaModule } from 'ngx-captcha';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SidebarComponent,
    TopheaderComponent,
    LoginComponent,
    RegisterComponent,
    LockScreenComponent,
    ErrorComponent,
    EditUserComponent,
    CheckmailComponent,
    ResetpasswordComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxCaptchaModule,
    FlexLayoutModule
    
    
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

  providers: [AuthServiceService],
 bootstrap: [AppComponent]
})
export class AppModule { }
