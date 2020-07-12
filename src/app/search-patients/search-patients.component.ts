import { Component, OnInit } from '@angular/core';
import { DicomService } from '../dicom.service';
import { Patient } from '../models/Patient';

@Component({
  selector: 'app-search-patients',
  templateUrl: './search-patients.component.html',
  styleUrls: ['./search-patients.component.scss']
})
export class SearchPatientsComponent implements OnInit {
  patients:Patient[];
  constructor(private ds:DicomService) { }

  ngOnInit(): void {
    this.ds.getPatients().subscribe(ps=>{
      this.patients=ps;
    })
  }

}
