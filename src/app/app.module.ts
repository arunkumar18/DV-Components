import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSnackBarModule} from '@angular/material';
import { DvNotificationComponent } from './components/dv-notification/dv-notification.component';
import { DVNotificationService } from './components/dv-notification/dv-notification.service';



@NgModule({
  declarations: [
    AppComponent,
    DvNotificationComponent
  ],
  imports: [
    BrowserModule,
    MatSnackBarModule,
    BrowserAnimationsModule
  ],
  providers: [DVNotificationService],
  bootstrap: [AppComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
