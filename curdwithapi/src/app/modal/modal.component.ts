import { Component, Input, OnInit, SimpleChanges, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ImageInfo } from '../models/image-info.model';
import { ImagemanagerService } from '../imagemanager.service';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'] // Corrected from styleUrl to styleUrls
})
export class ModalComponent implements OnInit, OnChanges {
  @Input() itemData!: ImageInfo;
  itemForm!: FormGroup;
  isAdded: boolean = true;

  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private service: ImagemanagerService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    if (this.itemData && this.itemData.id > 0) {
      this.isAdded = false;
    }
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['itemData'] && this.itemData) {
      this.initializeForm(); // Reinitialize the form if itemData changes
    }
  }

  private initializeForm(): void {
    this.itemForm = this.fb.group({
      name: [this.itemData?.name || '', Validators.required],
      description: [this.itemData?.description || '', Validators.required],
      imageUrl: [
        this.itemData?.url || '',
        [Validators.required ]],
    });
  }

  onSubmit(): void {
    if (this.itemForm.valid) {
      this.itemData.name = this.itemForm.value.name;
      this.itemData.description = this.itemForm.value.description;
      this.itemData.url = this.itemForm.value.imageUrl;
      this.itemData.createdOn=new Date()

      if (this.isAdded) {
        this.service.PostImages(this.itemData).subscribe(
          () => {
            alert('Added Successfully');
            this.activeModal.close(this.itemForm.value);
          },
          (error) => {
            console.error('Error adding image:', error);
            alert('Failed to add image. Please try again.');
          }
        );
      } else {
        this.service.UpdateImage(this.itemData.id, this.itemData).subscribe(
          () => {
            alert('Updated Successfully');
            this.activeModal.close(this.itemForm.value);
          },
          (error) => {
            console.error('Error updating image:', error);
            alert('Failed to update image. Please try again.');
          }
        );
      }
    } 
  }
}
