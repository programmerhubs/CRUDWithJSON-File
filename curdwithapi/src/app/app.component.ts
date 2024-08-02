import { Component, NgModuleRef } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ImagemanagerService } from './imagemanager.service';
import { ButtonComponent } from "./button/button.component";
import { ImageInfo } from './models/image-info.model';
import { ImageInfoComponent } from "./image-info/image-info.component";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from './modal/modal.component';
declare var $: any; 

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ButtonComponent, ImageInfoComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  Imagedata:ImageInfo[]=[]
  item!:ImageInfo;

 
  constructor(private service:ImagemanagerService,private modalService: NgbModal)
  {
    this.initializeItem()
    this.GetAllImages()
  }
  GetAllImages()
  {
    this.service.getImages().subscribe(x=>{
      this.Imagedata=x
      
    })
  }
  initializeItem(): void {
    this.item = {
      id: 0, 
      name: '',
      description: '',
      url: '',
      createdOn:new Date()
    };
  }
  AddNew(i:number)
  {
    this.item.id=0;
     const modalRef = this.modalService.open(ModalComponent);
    modalRef.componentInstance.itemData=this.item;
    modalRef.result.then((result) => {
      
      
    }, (reason) => {
     
    });
  }
  
  title = 'curdwithapi';
}
