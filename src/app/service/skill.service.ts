import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Mentor } from '../site/mentor';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Mentor_Skill } from '../site/Mentor_Skill';

@Injectable({
  providedIn: 'root'
})
export class SkillService {
  url: string = environment.baseUrl ;

  mentor:Mentor = null;

  constructor(private http:HttpClient) { }

  getAllSkills(): Observable<any> {
    return this.http.get(this.url+"user-service/skills");
  }
  
  addMentorSkill(mentorSkill:Mentor_Skill):Observable<any> {
    return this.http.post(this.url+"user-service/addMentorSkill", mentorSkill);
  }


}
