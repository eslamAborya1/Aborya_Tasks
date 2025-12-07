import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { userData, UserService } from '../../services/user-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user',
  imports: [FormsModule, CommonModule],
  templateUrl: './user.html',
  styleUrl: './user.css',
})
export class User implements OnInit {
  users: userData[] = [];

  formData: userData = {
    name: '',
    email: '',
    password: '',
    phone: ''
  };

  editUserData: userData | null = null;

  errors: any = {};

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers().subscribe(data => {
      this.users = [...data];
    });
  }

  validate(): boolean {
    this.errors = {}; 

    if (!this.formData.name || this.formData.name.trim().length < 3) {
      this.errors.name = "Name must be at least 3 characters";
    } else if (this.formData.name.length > 20) {
      this.errors.name = "Name must not exceed 20 characters";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!this.formData.email) {
      this.errors.email = "Email is required";
    } else if (!emailRegex.test(this.formData.email)) {
      this.errors.email = "Invalid email format";
    }

    const passRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{6,}$/;

    if (!this.formData.password) {
      this.errors.password = "Password is required";
    } else if (!passRegex.test(this.formData.password)) {
      this.errors.password =
        "Password must contain capital letter, number, symbol and ≥ 6 chars";
    }

    const phoneRegex = /^01[0-9]{9}$/;

    if (!this.formData.phone) {
      this.errors.phone = "Phone is required";
    } else if (!phoneRegex.test(this.formData.phone)) {
      this.errors.phone = "Phone must start with 01 followed by 9 digits";
    }

    return Object.keys(this.errors).length === 0;
  }


  onSubmit(form: NgForm) {

    if (!this.validate()) {
      return;
    }

    if (this.editUserData) {
      const updated: userData = {
        ...this.formData,
        id: this.editUserData.id
      };

      this.userService.updateUser(updated).subscribe(() => {
        this.resetForm(form);
        this.loadUsers();
      });

    } else {
      this.userService.addUser(this.formData).subscribe(() => {
        this.resetForm(form);
        this.loadUsers();
      });
    }
  }


  editUser(user: userData) {
    this.editUserData = { ...user };
    this.formData = { ...user };
    this.errors = {}; 
  }


  deleteUser(id: number) {
    this.userService.deleteUser(id).subscribe(() => {
      this.loadUsers();
    });
  }


  resetForm(form: NgForm) {
    form.resetForm();

    this.formData = {
      name: '',
      email: '',
      password: '',
      phone: ''
    };

    this.editUserData = null;
    this.errors = {};
  }
}
