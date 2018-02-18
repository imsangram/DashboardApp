import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent, LoginComponent, RegisterComponent, DashboardComponent, SearchUsersComponent, UserProfileComponent, AddUserComponent } from './_forms/index';

import { AuthGuard } from './_guards/index';


const routes: Routes = [
    { path: '', component: DashboardComponent, canActivate: [AuthGuard], pathMatch: 'full', data: { title: 'My Home' }},
    { path: 'home', component: HomeComponent, data: { title: 'Home' } },
    { path: 'dashboard', component: DashboardComponent, data: { title: 'My Dashboard' } },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'searchusers', component: SearchUsersComponent },
    { path: 'user/:username', component: UserProfileComponent },
    { path: 'adduser', component: AddUserComponent },
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
    
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }