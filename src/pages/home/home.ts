import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { CameraPreviewPage } from '../camera-preview/camera-preview'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }


  public startCamera() {
    this.navCtrl.push(CameraPreviewPage)
  }
}
