import { Component, OnInit } from '@angular/core';
import { UserService, User } from 'src/app/services/User/user.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-org-profile',
  templateUrl: './org-profile.component.html',
  styleUrls: ['./org-profile.component.css']
})
export class OrgProfileComponent implements OnInit {
  selectedImage?: File;  // Storing the selected image
  previewImage: string = ''; // Image preview for the UI
 
  imageInvalid!: boolean;
  user!: User;
  showPasswordConfirmation: boolean = false;


  constructor(private memberService: UserService) { }

  displayPasswordConfirmation(): void {
    this.showPasswordConfirmation = true;
  }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
    this.previewImage = this.user.image;
  }

  // updateUser(): void {
  //   // Call the service method to update the user
  //   this.memberService.updateUser(this.user.userName, this.user).subscribe(
  //     updatedUser => {
  //       console.log('User updated successfully:', updatedUser);
  //       localStorage.setItem('user', JSON.stringify(updatedUser));
  //       window.location.reload();

  //     },
  //     error => {
  //       console.error('Error updating user:', error);
  //       window.alert('update error. Please try again.');

  //     }
  //   );
  // }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.previewImage = reader.result as string;
        this.user.image = this.previewImage;
      };
      this.selectedImage = file; // Mettre à jour selectedFile ici
    }
  }

  // Extracts the filename from a given file path.
  getImageFileName(path: string): string {
    const pathParts = path.split('/');
    const fileName = pathParts[pathParts.length - 1];
    return fileName;
  }

updateUserWithImage(): void {
  if (this.selectedImage) {
      this.memberService.updateUserImage(this.user.userName, this.user, this.selectedImage).subscribe(
          updatedUser => {
              console.log('User updated successfully with image:', updatedUser);
              localStorage.setItem('user', JSON.stringify(updatedUser));
              window.location.reload();
          },
          error => {
              console.error('Error updating user:', error);
              window.alert('update error. Please try again.');
          }
      );
  } 
}

}
