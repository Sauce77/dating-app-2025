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
  cancelRegister = output<boolean>();

  register(): void{
    console.log(this.creds);
  }

  cancel(): void{
    this.cancelRegister.emit(false);
  }
}

