import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { UserStoreService } from './services/user-store.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'NoteSharing';

  public fullName: string = '';
  constructor(
    private auth: AuthService,
    private userStore: UserStoreService
  ) {}

  ngOnInit() {

    this.userStore.getFullNameFromStore().subscribe((val) => {
      const fullNameFromToken = this.auth.getFullNameFromToken();
      this.fullName = val || fullNameFromToken;
    });
  }

  canActivate(): boolean {
    if (this.auth.isloggedIn()) {
      return true;
    } else {
      return false;
    }
  }

  logout() {
    this.auth.signOut();
  }
}
