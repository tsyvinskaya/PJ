import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatButtonModule} from '@angular/material/button';

import {MatListModule} from '@angular/material/list';

import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { DataServiceService} from './data-service.service';
import { MainComponent } from './main/main.component';

@NgModule({
  declarations: [
    AppComponent,
    StatisticsComponent,
    UserDetailComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    
    MatButtonModule,
    
    MatListModule,
    
    MatPaginatorModule,
    
    MatSortModule,
    MatTableModule,
    
  ],
  providers: [DataServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
