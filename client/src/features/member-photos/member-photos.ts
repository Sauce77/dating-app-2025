import { Component, inject, signal, OnInit } from '@angular/core';
import { MembersService } from '../../core/service/members-service';
import { ActivatedRoute } from '@angular/router';
import { Photo } from '../../types/member';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { ImageUpload } from '../../shared/image-upload/image-upload';

@Component({
  selector: 'app-member-photos',
  imports: [AsyncPipe, ImageUpload],
  templateUrl: './member-photos.html',
  styleUrl: './member-photos.css'
})
export class MemberPhotos implements OnInit{
  protected membersService = inject(MembersService);
  private route = inject(ActivatedRoute);
  protected photos = signal<Photo[]>([]);
  protected loading = signal(false);

  ngOnInit(): void {
    const memberId = this.route.parent?.snapshot.paramMap.get("id");
    if (memberId) {
      this.membersService.getPhotos(memberId).subscribe({
        next: photos => this.photos.set(photos)
      });
    }
  }

  get photoMocks() {
    return Array.from({ length: 0 }, (_, i) => ({
      url: "./user.png"
    }));
  }

  onUploadImage(file: File){
    this.loading.set(true);
    this.membersService.uploadPhoto(file).subscribe({
      next: photo => {
        this.membersService.editMode.set(false);
        this.loading.set(false);
        this.photos.update(photos => [...photos, photo]);
      },
      error: error => {
        console.log("Erreur pendant le chargement de l'image");
        this.loading.set(false);
      }
    })
  }
}