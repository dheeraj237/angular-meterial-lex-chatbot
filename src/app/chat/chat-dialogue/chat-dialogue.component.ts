import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ChatService, Message } from '../chat.service';
import { lexInput } from 'src/app/lexInput';


// import { MomentDateAdapter } from '@angular/material-moment-adapter';

// import { Observable } from 'rxjs/Observable';
import { scan } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Globals } from 'src/app/globals';
import { ActivatedRoute } from '@angular/router';




@Component({
  selector: 'app-chat-dialogue',
  templateUrl: './chat-dialogue.component.html',
  styleUrls: ['./chat-dialogue.component.scss']
})
export class ChatDialogueComponent implements OnInit {

  @ViewChild("scrollElement") scroollProp: ElementRef;
  // public lexInput: new lexInput();
  // this.lexInput.msg = 'hello';
  messages: Observable<Message[]>;
  formValue: string;
  lastMsg: any = {
    sessionAttributes: {},
    showInput: true
  };
  hasButtonBeenClicked: boolean = false;
  minDate = new Date();
  // minDate = moment(new Date()).format('YYYY-MM-DD')
  maxDate = new Date(2019, 12, 0);
  types: string[] = [];
  sessionAttrib: any = {};
  userId: string = null;
  showIndicator: boolean = false;


  constructor(private chat: ChatService, private globals: Globals, private route: ActivatedRoute) { }

  ngOnInit() {

    // let userId =;
    // let userName = ;
    // console.log('chat dialogue component > ', this.route.snapshot.queryParamMap, this.globals)
    this.globals.userID = this.route.snapshot.queryParamMap.get('userId') || this.globals.userID;
    this.globals.userName = this.route.snapshot.queryParamMap.get('userName') || this.globals.userName;
    this.userId = this.route.snapshot.queryParamMap.get('userId') || this.globals.userID;
    // if (!this.userId) {
    //   return false;
    // }
    this.sessionAttrib = {
      "userId": this.globals.userID,
      "Name": this.globals.userName
    };

    this.messages = this.chat.conversation.asObservable()
      .pipe(
        scan((acc, val, i) => {
          return acc.concat(val)
        })
      )
    this.sendMessage('hi');
  }

  sendMessage(msg: any = null, divId: string = null, showMsg: boolean = true) {
    this.showIndicator = true;
    // console.log('msg ', msg)
    if (msg) {
      this.formValue = msg;
    }
    if (this.lastMsg.sessionAttributes.selectTypes) {
      delete this.sessionAttrib.selectTypes;
    }

    if (this.formValue) {
      // console.log('from cpmonent session attrib', this.sessionAttrib)
      this.chat.converse(this.formValue, this.sessionAttrib, showMsg)
        .then((data) => {

          this.showIndicator = false;
          this.lastMsg = data;
          this.sessionAttrib = data.sessionAttributes;
          console.log('Last Resposne >>>', this.lastMsg);
          this.formValue = '';
          this.scroollProp.nativeElement.scrollIntoView({ behavior: "smooth", block: "end" });

          if (this.sessionAttrib.selectTypes) {
            let strArr = this.sessionAttrib.selectTypes.split('|');
            strArr.forEach(el => {
              if (el) {
                this.types.push(JSON.parse(el.replace(/\'/g, '"')))
              }
            });
            this.lastMsg.showInput = false;
          } else if (data.slotToElicit === 'startDate' || data.slotToElicit === 'endDate') {
            this.types = [];
            this.lastMsg.showInput = false;
          } else {
            this.types = [];
            this.lastMsg.showInput = true;
          }

          if (divId) {
            let el = document.getElementById(divId);
            let all = el.getElementsByTagName('button')
            for (let i = 0; i < all.length; i++) {
              all[i].className += " btn-disabled";
              all[i].disabled = true;
            }
          }
        });
    }
  }

  scrollLast(last) {
    if (last) {
      this.scroollProp.nativeElement.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }

}
