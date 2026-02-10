import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Member } from '../../types/member';
import { DatePipe } from '@angular/common';
import { MembersService } from '../../core/service/members-service';

@Component({
  selector: 'app-member-profile',
  imports: [DatePipe],
  templateUrl: './member-profile.html',
  styleUrl: './member-profile.css'
})
export class MemberProfile {
  private route = inject(ActivatedRoute);
  protected member = signal<Member | undefined>(undefined);
  protected membersService = inject(MembersService)

  ngOnInit(): void {
    this.route.parent?.data.subscribe(data => {
      this.member.set(data["member"]);
    })
  }
}
