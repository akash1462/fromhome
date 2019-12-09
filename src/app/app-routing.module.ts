import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserSignupComponent } from './site/user-signup/user-signup.component';
import { LoginComponent } from './site/login/login.component';
import { HomeComponent } from './home/home.component';
import { MentorDetailsComponent } from './mentor-details/mentor-details.component';
import { AddSkillComponent } from './add-skill/add-skill.component';


const routes: Routes = [
  { path: 'signup', component: UserSignupComponent },
  { path:'login', component:LoginComponent},
  { path:'home', component:HomeComponent},
  { path:'mentordetails', component:MentorDetailsComponent},
  { path:'addSkill', component:AddSkillComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
