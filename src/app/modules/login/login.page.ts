import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { map, switchMap, take } from 'rxjs/operators';
import { TokenData, User } from 'src/app/models';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { UserQuery, UserStore } from 'src/app/store/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  form = new FormGroup({
    username: new FormControl('stephanie24068@test.nl'),
    password: new FormControl('Asdqwe123'),
  });

  loading$ = this.userQuery.selectLoading();

  constructor(
    private loadingController: LoadingController,
    private toast: ToastController,
    private authService: AuthService,
    private userService: UserService,
    private userQuery: UserQuery,
    private userStore: UserStore,
    private router: Router
  ) {}

  async login() {
    if (this.form.invalid) {
      return;
    }

    this.userStore.setLoading(true);

    const loader = await this.loadingController.create({ animated: true });
    await loader.present();

    const { username, password } = this.form.value;
    this.authService
      .login(username, password)
      .pipe(
        switchMap((token) => {
          this.userStore.updateToken(token);
          return this.userService.fetchCurrentUser();
        }),
        take(1)
      )
      .subscribe(
        (user) => {
          this.userStore.update({ user });
          loader.dismiss();
          this.userStore.setLoading(false);
          this.router.navigate(['/tabs']);
        },
        () => {
          loader.dismiss();
          this.userStore.setLoading(false);
          this.showErrorToast();
        }
      );
  }

  async showErrorToast() {
    await this.toast.create({
      message: 'There was an error when trying to Login',
    });
  }
}
