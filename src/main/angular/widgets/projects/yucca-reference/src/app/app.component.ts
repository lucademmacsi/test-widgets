import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {

  title = 'yucca-reference';

  constructor(public translate: TranslateService, public router: Router) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    translate.addLangs(['it', 'en']);
    translate.setDefaultLang('it');
  }
}
