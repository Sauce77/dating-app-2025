import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { MembersService } from '../../core/service/members-service';
import { Router } from '@angular/router'
import { EMPTY } from 'rxjs';
import { Member } from '../../types/member';

export const memberResolver: ResolveFn<Member> = (route, state) => {

  const membersService = inject(MembersService);
  const router = inject(Router);
  const memberId = route.paramMap.get("id");

  if(memberId){
    return membersService.getMember(memberId);
  }

  router.navigateByUrl("/not-found");

  return EMPTY;
};
