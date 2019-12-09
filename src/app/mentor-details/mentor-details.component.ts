import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';
import { Mentor } from '../site/mentor';
import { Skill } from '../site/Skill';
import { SkillService } from '../service/skill.service';
import { Mentor_Skill } from '../site/Mentor_Skill';

@Component({
  selector: 'app-mentor-details',
  templateUrl: './mentor-details.component.html',
  styleUrls: ['./mentor-details.component.css']
})
export class MentorDetailsComponent implements OnInit {

  addDetails: FormGroup;
  mentor: Mentor;

  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router, private skillService:SkillService) { }

  get linkedinUrl() {
    return this.addDetails.get('userid');
  }
  get yearsOfExperience() {
    return this.addDetails.get('yearsOfExperience');
  }

  ngOnInit() {
    this.addDetails = this.formBuilder.group({
      linkedinUrl: ['', [
        Validators.required,
      ]],
      yearsOfExperience: ['', [
        Validators.required
      ]],

    })
  }


  addMentorDetails() {
    this.mentor = {
      id: null,
      linkedinUrl: this.addDetails.value['linkedinUrl'],
      yearsOfExperience: this.addDetails.value['yearsOfExperience'],
      user: this.userService.mentor.user
    };

    this.userService.addMentor(this.mentor).subscribe(data => {
      window.alert("Mentor Details Added Successfully")
      this.router.navigate(['addSkill'])
      
    },
      error => {
        console.log(error);
      }
    );
  }

}
