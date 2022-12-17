import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../interfaces/Product';
import { Cart } from '../interfaces/Cart';
import { User } from '../interfaces/User';

@Injectable()
export class UserService {

    constructor(private httpClient: HttpClient) { }

    userId = ""

    getUserId() {
        if (localStorage.getItem("user")) {
            console.log(localStorage.getItem("user"))
            return JSON.parse(localStorage.getItem("user") ?? "").id
        } else return -1
    }

    getUserName() {
        if (localStorage.getItem("user")) {
            console.log(localStorage.getItem("user"))
            if (JSON.parse(localStorage.getItem("user") ?? "").name.firstname)
                return JSON.parse(localStorage.getItem("user") ?? "").name.firstname
            else return "Guest"
        } else return "Guest"
    }

}