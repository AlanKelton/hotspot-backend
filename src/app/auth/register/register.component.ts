import {Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService} from "../auth.service";
import { HttpClientModule} from "@angular/common/http";
import { ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  providers: [AuthService],
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private router: Router,
        private route: ActivatedRoute,) {
    this.registerForm = this.fb.group({
    inviteCode: ['', Validators.required],
    username: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', Validators.required],
    });
    }
    ngOnInit() {
        this.route.queryParams.subscribe(params => {
            if (params['invite']) {
                this.registerForm.patchValue({ inviteCode: params['invite'] });
            }
        });
    }
  get f() {
    return this.registerForm.controls;
  }

  get passwordsMatch(): boolean {
    return this.registerForm.value.password === this.registerForm.value.confirmPassword;
  }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.valid && this.passwordsMatch) {
      const payload = {
        inviteCode: this.registerForm.value.inviteCode,
        username: this.registerForm.value.username,
        email: this.registerForm.value.email,
        password: this.registerForm.value.password
      };
      this.authService.register(payload).subscribe({
          next: () => {
              this.router.navigate(['/home']);
          },
          error: (err: any) => {
              console.error('Register error:', err);
          }
      });
    }
  }
}
