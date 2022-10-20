import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserI } from 'src/app/interfaces/user.interface';
import { AuthService } from 'src/app/services/auth.service';
import { StorageHandlerService } from 'src/app/services/storage-handler.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm!: FormGroup;
  user: UserI;
  constructor(
    private readonly formBuilder:FormBuilder, 
    private store: StorageHandlerService,
    private authService: AuthService) { }

  ngOnInit() {
    this.loginForm = this.initForm();
  }

  onSubmit(): void {
    if(this.loginForm.invalid) return;
    const { email, password } = this.loginForm.value;
    this.authService.login(email, password);
  }

  initForm(): FormGroup {
    return this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }
}
