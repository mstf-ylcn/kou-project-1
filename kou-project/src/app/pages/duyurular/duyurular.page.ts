import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { element } from 'protractor';
@Component({
  selector: 'app-duyurular',
  templateUrl: './duyurular.page.html',
  styleUrls: ['./duyurular.page.scss'],
})
export class DuyurularPage implements OnInit {

  constructor(private nav:NavController,
    private fireDb:AngularFireDatabase,) {
      this.fireDb.database.ref().child("duyurular").on('value',data=>{
        data.forEach(element=>{
          this.data.push(element.val());
        })
     })
     }

  ngOnInit() {


  }

  data=[];

  back()
  {
 this.nav.back();
  }



}
