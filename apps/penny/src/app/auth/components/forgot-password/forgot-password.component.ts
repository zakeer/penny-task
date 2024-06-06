import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { LoaderService } from '../../../shared/services/loader.service';
import { AppState } from '../../../store/state/app.state';
import { forgotPassword } from '../../auth.actions';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent {
  forgotPasswordForm: FormGroup;
  loading$: Observable<boolean>;

  constructor(private fb: FormBuilder, private store: Store<AppState>, private loaderService: LoaderService) {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });

    this.loading$ = this.loaderService.loading$;
  }

  onSubmit() {
    if (this.forgotPasswordForm.valid) {
      this.store.dispatch(forgotPassword({ payload: this.forgotPasswordForm.value }));
    }
  }
}
