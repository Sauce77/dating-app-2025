import { Routes } from '@angular/router';
import { Home } from '../features/home/home';
import { MemberDetail } from '../features/members/member-detail/member-detail';
import { Lists } from '../features/lists/lists';
import { Messages } from '../features/messages/messages';
import { MemberList } from '../features/members/member-list/member-list';
import { authGuard } from '../core/guard/auth-guard';

export const routes: Routes = [
    {path: "", component: Home },
    {path: "", 
        runGuardsAndResolvers: "always",
        canActivate: [authGuard],
        children: [
            {path: "members", component: MemberList, canActivate: [authGuard] },
            {path: "members/{id}", component: MemberDetail },
            {path: "list", component: Lists },
            {path: "messages", component: Messages }
        ]
    },
    {path: "**", component: Home },
];