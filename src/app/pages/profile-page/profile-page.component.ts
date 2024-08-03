import { Component } from '@angular/core';
import { ProfileHeaderComponent } from '../../common-ui/profile-header/profile-header.component';
import { ProfileService } from '../../data/services/profile.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';
import { AsyncPipe } from '@angular/common';
import { Profile } from '../../data/interfaces/profile.interface';
import { ImgUrlPipe } from '../../helpers/pipes/img-url.pipe';
import { SvgImgComponent } from '../../common-ui/svg-img/svg-img.component';
import { PostFeedComponent } from './post-feed/post-feed.component';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [
    ProfileHeaderComponent,
    AsyncPipe,
    RouterModule,
    ImgUrlPipe,
    SvgImgComponent,
    PostFeedComponent,
  ],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss',
})
export class ProfilePageComponent {
  me$: Observable<Profile | null>;
  profile$: Observable<Profile | null>;
  subscribers$ = this.profileService.getSubscribersShortList(6);

  constructor(
    private profileService: ProfileService,
    private route: ActivatedRoute,
  ) {
    this.me$ = toObservable(this.profileService.me);
    this.profile$ = this.initializeProfileStream();
  }

  private initializeProfileStream() {
    return this.route.params.pipe(
      switchMap(({ id }) => this.getProfileObservable(id)),
    );
  }

  private getProfileObservable(id: string) {
    if (id === 'me') {
      return this.me$;
    }
    return this.profileService.getAccount(id);
  }
}
