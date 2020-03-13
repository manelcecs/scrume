import { Injectable } from '@angular/core';
import { PlatformLocation } from '@angular/common';

@Injectable({providedIn:'root'})

export class CabeceraService {
    location: PlatformLocation;

    constructor(private platformLocation:PlatformLocation){
        this.location = platformLocation;
    }

    getCabecera():String{
        return this.location.pathname;
    }

 }
