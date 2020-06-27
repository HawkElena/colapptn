import {Component} from '@angular/core';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'modal-confirm',
  templateUrl: './modal-basic.html'
})
export class ModalConfirm {
  closeResult = '';
  html_header: string='';
  Titulo_:string = 'Modal Dinamico en Run time...'
  constructor(private modalService: NgbModal) {}

  open(content) {
    this.abrir_modal(`<h4 class="modal-title" style="backgroun:red;">{{Titulo_}}</h4><h2 style="background-color: rebeccapurple;">hawks</h2>`);

    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });


  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  abrir_modal(html_string:string){
    this.html_header=  html_string;
  }
}
