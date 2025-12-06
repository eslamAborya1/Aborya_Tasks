import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PostService } from '../../../service/postService';
import { FluidModule } from 'primeng/fluid';

interface Post {
  id?: number | string;
  title: string;
  body: string;
}

@Component({
  selector: 'app-post-list',
  imports: [
    CommonModule,
    FormsModule,
    CardModule, 
    ButtonModule, 
    FluidModule,
    InputTextModule,
  ],
  templateUrl: './post-list.html',
  styleUrl: './post-list.css',
  standalone: true
})
export class PostList {
  posts: Post[] = [];
  currentPost: Post = {
    title: '',
    body: ''
  };
  editingPost: boolean = false;

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.retrievePosts();
  }

  retrievePosts(): void {
    this.postService.getAll()
      .subscribe({
        next: (data) => {
          this.posts = data;
          console.log('Posts loaded:', data);
        },
        error: (e) => console.error('Error loading posts:', e)
      });
  }

  savePost(): void {
    if (this.editingPost && this.currentPost.id !== undefined) {
      // Update existing post
      const postId = this.currentPost.id;
     
      this.postService.update(postId, this.currentPost)
        .subscribe({
          next: (response) => {
            console.log('Post updated successfully', response);
            this.retrievePosts();
            setTimeout(() => this.resetForm(), 1);
          },
          error: (e) => console.error('Error updating post', e)
        }); 
    } else {
      // Create new post
      this.postService.create(this.currentPost)
        .subscribe({
          next: (response) => {
            console.log('Post created successfully', response);
            this.retrievePosts();
            setTimeout(() => this.resetForm(), 0);
          },
          error: (e) => console.error('Error creating post', e)
        });
    }
  }

  editPost(post: Post): void {
    this.currentPost = { ...post };
    this.editingPost = true;
    // Scroll to top to show the form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  deletePost(id: number | string | undefined): void {
    if (!id) {
      console.error('Cannot delete post without ID');
      return;
    }
    
    this.postService.delete(id)
      .subscribe({
        next: () => {
          console.log('Post deleted successfully');
          this.retrievePosts();
        },
        error: (e) => console.error('Error deleting post', e)
      }); 
  }

  cancelEdit(): void {
    this.resetForm();
  }

  private resetForm(): void {
    this.currentPost = {
      title: '',
      body: ''
    };
    this.editingPost = false;
  }
}