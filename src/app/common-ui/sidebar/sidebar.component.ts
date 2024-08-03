import { AsyncPipe, JsonPipe, NgFor } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProfileService } from '../../data/services/profile.service';
import { SvgImgComponent } from '../svg-img/svg-img.component';
import { SubscriberCardComponent } from './subscriber-card/subscriber-card.component';
import { firstValueFrom } from 'rxjs';
import { ImgUrlPipe } from '../../helpers/pipes/img-url.pipe';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    SvgImgComponent,
    NgFor,
    RouterModule,
    SubscriberCardComponent,
    AsyncPipe,
    JsonPipe,
    ImgUrlPipe,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  profileService = inject(ProfileService);

  subscribers$ = this.profileService.getSubscribersShortList();
  me = this.profileService.me;
  menuItems = [
    {
      label: 'Моя сторінка',
      icon: 'home',
      link: 'profile/me',
    },
    {
      label: 'Чати',
      icon: 'chat',
      link: 'chats',
    },
    {
      label: 'Пошук',
      icon: 'search',
      link: 'search',
    },
  ];
  ngOnInit() {
    firstValueFrom(this.profileService.getMe());
  }
}
