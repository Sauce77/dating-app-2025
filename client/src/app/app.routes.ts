import { Routes } from '@angular/router';
import { Home } from '../features/home/home';
import { MemberDetail } from '../features/members/member-detail/member-detail';
import { Lists } from '../features/lists/lists';
import { Messages } from '../features/messages/messages';
import { MemberList } from '../features/members/member-list/member-list';
import { authGuard } from '../core/guard/auth-guard';
import { TestErrors } from '../features/test-errors/test-errors';
import { NotFound } from '../shared/errors/not-found/not-found';
import { ServerError } from '../shared/errors/server-error/server-error';
<<<<<<< HEAD
=======
import { MemberProfile } from '../features/member-profile/member-profile';
import { MemberPhotos } from '../features/member-photos/member-photos';
import { memberResolver } from '../features/members/member-resolver';
>>>>>>> parcial03

export const routes: Routes = [
    {path: "", component: Home },
    {path: "", 
        runGuardsAndResolvers: "always",
        canActivate: [authGuard],
        children: [
            {path: "members", component: MemberList, canActivate: [authGuard] },
<<<<<<< HEAD
            {path: "members/{id}", component: MemberDetail },
=======
            {path: "members/:id", component: MemberDetail,
                resolve: { member: memberResolver },
                runGuardsAndResolvers: "always",
                children: [
                    { path: "", redirectTo: "profile", pathMatch: "full" },
                    { path: "profile", component: MemberProfile, title: "Profile" },
                    { path: "photos", component: MemberPhotos, title: "Photos" },
                    { path: "messages", component: Messages, title: "Messages" },
                ]
             },
>>>>>>> parcial03
            {path: "list", component: Lists },
            {path: "messages", component: Messages },
        ]
    },
    {path: "errors", component: TestErrors },
    {path: "server-error", component: ServerError },
    {path: "**", component: NotFound },

];