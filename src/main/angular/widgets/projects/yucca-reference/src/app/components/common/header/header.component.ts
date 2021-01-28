import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { faSignOutAlt, faCheck } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {

  public currentUser: any;
  public selectedArea: string;
  faSignOutAlt = faSignOutAlt;
  faCheck = faCheck;

  constructor(public router: Router, public translate: TranslateService, private authService: AuthService) { }

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    this.selectedArea = this.currentUser?.user?.tenants[0]?.name ?? '';
  }

  showMenu(): boolean {
    return this.router.url != "/tools/widget/accessibility";
  }
  
  changeLang(lang) {
    this.translate.use(lang);
  }
  
  logout() {
    this.authService.logout();
  }

}
