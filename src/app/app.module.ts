import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RestangularModule } from 'ngx-restangular';
import { switchMap } from 'rxjs/operators';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AuthService } from './services/auth.service';
import { DataService } from './services/data.service';

import { HomeComponent } from './components/home/home.component';
import { NavComponent } from './components/nav/nav.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeroComponent } from './components/hero/hero.component';
import { LoadingComponent } from './components/loading.component';

// Function for settting the default restangular configuration
export function RestangularConfigFactory (RestangularProvider, authService) {

  RestangularProvider.setBaseUrl('https://api-test20180917094553.azurewebsites.net/umbraco/rest/v1');

  const _token = localStorage.getItem('token');
  if (_token) {
    RestangularProvider.setDefaultHeaders({'Authorization': `Bearer ${_token}`});
  }

  // This function must return observable
  const refreshAccesstoken = function () {
    // Here you can make action before repeated request
    return authService.getBearerToken('test@test.com', 'USLDC9x6oO');
  };

  RestangularProvider.addErrorInterceptor((response, subject, responseHandler) => {
    if (response.status === 401) {

      refreshAccesstoken()
      .pipe(
        switchMap(refreshAccesstokenResponse => {
        // If you want to change request or make with it some actions and give the request to the repeatRequest func.
        // Or you can live it empty and request will be the same.

        // update Authorization header

        const token = refreshAccesstokenResponse['access_token'];

        localStorage.setItem('token', token);

        // response.request.headers.set('Authorization', token);
        const newRequest = response.request.clone({setHeaders: {'Authorization': `Bearer ${token}`}});
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
      response =  data._embedded['content'];
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
    AppComponent,
    HomeComponent,
    NavComponent,
    HeaderComponent,
    FooterComponent,
    HeroComponent,
    LoadingComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    // Importing RestangularModule and making default configs for restanglar
    RestangularModule.forRoot([AuthService], RestangularConfigFactory)
  ],
  providers: [
    AuthService,
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
