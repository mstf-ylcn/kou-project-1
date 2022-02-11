import { Component, OnInit } from '@angular/core';
import { userService } from '../userService';

@Component({
  selector: 'app-modal-basvuru',
  templateUrl: './modal-basvuru.page.html',
  styleUrls: ['./modal-basvuru.page.scss'],
})
export class ModalBasvuruPage implements OnInit {

  constructor(public userService:userService) { }

  ngOnInit() {
  }

}
