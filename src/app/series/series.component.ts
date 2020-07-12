import { Component, OnInit } from '@angular/core';
import { Series } from '../models/Series';
import { ActivatedRoute } from '@angular/router';
import { DicomService } from '../dicom.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-series',
  templateUrl: './series.component.html',
  styleUrls: ['./series.component.scss']
})
export class SeriesComponent implements OnInit {
  series: Series[];
  constructor(
    private route: ActivatedRoute,
    private ds: DicomService,
    private location: Location
  ) {

  }

  ngOnInit(): void {
    this.getSeries();
  }
  getSeries() {
    const id = this.route.snapshot.paramMap.get('id');
    this.ds.getSeriesForStudies(id).subscribe(s => (this.series = s));
  }
}
