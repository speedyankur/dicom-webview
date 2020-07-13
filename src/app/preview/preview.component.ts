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
  location: any;
}
interface Document {
  createElement: any;
  body: any;
}
declare const window: Window;
declare const document: Document;
@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit {
  private stage: Konva.Stage;
  private layer: Konva.Layer;
  private drawingLayer: Konva.Layer;
  private image: Konva.Image;
  private scaleBy = 1.01;
  public brightenLevel = 0;
  public maskLevel = 20;
  public isPlaying:boolean;
  private player:any;

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
  async play(){
    this.isPlaying=!this.isPlaying;
    while(this.isPlaying){
      await this.loadNext()
    }
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
      this.drawingLayer = new Konva.Layer();
      this.stage.add(this.drawingLayer);
      this.handleZoom();
      this.setupDrawing();
      this.loadCurrentIndexImage();

    };

  }

  isPaint = false;
  mode = 'brush';
  lastLine;
  setupDrawing() {
    this.stage.on('mousedown touchstart', e => {
      this.isPaint = true;
      var pos = this.stage.getPointerPosition();
      this.lastLine = new Konva.Line({
        stroke: '#df4b26',
        strokeWidth: this.mode === 'brush' ? 4 : 10,
        globalCompositeOperation:
          this.mode === 'brush' ? 'source-over' : 'destination-out',
        points: [pos.x, pos.y]
      });
      this.drawingLayer.add(this.lastLine);
    });

    this.stage.on('mouseup touchend', () => {
      this.isPaint = false;
    });

    // and core function - drawing
    this.stage.on('mousemove touchmove', () => {
      if (!this.isPaint) {
        return;
      }

      const pos = this.stage.getPointerPosition();
      var newPoints = this.lastLine.points().concat([pos.x, pos.y]);
      this.lastLine.points(newPoints);
      this.drawingLayer.batchDraw();
    });
  }

  private async loadCurrentIndexImage() {
    const url = `${this.apiRoot}/instances/${
      this.instances[this.currentIndex].ID
    }/preview`;
    return new Promise((resolve, reject) => {
      Konva.Image.fromURL(url, image => {
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
          Konva.Filters.Mask
        ]);
        this.layer.destroyChildren();
        this.layer.add(this.image);
        this.layer.batchDraw();
        this.drawingLayer.destroyChildren();
        this.drawingLayer.batchDraw();
        resolve();
      });
    });

  }

  loadBefore() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.loadCurrentIndexImage();
      this.resetSettings();
    }
  }

  async loadNext() {
    if (this.currentIndex < this.instances.length - 1) {
      this.currentIndex++;
      console.log("loading", this.currentIndex);
      await this.loadCurrentIndexImage();
      console.log("loaded", this.currentIndex);
      this.resetSettings();
    }
  }

  save() {
    var dataURL = this.stage.toDataURL({ pixelRatio: 3 });
    this.downloadCanvasAsImage(dataURL);
  }

  private downloadCanvasAsImage(dataURL) {
    let downloadLink = document.createElement('a');
    downloadLink.setAttribute('download', 'CanvasAsImage.png');
    let url = dataURL.replace(
      /^data:image\/png/,
      'data:application/octet-stream'
    );
    downloadLink.setAttribute('href', url);
    downloadLink.click();
  }

  private resetSettings() {
    this.maskLevel = 20;
    this.brightenLevel = 0;
    this.resetScale();
  }

  public onBrightnessChange() {
    this.image.brightness(this.brightenLevel);
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
