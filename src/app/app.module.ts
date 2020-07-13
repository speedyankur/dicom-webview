import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { AvatarModule } from 'ngx-avatar';
import { SearchPatientsComponent } from './search-patients/search-patients.component';
import { StudyComponent } from './study/study.component';
import { SeriesComponent } from './series/series.component';
import { InstanceComponent } from './instance/instance.component';
import { PreviewComponent } from './preview/preview.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatSliderModule } from '@angular/material/slider';
import { FormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

@NgModule({
  declarations: [
    AppComponent,
    SearchPatientsComponent,
    StudyComponent,
    SeriesComponent,
    InstanceComponent,
    PreviewComponent
  ],
  imports: [
    BrowserModule,
    AvatarModule,
    MatButtonToggleModule,
    MatBadgeModule,
    MatDividerModule,
    MatSliderModule,
    HttpClientModule,
    MatIconModule,
    FormsModule,
    BrowserAnimationsModule, // new modules added here
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
