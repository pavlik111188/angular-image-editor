import {Component, OnInit, ViewChild} from '@angular/core';
import {CropperComponent} from 'angular-cropperjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  imageUrl: any;
  cropperRes: string;
  showCropper: boolean;

  cropperConfig: object = {
    movable: true,
    scalable: true,
    zoomable: true,
    viewMode: 2,
    checkCrossOrigin: true
  };

  @ViewChild('angularCropper') public angularCropper: CropperComponent;

  constructor() {

  }

  ngOnInit() {

  }

  onFileSelected(event) {
    const that = this;
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      that.showCropper = false;
      reader.onload = (eventCurr: ProgressEvent) => {
        that.imageUrl = (<FileReader>eventCurr.target).result;
        setTimeout(function () {
          that.refreshCrop(that.imageUrl);
        }, 2000);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  refreshCrop(img) {
    this.imageUrl = img;
    this.showCropper = true;
  }

  cropendImage(event) {
    this.cropperRes = this.angularCropper.cropper.getCroppedCanvas().toDataURL('image/jpeg');
  }

  readyImage(event) {
    this.cropperRes = this.angularCropper.cropper.getCroppedCanvas().toDataURL('image/jpeg');
  }

  rotate(turn) {
    turn = turn === 'left' ? -45 : 45;
    this.angularCropper.cropper.rotate(turn);
    this.cropperRes = this.angularCropper.cropper.getCroppedCanvas().toDataURL('image/jpeg');
  }

  destroy(event) {
    this.angularCropper.cropper.destroy();
  }

  zoomManual() {
    this.cropperRes = this.angularCropper.cropper.getCroppedCanvas().toDataURL('image/jpeg');
  }

  zoom(status) {
    status = status === 'positive' ? 0.1 : -0.1;
    this.angularCropper.cropper.zoom(status);
    this.cropperRes = this.angularCropper.cropper.getCroppedCanvas().toDataURL('image/jpeg');
  }

  move(offsetX, offsetY) {
    this.angularCropper.cropper.move(offsetX, offsetY);
    this.cropperRes = this.angularCropper.cropper.getCroppedCanvas().toDataURL('image/jpeg');
  }

  scale(offset) {
    if (offset === 'x') {
      this.angularCropper.cropper.scaleX(-1);
    } else {
      this.angularCropper.cropper.scaleY(-1);
    }
    this.cropperRes = this.angularCropper.cropper.getCroppedCanvas().toDataURL('image/jpeg');
  }

  clear() {
    this.angularCropper.cropper.clear();
    this.cropperRes = this.angularCropper.cropper.getCroppedCanvas().toDataURL('image/jpeg');
  }

  disable() {
    this.angularCropper.cropper.disable();
    this.cropperRes = this.angularCropper.cropper.getCroppedCanvas().toDataURL('image/jpeg');
  }

  enable() {
    this.angularCropper.cropper.enable();
    this.cropperRes = this.angularCropper.cropper.getCroppedCanvas().toDataURL('image/jpeg');
  }

  reset() {
    this.angularCropper.cropper.reset();
    this.cropperRes = this.angularCropper.cropper.getCroppedCanvas().toDataURL('image/jpeg');
  }

}
