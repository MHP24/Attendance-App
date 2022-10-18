import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule  } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DatabaseHandlerService } from './services/database-handler.service';
import { IonicStorageModule } from '@ionic/storage-angular';
import { AuthService } from './services/auth.service';
import { StorageHandlerService } from './services/storage-handler.service';
import { RouteGuardService } from './services/route-guard.service';
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    IonicStorageModule.forRoot(),
    AppRoutingModule, 
    ReactiveFormsModule,
    BrowserAnimationsModule 
  ],
  providers: [
    DatabaseHandlerService,
    AuthService,
    StorageHandlerService,
    RouteGuardService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
