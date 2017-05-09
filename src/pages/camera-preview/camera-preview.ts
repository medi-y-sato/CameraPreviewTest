import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

import { CameraPreview, CameraPreviewPictureOptions, CameraPreviewOptions } from '@ionic-native/camera-preview';

@IonicPage()
@Component({
  selector: 'page-camera-preview',
  templateUrl: 'camera-preview.html',
})
export class CameraPreviewPage {

  picture: string
  pictureOpts: CameraPreviewPictureOptions
  tabBarElement: any

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private cameraPreview: CameraPreview,
    private viewController: ViewController,
  ) {
    this.tabBarElement = document.querySelector('.tabbar.show-tabbar')
  }

  ionViewWillEnter() {
    this.tabBarElement.style.display = 'none';
    this.startCamera()
  }

  ionViewWillLeave() {
    this.tabBarElement.style.display = 'flex';
    this.stopCamera()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CameraPreview');

  }


  private startCamera() {
    const cameraPreviewOpts: CameraPreviewOptions = {
      x: 0,
      y: 0,
      width: window.screen.width,
      height: window.screen.height,
      camera: 'rear',
      tapPhoto: true,
      previewDrag: true,
      toBack: true,
      alpha: 1
    };

    // start camera
    this.cameraPreview.startCamera(cameraPreviewOpts).then(
      (res) => {
        console.log(res)
      },
      (err) => {
        console.log(err)
      });
  }

  private stopCamera() {
    this.cameraPreview.stopCamera().then(
      (res) => {
        console.log(res)
      },
      (err) => {
        console.log(err)
      });
  }

  public shutter() {
    // picture options
    this.pictureOpts = {
      width: 1280,
      height: 1280,
      quality: 85
    }
    // take a picture
    this.cameraPreview.takePicture(this.pictureOpts).then((imageData) => {
      this.picture = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      console.log(err);
      this.picture = 'assets/img/test.jpg';
    });

  }


  public dismiss() {
    this.stopCamera()
    if (this.navCtrl.isActive(this.viewController)) {
      this.navCtrl.pop()
    }
  }


}
