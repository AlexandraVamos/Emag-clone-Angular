import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/User';
import { AuthService } from 'src/app/services/auth.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  users: User[] = [];
  user: any = {};

  constructor(
    private authService: AuthService,
    private router: Router,
    private httpClient: HttpClient) { }

  ngOnInit() {
    this.authService.getUsers().subscribe((users: User[]) => {
      this.users = users;
      console.log(this.users);
    });
  }

  checkLogin() {
    this.authService.login(this.user).subscribe(response => {
      this.authService.setToken(JSON.stringify(response));
      console.log("Login Token: ", JSON.stringify(response));
      this.uploadToLocalStorage(this.user.username)
    })
    console.log(this.user);
  }

  uploadToLocalStorage(username: string) {
    this.httpClient.get<any>('https://fakestoreapi.com/users/').subscribe(
      response => {
        response.forEach((element: User) => {
          if (element.username == username) {
            localStorage.setItem("user", JSON.stringify(element))
            this.router.navigate(['/products']);
          }
        });
      })
  }
}



