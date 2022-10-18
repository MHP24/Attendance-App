import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { findEmail } from 'src/app/helpers/userHandler';
import { UserI } from 'src/app/interfaces/user.interface';
import { alertUser } from 'src/app/helpers/alertHandler';
import { DatabaseHandlerService } from 'src/app/services/database-handler.service';
import { StorageHandlerService } from 'src/app/services/storage-handler.service';

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
    private readonly alertController: AlertController,
    private readonly databaseService: DatabaseHandlerService,
    private readonly storageService: StorageHandlerService) { }

  ngOnInit() {
    this.emailForm = this.formInit();
    this.storageService.clear();
  }

  formInit(): FormGroup {
    return (this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    }));
  }

  onSubmit() {
    if(this.emailForm.invalid) return;
    this.databaseService.selectUser(this.emailForm.value.email).then((res) => {
      if(res.length > 0) {
        this.storageService.set('REQUEST_DATA', JSON.stringify(res))
        this.router.navigate(['/question']);
        return;
      }
      alertUser('Error al encontrar usuario', 'El usuario no existe', this.alertController);
    });
  }

}
