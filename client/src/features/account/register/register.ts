import { Component, inject, OnInit, output } from '@angular/core';
import { RegisterCreds } from '../../../types/users';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { AccountService } from '../../../core/service/account-service';
import { JsonPipe } from '@angular/common';
import { ValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, JsonPipe],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register implements OnInit {
  private accountService = inject(AccountService);
  protected creds = {} as RegisterCreds;
  protected registerForm: FormGroup = new FormGroup({});
  cancelRegister = output<boolean>();

  private readonly EMAIL_REGEX = '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$';
  
  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.registerForm = new FormGroup({
      email: new FormControl('name@email.com', 
        [Validators.required, Validators.pattern(this.EMAIL_REGEX)]
      ),
      displayName: new FormControl('', 
        [Validators.required]
      ),
      password: new FormControl('', 
        [
          Validators.required, 
          Validators.minLength(4), 
          Validators.maxLength(10)
        ]
      ),
      confirmPassword: new FormControl('',
        [Validators.required, this.matchValues('password')]
      )
    });
    this.registerForm.controls['password'].valueChanges.subscribe(() => {
      this.registerForm.controls['confirmPassword'].updateValueAndValidity();
    })
  }

  matchValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const parent = control.parent;
      if (!parent) return null;
      const matchValue = parent.get(matchTo)?.value;
      return control.value === matchValue ? null : { passwordMissmatch: true };
    }
  }

  register(): void {
    console.group("REGISTER");
    console.log(this.registerForm.value);
    console.groupEnd();
    //this.accountService.register(this.creds).subscribe({
    //  next: response => {
    //    console.log(response);
    //    this.cancel();
    //  },
    //  error: error => console.log(error)
    //});
  }
  
  cancel(): void {
    this.cancelRegister.emit(false);
  }
}