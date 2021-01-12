import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {FlashComponent} from './components/flash/flash.component';
import {FormsModule} from "@angular/forms";
import {FlashService} from './services/flash.service';

@NgModule({
  declarations: [
    AppComponent,
    FlashComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [FlashService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
