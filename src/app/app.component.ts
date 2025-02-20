import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'ECommerce';

  constructor(private authService: AuthService) {}

  ngOnInit() {
    // Fetch the user when the app initializes
    this.authService.getUser();
  }
}
