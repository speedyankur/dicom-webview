import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DicomService } from '../dicom.service';
import { Location } from '@angular/common';
import { Study } from '../models/Study';
@Component({
  selector: 'app-study',
  templateUrl: './study.component.html',
  styleUrls: ['./study.component.scss']
})
export class StudyComponent implements OnInit {
  studies: Study[];
  constructor(
    private route: ActivatedRoute,
    private ds: DicomService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getStudy();
  }

  getStudy(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.ds.getStudiesForPatient(id).subscribe(s => (this.studies = s));
  }
}
