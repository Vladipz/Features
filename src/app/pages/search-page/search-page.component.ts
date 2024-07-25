import { Component, inject } from '@angular/core';
import { Profile } from '../../data/interfaces/profile.interface';
import { ProfileService } from '../../data/services/profile.service';
import { ProfileCardComponent } from "../../common-ui/profile-card/profile-card.component";

@Component({
    selector: 'app-search-page',
    standalone: true,
    templateUrl: './search-page.component.html',
    styleUrl: './search-page.component.scss',
    imports: [ProfileCardComponent]
})
export class SearchPageComponent {
  title = 'tik-tolk';
  profileService = inject(ProfileService);
  profiles: Profile[]= [];
  constructor() {
    this.profileService
      .getTestsAccaunts()
      .subscribe((value) => (this.profiles = value));
  }
}
