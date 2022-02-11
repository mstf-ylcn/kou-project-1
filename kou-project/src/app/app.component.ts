import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { userService } from './pages/userService';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent  {
  constructor(private menu:MenuController,
    public userService:userService) {

    
    }

  exit()
  {
    this.menu.enable(false);
  }
}
