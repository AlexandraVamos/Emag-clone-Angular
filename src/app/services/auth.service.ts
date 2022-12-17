import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthData } from "../interfaces/AuthData";
import { User } from "../interfaces/User";

@Injectable()
export class AuthService {
    constructor(private http: HttpClient) { }

    users: User[] = [];
    token: string = '';
    reqHeader: HttpHeaders = new HttpHeaders();

    getUsers(): Observable<User[]>{
        return this.http.get<User[]>('https://fakestoreapi.com/users', { headers: this.reqHeader });
    }
    
    login(user: any) {
        return this.http.post<any>('https://fakestoreapi.com/auth/login', user);
    }

    setToken(tokenFromLogin: string) {
        this.token = tokenFromLogin;
        this.reqHeader.set('Authorization', 'Bearer ' + this.token); 
        console.log("Auth Service Token: ",this.token);
    }

}


