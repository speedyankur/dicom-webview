import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchPatientsComponent } from './search-patients/search-patients.component';
import { StudyComponent } from './study/study.component';
import { SeriesComponent } from './series/series.component';

const routes: Routes = [
  { path: 'patientSearch', component: SearchPatientsComponent },
  { path: 'study/:id', component: StudyComponent },
  { path: 'series/:id', component: SeriesComponent },
  { path: '', redirectTo: '/patientSearch', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
