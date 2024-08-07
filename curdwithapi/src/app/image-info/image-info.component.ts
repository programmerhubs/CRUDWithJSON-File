import { ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ImageInfo } from '../models/image-info.model';
import { CommonModule } from '@angular/common';
import { ImagemanagerService } from '../imagemanager.service';
import { ButtonComponent } from "../button/button.component";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../modal/modal.component';

import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-image-info',
  standalone: true,
  imports: [CommonModule, ButtonComponent, FormsModule],
  templateUrl: './image-info.component.html',
  styleUrls: ['./image-info.component.css']
})
export class ImageInfoComponent implements OnInit, OnChanges {
  @Input() data: ImageInfo[] = [];
  filteredData: ImageInfo[] = [];
  searchQuery: string = '';
  page: number = 1;
  pageSize: number = 10; 
  totalItems: number = 0;
  pageSizes: number[] = [5, 10, 20];
  constructor(
 
    private service: ImagemanagerService,
    private cd: ChangeDetectorRef,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {

    this.filteredData = this.data;
    
    this.totalItems = this.filteredData.length;
    this.updatePaginatedData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      this.filteredData = this.data;
      this.totalItems = this.filteredData.length;
      this.page = 1;
      this.updatePaginatedData();
      this.cd.detectChanges();
    }
  }

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.pageSize);
  }

  changePage(newPage: number): void {
    if (newPage >= 1 && newPage <= this.totalPages) {
      this.page = newPage;
      this.updatePaginatedData();
    }
  }

  changePageSize(newSize: number): void {
    this.pageSize = newSize;
    this.page = 1;
    this.updatePaginatedData();
  }

  get paginatedData(): ImageInfo[] {
    const start = (this.page - 1) * this.pageSize;
    return this.filteredData.slice(start, start + this.pageSize);
  }

  updatePaginatedData(): void {
    this.cd.detectChanges();
  }

  searchImages(): void {
    this.filteredData = this.data.filter(image =>
      image.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
    this.totalItems = this.filteredData.length;
    this.page = 1;
    this.updatePaginatedData();
  }

  Edit(id: any): void {
    const imageData = this.data.find(x => x.id === id);
    if (imageData) {
      const modalRef = this.modalService.open(ModalComponent);
      modalRef.componentInstance.itemData = imageData;
      modalRef.result.then(() => {
        this.allImage();
      }, () => {
        // Handle dismiss
      });
    }
  }

  Delete(id: any): void {
    this.service.DeleteImage(id).subscribe(() => {
      
        alert( 'Deleted Successfully');
       
      this.allImage();
    });
  }

  allImage(): void {
    this.service.getImages().subscribe(images => {
      this.data = images;
      this.filteredData = this.data;
      this.totalItems = this.filteredData.length;
      this.page = 1;
      this.updatePaginatedData();
    });
  }
}