import {Injectable} from "@angular/core";
import {ActivationEnd, Router} from "@angular/router";
import {Title} from "@angular/platform-browser";

@Injectable({
  providedIn: 'root'
})
export class PageTitleService {

  constructor(private router: Router, private title: Title) {
  }

  init(): void {
    this.router.events.subscribe(event => {
      if (event instanceof ActivationEnd) {
        if (event.snapshot.data.title) {
          this.title.setTitle(event.snapshot.data.title);
        }
      }
    });
  }
}
