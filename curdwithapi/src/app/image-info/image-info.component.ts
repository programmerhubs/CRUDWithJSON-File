import { ChangeDetectorRef, Component, input, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ImageInfo } from '../models/image-info.model';
import { CommonModule } from '@angular/common';
import { ImagemanagerService } from '../imagemanager.service';
import { ButtonComponent } from "../button/button.component";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-image-info',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './image-info.component.html',
  styleUrl: './image-info.component.css'
})
export class ImageInfoComponent implements OnInit,OnChanges {
  @Input() data:ImageInfo[]=[]
  


  isAdded:boolean=true
  constructor(private service:ImagemanagerService,private cd :ChangeDetectorRef,private modalservice:NgbModal)
  {
   
  }
  ngOnInit(): void {
    console.log("Child Components"+this.data)
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      console.log('Images updated in child:', changes['data'].currentValue);
      this.cd.detectChanges();
      
    }
  }
 
  Edit(id:any)
  {
    var imagedataval=this.data.filter(x=>x.id==id);
    console.log("Edit data" ,typeof(imagedataval[0]))
    const modalRef = this.modalservice.open(ModalComponent);
    modalRef.componentInstance.itemData=imagedataval[0];
    modalRef.result.then((result) => {
      console.log('Modal closed with result:', result);
    }, (reason) => {
      console.log('Modal dismissed with reason:', reason);
    });

  }
  Delete(id:any)
  {
    this.service.DeleteImage(id).subscribe(x=>
    {
      alert('Image Deleted')
    }
    )
  }
  allImage()
  {
    this.service.getImages().subscribe(x=>{
      this.data=x;
    });
  }

}
