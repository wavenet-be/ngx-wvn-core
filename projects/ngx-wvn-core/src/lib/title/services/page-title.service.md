To set page title based on the route, go to your route definitions and define a title for each route:
```
{
    path: 'path-of-the-route',
    component: ComponentClassName,
    data: {
      title: '[MY_TITLE]'
    }
  }
```

Then initialize the `PageTitleService` at application startup:
```
ngOnInit(): void {
  this.pageTitleService.init();
}
```
