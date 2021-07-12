import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user: FormGroup;
  submittedLogin = false;
  get f() { return this.user.controls; }

  constructor(private api: ApiService, private router: Router) {
    this.user = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {
  }

  login() {
    this.submittedLogin = true;
    if (this.user.valid) {
      this.api.login(this.user.value).subscribe(
        (response) => {
          if (response.state == 'success') {
            this.router.navigateByUrl('/home');
          }
          else {
            alert('No es posible iniciar sesión.');
          }
        }, (err) => {
          console.error(err);
          this.submittedLogin = false;
          alert('Problemas de conexión.');
        });
    }
    else {
      alert('Datos no validos.');
    }
  }

}
