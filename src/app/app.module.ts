import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { HttpModule } from '@angular/http'
import { routing, appRoutingProviders } from './app.routing';

import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { EditComponent } from './edit/edit.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    EditComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [appRoutingProviders],
  entryComponents: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
