import { PostService } from './../../services/post';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Post } from '../../models/post';

@Component({
  selector: 'app-post-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './post-detail.html'
})
export class PostDetail implements OnInit {
  post?: Post;
  loading = false;

  constructor(private route: ActivatedRoute, private postService: PostService, public router: Router) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) return;
    this.loading = true;
    this.postService.getById(+id).subscribe({
      next: p => { this.post = p; this.loading = false; },
      error: () => { alert('Error'); this.loading = false; }
    });
  }
}
