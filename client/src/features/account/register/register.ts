import { Component, inject, OnInit, output, signal } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { AccountService } from '../../../core/service/account-service';
import { RegisterCreds } from '../../../types/users';
import { JsonPipe } from '@angular/common';
import { TextInput } from '../../../shared/input-text/input-text';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule,TextInput],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  private accountService = inject(AccountService);
  private fb = inject(FormBuilder)
  private router = inject(Router)
  protected creds = {} as RegisterCreds;
  protected credentialsForm: FormGroup;
  protected profileForm: FormGroup;
  protected currentStep = signal(1);
  protected validationErrors = signal<string[]>([]);
  cancelRegister = output<boolean>();

  private readonly EMAIL_REGEX = '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$';

  constructor() {
    this.credentialsForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(this.EMAIL_REGEX)]],
      displayName: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
      confirmPassword: ['', [Validators.required, this.matchValues('password')]]
    });

    this.profileForm = this.fb.group({
      gender: ['', [Validators.required]],
      birthDay: ['', [Validators.required]],
      city: ['', [Validators.required]],
      country: ['', [Validators.required]],
    })

    this.credentialsForm.controls['password'].valueChanges.subscribe(() => {
      this.credentialsForm.controls['confirmPassword'].updateValueAndValidity();
    });
  }

  matchValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const parent = control.parent;
      if (!parent) return null;
      const matchValue = parent.get(matchTo)?.value;
      return control.value === matchValue ? null : { passwordMismatch: true };
    }
  }

  nextStep() {
    if(this.credentialsForm.valid) {
      this.currentStep.update(prevStep => prevStep + 1);
    }
  }

  prevStep() {
    this.currentStep.update(prevStep => prevStep - 1);
  }

  getMaxDate() {
    const today = new Date();
    today.setFullYear(today.getFullYear() - 18);
    return today.toISOString().split('T')[0];
  }

  register(): void {

    

    if(this.credentialsForm.valid && this.profileForm.valid) {
      const formData = { ...this.credentialsForm.value, ...this.profileForm.value };
    

      console.groupEnd();
      this.accountService.register(formData).subscribe({
        next: () => {
          this.router.navigateByUrl('/members');
        },
        error: error => {
          this.validationErrors.set(error);
          console.log(error);
        }
      });
    }
  }

  cancel(): void {
    this.cancelRegister.emit(false);
  }
}