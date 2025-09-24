import { Component } from '@angular/core';
import { RegisterCreds } from '../../../types/registerCreds';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  protected creds: RegisterCreds = {
    email: '',
    displayName: '',
    password: ''
  };

  register(): void{
    console.log(this.creds);
  }

  cancel(): void{
    console.log("Registro cancelado!");
  }
}

