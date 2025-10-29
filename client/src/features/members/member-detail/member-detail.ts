import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { Member } from '../../../types/member';
import { filter, Observable } from 'rxjs';
import { MembersService } from '../../../core/service/members-service';

@Component({
  selector: 'app-member-detail',
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './member-detail.html',
  styleUrl: './member-detail.css'
})
export class MemberDetail implements OnInit {
  private membersService = inject(MembersService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  protected member = signal(<Member | undefined>(undefined))
  protected title = signal<string|undefined>("Profile");

  ngOnInit(): void {
    this.route.data.subscribe({
      next: data => this.member.set(data["member"])
    });

    this.title.set(this.route.firstChild?.snapshot?.title);

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe({
        next: () => {
          this.title.set(this.route.firstChild?.snapshot?.title);
        }
      }
    )
  }

}