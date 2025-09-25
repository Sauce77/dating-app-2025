import { Component, input, Input, output} from '@angular/core';
import { RegisterCreds } from '../../../types/registerCreds';
import { FormsModule } from '@angular/forms';
import { User } from '../../../types/users';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  protected creds = {} as RegisterCreds;

  // Esta es la forma correcta de declarar el input requerido
  public membersFromHome = input.required<User[]>();
  cancelRegister = output<boolean>();

  register(): void{
    console.log(this.creds);
    console.log('Members from home:', this.membersFromHome());
  }

  cancel(): void{
    this.cancelRegister.emit(false);
  }
}

