import { Role } from './role';

export class User {
  userName!: string;
  userFirstName!: string;
  userLastName!: string;
  userPassword!: string;
  siteWeb!: string;
  aboutMe!: string;
  image!: string;
  location!: string;
  domaines!: string;
  userEmail!: string;
  userNumber!:string;
  role!: Role[];
}
