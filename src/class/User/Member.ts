export class Member {
  id: number;
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  password: string;
  phone: string;
  gender: string[];
  status: string[];

  constructor(
    id: number,
    firstname: string,
    lastname: string,
    username: string,
    email: string,
    password: string,
    phone: string,
    gender: string[],
    status: string[]
  ) {
    this.id = id;
    this.firstname = firstname;
    this.lastname = lastname;
    this.username = username;
    this.email = email;
    this.password = password;
    this.phone = phone;
    this.gender = gender;
    this.status = status;
  }
}
