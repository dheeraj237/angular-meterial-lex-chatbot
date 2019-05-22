import { Injectable } from '@angular/core';

@Injectable()
export class Globals {
    public userID: string = '';
    public userName: string = '';
    public sessionAttrib: any = {}

    public constructor() { }
}
