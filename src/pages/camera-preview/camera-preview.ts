import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Platform } from 'ionic-angular';

import { CameraPreview, CameraPreviewPictureOptions, CameraPreviewOptions } from '@ionic-native/camera-preview';

@IonicPage()
@Component({
  selector: 'page-camera-preview',
  templateUrl: 'camera-preview.html',
})
export class CameraPreviewPage {

  picture: string
  pictureOpts: CameraPreviewPictureOptions
  cameraPreviewOpts: CameraPreviewOptions
  tabBarElement: any

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private cameraPreview: CameraPreview,
    private viewController: ViewController,
    private platform: Platform,
  ) {
    this.tabBarElement = document.querySelector('.tabbar.show-tabbar')

    this.cameraPreviewOpts = {
      x: 0,
      y: 0,
      width: window.screen.width,
      height: window.screen.height,
      camera: 'rear',
      tapPhoto: true,
      previewDrag: true,
      toBack: true,
      alpha: 1
    }

    this.platform.resume.subscribe(
      res => {
        console.log("this.platform.resume res")

        let loopCounter = 0
        let loopId = setInterval(() => {
          loopCounter++

          this.cameraPreview.getSupportedFlashModes()
            .then((res) => {
              if (typeof res !== "undefined") {
                clearInterval(loopId)

                this.cameraPreview.stopCamera()
                  .then(() => {
                    this.cameraPreview.startCamera(this.cameraPreviewOpts)
                      .then(() => {})
                      .catch(error => console.error(error))
                  })
                  .catch(error => console.error(error))
              }
            })
            .catch((error) => console.error(error))

          if (loopCounter >= 3) {
            clearInterval(loopId)
            this.startCamera()
          }

        }, 500);

      },
      error => console.error(error),
      () => { }
    )

    this.platform.pause.subscribe(
      res => {
        console.log("this.platform.pause res")
        this.stopCamera()
      },
      error => console.error(error),
      () => { }
    )

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
    console.log("startCamera()")

    // start camera
    this.cameraPreview.startCamera(this.cameraPreviewOpts).then(
      (res) => {
        console.log(res)
      },
      (err) => {
        console.log(err)
      });
  }

  private stopCamera() {
    console.log("stopCamera()")

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
