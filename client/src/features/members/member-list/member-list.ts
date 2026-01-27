<<<<<<< HEAD
import { Component } from '@angular/core';

@Component({
  selector: 'app-member-list',
  imports: [],
=======
import { Component, inject } from '@angular/core';
import { MembersService } from '../../../core/service/members-service'
import { Member } from '../../../types/member';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { MemberCard } from "../member-card/member-card";

@Component({
  selector: 'app-member-list',
  imports: [AsyncPipe, MemberCard],
>>>>>>> parcial03
  templateUrl: './member-list.html',
  styleUrl: './member-list.css'
})
export class MemberList {
<<<<<<< HEAD

}
=======
  private membersService = inject(MembersService);
  protected members$: Observable<Member[]>;

  constructor() {
    this.members$ = this.membersService.getMembers();
  }
}
>>>>>>> parcial03
