import { Component, input, Input, output, inject} from '@angular/core';
import { RegisterCreds } from '../../../types/registerCreds';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../../../core/service/account-service';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  protected creds = {} as RegisterCreds;
  cancelRegister = output<boolean>();
  protected accountService = inject(AccountService);

  register(): void {
    this.accountService.register(this.creds).subscribe({
      next: response => {
        console.log(response);
        this.cancel();
      },
      error: error => console.log(error)
    });
  }

  cancel(): void{
    this.cancelRegister.emit(false);
  }
}

