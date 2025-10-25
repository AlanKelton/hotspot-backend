import { Routes } from '@angular/router';
import { RegisterComponent } from './auth/register/register.component';
import {LayoutComponent} from "./layout/layout/layout.component";
import {HomeComponent} from "./home/home.component";
import {InviteComponent} from "./invite/invite.component";
import {InviteOptionsComponent} from "./invite/invite-options/invite-options.component";
import {FriendsComponent} from "./friendship/friends/friends.component";

export const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: 'home', component: HomeComponent },
            { path: 'invites', component: InviteComponent },
            { path: 'invite-options/:code', component: InviteOptionsComponent },
            { path: 'friends', component: FriendsComponent },
            { path: '', redirectTo: 'home', pathMatch: 'full' }
        ]
    },
    { path: 'register', component: RegisterComponent }, // registro fora do layout
];
