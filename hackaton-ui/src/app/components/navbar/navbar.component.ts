import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  username: string = '';
  userIconUrl: string = 'assets/icon/user.png';

  ngOnInit(): void {
    this.username = sessionStorage.getItem('username') || 'Usuário';
  }
}