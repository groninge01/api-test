import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RestangularModule } from 'ngx-restangular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AuthService } from './services/auth.service';

// Function for settting the default restangular configuration
export function RestangularConfigFactory (RestangularProvider, AuthService) {

  RestangularProvider.setBaseUrl('https://api-test20180917094553.azurewebsites.net/umbraco/rest/v1');

  // by each request to the server receive a token and update headers with it
  RestangularProvider.addFullRequestInterceptor((element, operation, path, url, headers, params) => {

    const bearerToken = AuthService.getBearerToken('test@test.com', 'USLDC9x6oO');

    return {
      headers: Object.assign({}, headers, {Authorization: `Bearer ${bearerToken}`})
    };
  });
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    // Importing RestangularModule and making default configs for restanglar
    RestangularModule.forRoot([AuthService], RestangularConfigFactory)
  ],
  providers: [
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
