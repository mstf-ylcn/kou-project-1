import { Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { IonItem, IonItemSliding, IonList, NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { PreviewAnyFile } from '@ionic-native/preview-any-file/ngx';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFireDatabase } from '@angular/fire/compat/database';

import { NgForm } from '@angular/forms';
import { userService } from '../userService';
import { AngularFireAuth } from '@angular/fire/compat/auth';

import firebase from 'firebase/compat/app';

export function getFileReader(): FileReader {
  const fileReader = new FileReader();
  const zoneOriginalInstance = (fileReader as any)["__zone_symbol__originalInstance"];
  return zoneOriginalInstance || fileReader;
}
@Component({
  selector: 'app-ayarlar',
  templateUrl: './ayarlar.page.html',
  styleUrls: ['./ayarlar.page.scss'],
})
export class AyarlarPage implements OnInit {

  constructor(private db:AngularFireDatabase,
    public alertController: AlertController,
    private previewAnyFile: PreviewAnyFile,
    private storage:AngularFireStorage,
    public userService:userService,
    private nav:NavController,
    private afAuth:AngularFireAuth) { }

    public _id:string;
    public _name:string;
    public _tel:string;
    public _adres:string;
    public _bolum:string;
    public _cinsiyet:string;
    public _dTarih:string;
    public _email:string;
    public _fakulte:string;;
    public _ogrNo:string;
    public _okul:string;
    public _sinif:number;
    public _tc:string;
    public edit=false;
    ngOnInit() {

       this._id=this.userService.userData.uid;
      this.getstart();
    }
    public _usersList:User[];
    async getstart()
    {
       
await  this.db.database.ref('users/'+this._id).on('value',data=>{
        this.da=data.val();
        this._name=data.val().name;
        this._tel=this.da.tel;
        this._email=this.da.email;
        this._adres=this.da.adres;

      })
    }
    da;
    DB()
    {
      return new Promise((resolve,reject)=>{
       this.db.list('users/'+this._id).valueChanges().subscribe(value=>{
       resolve(value);
       });
      });
    }
    async adduser()
    {
      var data = 
      {
        id:this._id,
        name:this._name,
        tel:this._tel,
        adres:this._adres,
      }
      await this.db.object('users/'+(String(this._id))).set(data);  
      await this.getstart();
      this.clear(); 
    }
    
    clear()
    {
      this._name='';
      this._tel='';
    }
    
    async Edit()
    {
     
      var data = 
      {
        id:this._id,
        adres:this._adres,
      }
      await this.db.object('users/'+(String(this._id))).update(data);  
      await this.getstart();
      this.clear(); 
    }
    async Edit1()
    {
      var data = 
      {
        tel:this._tel,
      }
      await this.db.object('users/'+(String(this._id))).update(data);  
      await this.getstart();
      this.clear(); 
    }
    async Edit2()
    {

      var data = 
      {
        id:this._id,
        email:this._email
      }

      await this.afAuth.signInWithEmailAndPassword(this.userService.userData.email,this.userService.pw).then((suc)=>{
        firebase.auth().currentUser.updateEmail(this._email).then(() => {
         })
        })


      await this.db.object('users/'+(String(this._id))).update(data);  
      await this.getstart();
      this.clear(); 
    }
    back()
    {
      this.nav.back();
    }

    }
    class User
    {
      adres:string;
      email:string;
      tel:string;
      id:number;
      tc:string;
    }
    