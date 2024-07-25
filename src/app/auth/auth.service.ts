import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { catchError, tap, throwError } from 'rxjs';
import { TokenResponce } from './auth.interface';
import { environment } from '../../environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  http = inject(HttpClient);
  coockieService = inject(CookieService);
  router = inject(Router);
  baseApiUrl = environment.baseApiUrl;

  token: string | null = null;
  refreshToken: string | null = null;

  public get isAuth(): boolean {
    if (!this.token) {
      this.token = this.coockieService.get('token');
      this.refreshToken = this.coockieService.get('refreshToken');
    }
    return !!this.token;
  }

  login(payload: { username: string; password: string }) {
    const fd = new FormData();
    fd.append('username', payload.username);
    fd.append('password', payload.password);
    return this.http.post<TokenResponce>(`${this.baseApiUrl}token`, fd).pipe(
      tap((val) => {
        this.setTokens(val);
      }),
    );
  }

  refreshAccessToken() {
    // Call the refresh token endpoint to get a new access token
    const refreshToken = this.coockieService.get('refreshToken');
    return this.http
      .post<TokenResponce>(`${this.baseApiUrl}refresh`, {
        refresh_token: refreshToken,
      })
      .pipe(
        tap((res) => {
          this.setTokens(res);
        }),
        catchError((err) => {
          this.logout();
          return throwError(() => err);
        }),
      );
  }
  logout() {
    this.coockieService.deleteAll();
    this.token = null;
    this.refreshToken = null;
    this.router.navigate(['/login']);
  }

  private setTokens(res: TokenResponce) {
    this.token = res.access_token;
    this.refreshToken = res.refresh_token;
    this.coockieService.set('token', res.access_token);
    this.coockieService.set('refreshToken', res.refresh_token);
  }
}
