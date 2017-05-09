import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CameraPreviewPage } from './camera-preview';

@NgModule({
  declarations: [
    CameraPreviewPage,
  ],
  imports: [
    IonicPageModule.forChild(CameraPreviewPage),
  ],
  exports: [
    CameraPreviewPage
  ]
})
export class CameraPreviewModule {}
