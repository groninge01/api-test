import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RestangularModule } from 'ngx-restangular';
import { switchMap } from 'rxjs/operators';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AuthService } from './services/auth.service';

// Function for settting the default restangular configuration
export function RestangularConfigFactory (RestangularProvider, AuthService) {

  RestangularProvider.setBaseUrl('https://api-test20180917094553.azurewebsites.net/umbraco/rest/v1');

  // This function must return observable
  const refreshAccesstoken = function () {
    // Here you can make action before repeated request
    return AuthService.getBearerToken('test@test.com', 'USLDC9x6oO');
  };

  RestangularProvider.addErrorInterceptor((response, subject, responseHandler) => {
    if (response.status === 401) {

      refreshAccesstoken()
      .pipe(
        switchMap(refreshAccesstokenResponse => {
        // If you want to change request or make with it some actions and give the request to the repeatRequest func.
        // Or you can live it empty and request will be the same.

        // update Authorization header

        const token = 'Bearer ' + refreshAccesstokenResponse['access_token'];

        // response.request.headers.set('Authorization', token);
        const newRequest = response.request.clone({setHeaders: {'Authorization': 'Bearer ' + refreshAccesstokenResponse['access_token']}});

        return response.repeatRequest(newRequest);
      }))
      .subscribe(
        res => responseHandler(res),
        err => subject.error(err)
      );

      return false; // error handled
    }
    return true; // error not handled
  });

  // Set an interceptor in order to parse the API response 
  // when getting a list of resources
  RestangularProvider.addResponseInterceptor((data, operation, what, url, response) => {
    if (operation === 'getList') {
      response =  data._embedded[what];
      response._links = data._links;
      return response;
    }
    return data;
  });

    // Using self link for self reference resources
    RestangularProvider.setRestangularFields({
      selfLink: 'self.link'
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
