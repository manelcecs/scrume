import { Injectable } from '@angular/core';
import { PlatformLocation } from '@angular/common';
import { HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({providedIn:'root'})

export class CabeceraService {
    location: PlatformLocation;
    path : string = environment.backend;

    constructor(platformLocation: PlatformLocation){
        this.location = platformLocation;
    }

    getCabecera():string{
        console.log("path: "+this.path);
        return this.path;
    }

    getBasicAuthentication(): HttpHeaders{
        let headers = new HttpHeaders();
        headers = headers.append("Authorization", "Basic " + btoa(environment.login.user+":"+environment.login.pass));
        // headers = headers.append("Content-Type", "application/x-www-form-urlencoded");
        headers = headers.append("Content-Type", "application/json");
        headers = headers.append("Access-Control-Allow-Origin", '*');


        return headers;
    }
  }
