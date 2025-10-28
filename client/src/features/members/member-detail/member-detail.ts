import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { Member } from '../../../types/member';
import { Observable } from 'rxjs';
import { MembersService } from '../../../core/service/members-service';

@Component({
  selector: 'app-member-detail',
  imports: [AsyncPipe, RouterLink, RouterLinkActive],
  templateUrl: './member-detail.html',
  styleUrl: './member-detail.css'
})
export class MemberDetail implements OnInit {
  private membersService = inject(MembersService);
  private route = inject(ActivatedRoute);
  protected member$?: Observable<Member>;

  ngOnInit(): void {
    this.member$ = this.loadMember();
  }

  loadMember(): Observable<Member> | undefined {
    const id = this.route.snapshot.paramMap.get("id");

    if (id) {
      return this.membersService.getMember(id);
    }

    return;
  }
}