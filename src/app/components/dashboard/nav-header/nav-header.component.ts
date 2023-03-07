import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-header',
  templateUrl: './nav-header.component.html',
  styleUrls: ['./nav-header.component.css'],
})
export class NavHeaderComponent {
  constructor(private router: Router) {}

  goToDashboard() {
    console.log('route');
    this.router.navigate(['home']);
  }
}
