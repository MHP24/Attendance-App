import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { getUser } from 'src/app/helpers/userHandler';
import { UserI } from 'src/app/interfaces/user.interface';
import { alertUser } from 'src/app/helpers/alertHandler';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm!: FormGroup;
  user: UserI;
  constructor(private readonly formBuilder: 
    FormBuilder, private readonly router: Router,
    private readonly alertController: AlertController) { }

  ngOnInit() {
    this.loginForm = this.initForm();
  }

  onSubmit(): void {
    if(this.loginForm.invalid) return;
    const { email, password } = this.loginForm.value;
    this.user = getUser(email, password);
    if(this.user) {
      /* State method */
      const navigationExtras: NavigationExtras = {
        state: { user: JSON.stringify(this.user) }
      };
      this.router.navigate(['/navigation/home'], navigationExtras);

      /* Local storage method */
      localStorage.clear();
      localStorage.setItem('user', JSON.stringify(this.user));
      return;
    }
    alertUser('Error al iniciar sesión', 'Usuario o claves incorrectas', this.alertController);
  }

  initForm(): FormGroup {
    return this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }
}
