import {Component, OnInit,ViewChild, Output, EventEmitter} from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { HostListener } from "@angular/core";
import { FolderService } from 'src/app/services/folder.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { DialogSearchComponent} from '../dialog-search/dialog-search.component';
import { BreadcrumbService } from 'src/app/services/breadcrumb/breadcrumb.service';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  constructor(public authService:AuthService,
    public folderService:FolderService,
    public breadCrumbServices:BreadcrumbService,
    public dialog: MatDialog){}
  screenWidth:number;
  clearIcon = false;
  txtSearch='';
   @Output() onShowMenu = new EventEmitter<any>();
  showMenu(){
    this.onShowMenu.emit();
  }

  clear(){
    this.txtSearch = '';
  }

  @HostListener('window:resize', ['$event'])
  getScreenSize(event?) {
        this.screenWidth = window.innerWidth;
        // console.log( this.screenWidth);
  } 

  openDialog1() {
    this.dialog.open(DialogSearchComponent);
  }
  openDialog() {

    this.dialog.open(DialogComponent);
  }

  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;

  ngOnInit() {
    this.getScreenSize();
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }
  
}
//ádsa


