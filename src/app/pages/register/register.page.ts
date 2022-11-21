import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { DatabaseHandlerService } from 'src/app/services/database-handler.service';
import { alertUser } from 'src/app/helpers/alertHandler';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  registerForm!: FormGroup;

  constructor(
    private readonly formBuilder:FormBuilder,
    private readonly router: Router,
    private readonly databaseService: DatabaseHandlerService,
    private readonly alertController: AlertController) { }

  ngOnInit() {
    this.registerForm = this.initForm();
  }

  onSubmit(): void {
    if(this.registerForm.invalid) return;
    const { email, password, username, question, answer } = this.registerForm.value;
    this.databaseService.createUser(email, password, username, question, answer);
    alertUser('¡Registro éxtisoso!', 'Inicia sesión para continuar', this.alertController);
    this.router.navigate(['/login']);
  }


  initForm(): FormGroup {
    return this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required]],
      question: ['', [Validators.required]],
      answer: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }
}
