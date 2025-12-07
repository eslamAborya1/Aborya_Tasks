import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { Post } from '../../models/post';
import { NgIf, NgFor } from '@angular/common';
import { PostService } from '../../services/post';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './post-list.html',
  styleUrl:'./post-list.css'
})
export class PostList implements OnInit {
  posts: Post[] = [];
  loading = false;
  error = '';

  constructor(private postService: PostService, private router: Router) {}

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.loading = true;
    this.postService.getAll().subscribe({
      next: data => { this.posts = data; this.loading = false; },
      error: err => { this.error = 'Error'; this.loading = false; }
    });
  }

  deletePost(id?: number) {
    if (!id) return;
    if (!confirm('Are you Sure?')) return;
    this.postService.delete(id).subscribe({
      next: () => {
        this.posts = this.posts.filter(p => p.id !== id);
      },
      error: () => alert('Error')
    });
  }

  goToDetail(id?: number) {
    if (!id) return;
    this.router.navigate(['/posts', id]);
  }
}
