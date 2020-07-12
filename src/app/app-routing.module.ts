import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchPatientsComponent } from './search-patients/search-patients.component';
import { StudyComponent } from './study/study.component';
import { SeriesComponent } from './series/series.component';
import { InstanceComponent } from './instance/instance.component';

const routes: Routes = [
  { path: 'patientSearch', component: SearchPatientsComponent },
  { path: 'studiesView/:id', component: StudyComponent },
  { path: 'seriesView/:id', component: SeriesComponent },
  { path: 'instancesView/:id', component: InstanceComponent },
  { path: '', redirectTo: '/patientSearch', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
