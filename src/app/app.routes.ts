import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { authGaurd } from './auth/auth-gaurd.guard';

export const routes: Routes = [
    // {path: '', redirectTo:'/login', pathMatch: 'full'},
    {path: 'login', component: LoginComponent },
    {path: 'home', component: HomeComponent, canActivate: [authGaurd] },
    {path: '**', redirectTo:'/login', pathMatch:'full'}

];
