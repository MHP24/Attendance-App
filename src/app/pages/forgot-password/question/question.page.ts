import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { alertUser } from 'src/app/helpers/alertHandler';
import { StorageHandlerService } from 'src/app/services/storage-handler.service';

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

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly alertController: AlertController,
    private readonly storageService: StorageHandlerService) { }

  ngOnInit() {
    this.storageService.get('REQUEST_DATA').then((res: string) => {
      const {username, question, answer, password } = JSON.parse(res)[0];
      this.username = username;
      this.question = question;
      this.answer = answer;
      this.password = password;
    });
    this.questionForm = this.formInit();
  }

  onSubmit(): void {
    if(this.questionForm.invalid) return;
    if((this.questionForm.value.answer).trim() === this.answer.trim()) {
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
