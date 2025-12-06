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
        
        },
        error: (e) => console.error('Error loading posts:', e)
      });
  }

   savePost(): void {
    if (this.editingPost && this.currentPost.id) {
      // Update existing post
      this.postService.update(this.currentPost.id, this.currentPost)
        .subscribe({
          next: (response) => {
            const index = this.posts?.findIndex(p => p.id === this.currentPost.id);
            if (index !== undefined && index !== -1 && this.posts) {
              this.posts[index] = { ...this.currentPost };
            }
             alert('Post edit successfully');
            this.resetForm();
          },
          error: (e) => console.error('Error updating post', e)
        });
    } else {
      // Create new post
      this.postService.create(this.currentPost)
        .subscribe({
          next: (response) => {
            if (this.posts) {
              this.posts.push(response);
            } else {
              this.posts = [response];
            }
         //   console.log('Post created successfully', response);
           alert('Post created successfully');
            this.resetForm();
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