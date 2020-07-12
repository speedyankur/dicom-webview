import { Component, OnInit, ViewChild, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DicomService } from '../dicom.service';
import { Location } from '@angular/common';
import { Instance } from '../models/Instance';
import { Observable, of, BehaviorSubject } from 'rxjs';
import Konva from 'konva';
// declare window to remove typescript warning
interface Window {
  Image: any;
}
declare const window: Window;
@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit {
  private stage: Konva.Stage;
  private layer: Konva.Layer;
  private image: Konva.Image;
  private scaleBy = 1.01;
  public brightenLevel = 0;
  public noiseLevel = 0;
  public maskLevel = 20;

  instances: Instance[];
  images: Array<any> = [];
  currentIndex: number = 0;

  constructor(
    private route: ActivatedRoute,
    private ds: DicomService,
    private location: Location
  ) {}

  zoomIn() {}
  zoomOut() {}

  ngOnInit(): void {
    this.getInstances();
  }
  getInstances() {
    const id = this.route.snapshot.paramMap.get('id');
    this.ds.getInstancesForSeries(id).subscribe(async s => {
      this.instances = s;
      if (this.instances.length > 0) {
        this.currentIndex = 0;
        this.setUpStage();
      }
    });
  }
  setUpStage() {
    const image = new window.Image();
    image.src = `${this.apiRoot}/instances/${
      this.instances[this.currentIndex].ID
    }/preview`;
    image.onload = () => {
      this.stage = new Konva.Stage({
        container: 'container',
        width: image.width,
        height: image.height
      });
      this.layer = new Konva.Layer();
      this.stage.add(this.layer);
      this.handleZoom();
      this.loadCurrentIndexImage();
    };
  }

  private loadCurrentIndexImage() {
    Konva.Image.fromURL(
      `${this.apiRoot}/instances/${
        this.instances[this.currentIndex].ID
      }/preview`,
      image => {
        this.image = image;
        this.image.setAttrs({
          x: 0,
          y: 0,
          scaleX: 1,
          scaleY: 1
        });
        this.image.cache();
        this.image.filters([
          Konva.Filters.Brighten,
          Konva.Filters.Noise,
          Konva.Filters.Mask
        ]);
        this.layer.add(this.image);
        this.layer.batchDraw();
      }
    );
  }

  loadBefore() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.loadCurrentIndexImage();
      this.resetSettings();
    }
  }

  loadNext() {
    if (this.currentIndex < this.instances.length - 1) {
      this.currentIndex++;
      this.loadCurrentIndexImage();
      this.resetSettings();
    }
  }

  private resetSettings() {
    this.brightenLevel = 0;
    this.resetScale();
  }

  public onBrightnessChange() {
    this.image.brightness(this.brightenLevel);
    this.layer.batchDraw();
  }

  public onNoiseChange() {
    this.image.noise(this.noiseLevel);
    this.layer.batchDraw();
  }

  public onMaskChange() {
    this.image.threshold(this.maskLevel);
    this.layer.batchDraw();
  }

  private resetScale() {
    this.stage.scale({ x: 1, y: 1 });
    var newPos = {
      x: 0,
      y: 0
    };
    this.stage.position(newPos);
    this.stage.batchDraw();
  }
  private handleZoom() {
    this.stage.on('wheel', e => {
      e.evt.preventDefault();
      var oldScale = this.stage.scaleX();

      var pointer = this.stage.getPointerPosition();

      var mousePointTo = {
        x: (pointer.x - this.stage.x()) / oldScale,
        y: (pointer.y - this.stage.y()) / oldScale
      };

      var newScale =
        e.evt.deltaY > 0 ? oldScale * this.scaleBy : oldScale / this.scaleBy;

      this.stage.scale({ x: newScale, y: newScale });

      var newPos = {
        x: pointer.x - mousePointTo.x * newScale,
        y: pointer.y - mousePointTo.y * newScale
      };
      this.stage.position(newPos);
      this.stage.batchDraw();
    });
  }
  get apiRoot(): string {
    return this.ds.getAPIRoot();
  }
}
