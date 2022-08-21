import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { findEmail } from 'src/app/helpers/userHandler';
import { UserI } from 'src/app/interfaces/user.interface';
import { alertUser } from 'src/app/helpers/alertHandler';

@Component({
  selector: 'app-mail',
  templateUrl: './mail.page.html',
  styleUrls: ['./mail.page.scss'],
})
export class MailPage implements OnInit {
  emailForm !: FormGroup;
  user: UserI;
  constructor(private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly alertController: AlertController) { }

  ngOnInit() {
    this.emailForm = this.formInit();
  }

  formInit(): FormGroup {
    return (this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    }));
  }

  onSubmit() {
    if(this.emailForm.invalid) return;
    this.user = findEmail(this.emailForm.value.email);
    if(this.user) {
      localStorage.setItem('quiz', JSON.stringify(this.user));
      this.router.navigate(['/question']);
      return;
    }
    alertUser('Error al encontrar usuario', 'El usuario no existe', this.alertController);
  }

}
