import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { alertUser } from 'src/app/helpers/alertHandler';

@Component({
  selector: 'app-question',
  templateUrl: './question.page.html',
  styleUrls: ['./question.page.scss'],
})
export class QuestionPage implements OnInit {
  questionForm: FormGroup;

  username: string;
  question: string;
  answer: string;
  password: string;

  constructor(private readonly formBuilder: FormBuilder,
    private readonly alertController: AlertController) { }

  ngOnInit() {
    this.question = JSON.parse(localStorage.getItem('quiz')).question;
    this.username = JSON.parse(localStorage.getItem('quiz')).name;
    this.answer = JSON.parse(localStorage.getItem('quiz')).answer.toLowerCase();
    this.password = JSON.parse(localStorage.getItem('quiz')).password;
    this.questionForm = this.formInit();
  }

  onSubmit(): void {
    if(this.questionForm.invalid) return;
    if((this.questionForm.value.answer).trim().toLowerCase() === this.answer.trim()) {
      alertUser('¡Recuperación éxitosa!', `Tu contraseña es: ${this.password}`, this.alertController);
      return;
    };
    alertUser('¡Oops!', `Respuesta incorrecta`, this.alertController);
  }

  formInit(): FormGroup {
    return this.formBuilder.group({
      answer: ['', [Validators.required]]
    });
  }
}
