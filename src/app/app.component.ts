import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private authService: AuthService) {}

  title = 'api-test';

  response;

  ngOnInit() {
    this.authService.getBearerToken('groninge@hotmail.com', '2xtermin8!')
    .subscribe(data => {
      this.response = data.access_token;
    });
  }

}
