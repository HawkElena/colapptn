import { Component, OnInit,TemplateRef } from '@angular/core';
import {ToastService} from './toast.service';
@Component({
  selector: 'app-toasts',
    // templateUrl: './toast.component.html'
     template : `<ngb-toast
                  *ngFor= "let toast of toastService.toasts"
                  [header]="toast.headertext"
                  [class]="toast.classname"
                  autohide="toast.autohide"
                  [delay]="toast.delay || 5000"
                  (hide) ="toastService.remove(toast)">
                  <ng-template [ngIf] ="isTemplate(toast)" [ngIfElse]= "text">
                  <ng-template [ngTemplateOutlet] = "toast.textOrTpl">
                  </ng-template>
                  </ng-template>
                  <ng-template #text >
                  {{toast.textOrTpl}}
                  </ng-template>
                </ngb-toast>`
                //  ,host: {'[class.ngb-toasts]': 'true'}
                  ,styleUrls: ['./toast.component.css']
                              })
export class ToastComponet implements OnInit {
  constructor(public toastService:ToastService) { }
                                 isTemplate(toast: { textOrTpl: any; }){
                                     return toast.textOrTpl instanceof TemplateRef;
                                }

                                 ngOnInit() {

                                 }

                              }
