import { Component, OnInit } from '@angular/core';
import { Instance } from '../models/Instance';
import { ActivatedRoute } from '@angular/router';
import { DicomService } from '../dicom.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-instance',
  templateUrl: './instance.component.html',
  styleUrls: ['./instance.component.scss']
})
export class InstanceComponent implements OnInit {
  instances: Instance[];
  constructor(
    private route: ActivatedRoute,
    private ds: DicomService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getInstances();
  }
  getInstances() {
    const id = this.route.snapshot.paramMap.get('id');
    this.ds.getInstancesForSeries(id).subscribe(s => (this.instances = s));
  }
}
