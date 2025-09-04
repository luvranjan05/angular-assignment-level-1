import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UsersService, User } from '../users.service';

interface SortConfig {
  column: string;
  direction: 'asc' | 'desc';
}

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  filteredUsers: User[] = [];
  paginatedUsers: User[] = [];
  loading = true;
  searchTerm: string = '';
  

  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 0;
  pages: number[] = [];


  sortConfig: SortConfig = { column: '', direction: 'asc' };

  constructor(private userService: UsersService) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe((data: User[]) => {
      this.users = data;
      this.filteredUsers = data;
      this.updatePagination();
      this.loading = false;
    });
  }


  filterUsers(): void {
    if (!this.searchTerm) {
      this.filteredUsers = [...this.users];
    } else {
      const searchLower = this.searchTerm.toLowerCase();
      this.filteredUsers = this.users.filter(user => 
        user.first_name.toLowerCase().includes(searchLower) ||
        user.last_name.toLowerCase().includes(searchLower)
      );
    }
    

    if (this.sortConfig.column) {
      this.sortData(this.sortConfig.column, this.sortConfig.direction);
    }
    
    this.currentPage = 1;
    this.updatePagination();
  }


  clearSearch(): void {
    this.searchTerm = '';
    this.filteredUsers = [...this.users];
    

    if (this.sortConfig.column) {
      this.sortData(this.sortConfig.column, this.sortConfig.direction);
    }
    
    this.currentPage = 1;
    this.updatePagination();
  }


  sortData(column: string, direction: 'asc' | 'desc'): void {
    this.filteredUsers.sort((a, b) => {
      let valueA: any;
      let valueB: any;

      switch (column) {
        case 'first_name':
          valueA = a.first_name.toLowerCase();
          valueB = b.first_name.toLowerCase();
          break;
        case 'last_name':
          valueA = a.last_name.toLowerCase();
          valueB = b.last_name.toLowerCase();
          break;
        case 'age':
          valueA = a.age;
          valueB = b.age;
          break;
        case 'email':
          valueA = a.email.toLowerCase();
          valueB = b.email.toLowerCase();
          break;
        case 'web':
          valueA = a.web.toLowerCase();
          valueB = b.web.toLowerCase();
          break;
        default:
          return 0;
      }


      if (typeof valueA === 'string' && typeof valueB === 'string') {
        return direction === 'asc' 
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      } else {
        return direction === 'asc' 
          ? (valueA > valueB ? 1 : -1)
          : (valueA < valueB ? 1 : -1);
      }
    });

    this.updatePagination();
  }


  onSort(column: string): void {
    if (this.sortConfig.column === column) {
    
      this.sortConfig.direction = this.sortConfig.direction === 'asc' ? 'desc' : 'asc';
    } else {
   
      this.sortConfig = { column, direction: 'asc' };
    }
    
    this.sortData(column, this.sortConfig.direction);
  }


  getSortIcon(column: string): string {
    if (this.sortConfig.column !== column) {
      return '↕'; 
    }
    return this.sortConfig.direction === 'asc' ? '↑' : '↓';
  }


  updatePagination(): void {
    this.totalPages = Math.ceil(this.filteredUsers.length / this.itemsPerPage);
    

    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedUsers = this.filteredUsers.slice(startIndex, endIndex);
    

    this.generatePageNumbers();
  }


  generatePageNumbers(): void {
    const maxVisiblePages = 5;
    let startPage: number, endPage: number;

    if (this.totalPages <= maxVisiblePages) {
      startPage = 1;
      endPage = this.totalPages;
    } else {
      const halfVisible = Math.floor(maxVisiblePages / 2);
      
      if (this.currentPage <= halfVisible + 1) {
        startPage = 1;
        endPage = maxVisiblePages;
      } else if (this.currentPage >= this.totalPages - halfVisible) {
        startPage = this.totalPages - maxVisiblePages + 1;
        endPage = this.totalPages;
      } else {
        startPage = this.currentPage - halfVisible;
        endPage = this.currentPage + halfVisible;
      }
    }

    this.pages = Array.from({length: (endPage - startPage + 1)}, (_, i) => startPage + i);
  }


  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePagination();
    }
  }


  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagination();
    }
  }


  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }


  isPreviousDisabled(): boolean {
    return this.currentPage === 1;
  }


  isNextDisabled(): boolean {
    return this.currentPage === this.totalPages;
  }


  getStartEntry(): number {
    return (this.currentPage - 1) * this.itemsPerPage + 1;
  }


  getEndEntry(): number {
    return Math.min(this.currentPage * this.itemsPerPage, this.filteredUsers.length);
  }
}