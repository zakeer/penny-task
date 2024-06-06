import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/state/app.state';
import { signup } from '../../auth.actions';
import { Observable } from 'rxjs';
import { LoaderService } from '../../../shared/services/loader.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  signupForm: FormGroup;

  loading$: Observable<boolean>;

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private loaderService: LoaderService
  ) {
    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      isPublic: [false],
      githubLink: [''],
    });
    this.loading$ = this.loaderService.loading$;
  }

  onSubmit() {
    this.store.dispatch(signup({ payload: this.signupForm.value }));
  }
}
