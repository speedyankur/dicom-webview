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

@NgModule({
  declarations: [AppComponent, SearchPatientsComponent, StudyComponent],
  imports: [
    BrowserModule,
    AvatarModule,
    MatBadgeModule,
    HttpClientModule,
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
