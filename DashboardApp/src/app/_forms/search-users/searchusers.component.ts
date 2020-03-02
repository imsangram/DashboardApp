import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute } from '@angular/router';
import { SearchuserService } from '../../_services/searchuser.service';
import { PagerService } from '../../_services/pager.service';

@Component({
  selector: 'app-SearchUsers',
  templateUrl: './SearchUsers.component.html'
})
export class SearchUsersComponent {


  txtSearch: string;
  txtSearchChanged: Subject<string> = new Subject<string>();
  users: any[] = [];
  private _userSearchService: SearchuserService
  private _pagerService: PagerService

  //default values
  perPage: number = 10;
  pageNumber: number = 1;
  // pager object
  pager: any = {};
  // paged items
  pagedItems: any[];
  totalCount: number;


  constructor(
    private userSearchService: SearchuserService,
    private pagerService: PagerService,
    private route: ActivatedRoute,
    private router: Router) {
    this._userSearchService = userSearchService;
    this.txtSearchChanged
      .debounceTime(1200)
      .distinctUntilChanged()
      .subscribe(model => {
        //this.txtSearch = model;
        this.getUsers(model, this.perPage, this.pageNumber);
        // console.log(this.txtQuery);
        this.setPage(this.pageNumber);
      });
  }

  instantSearch(search: string) {
    this.txtSearchChanged.next(search);
  }

  getUsers(searchQuery: string, perPage: number, pageNumber: number) {
    this.users = [];
    this._userSearchService.search(searchQuery, perPage, pageNumber)
      //.flatMap((data) => data.json()['items']).
      .subscribe((data) => {
        this.totalCount = data.json()['total_count'];
        this.totalCount = 1000; // Adding this limit due to Github API limit which allows only first 100 data to be used
        this.users = data.json()['items'];
      });
  }

  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }
    // get pager object from service
    this.pager = this.pagerService.getPager(this.totalCount, page);
    // get current page of items
    this.pagedItems = this.users.slice(this.pager.startIndex, this.pager.endIndex + 1);
    if (this.users.length > 0) {
      this.getUsers(this.txtSearch, this.perPage, this.pager.currentPage);
    }
    //getUsers(1)
  }

  openUserProfile(user) {
    this.router.navigateByUrl('/user/' + user);
  }
}