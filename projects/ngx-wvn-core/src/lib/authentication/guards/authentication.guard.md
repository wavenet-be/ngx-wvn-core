To protect a certain route of your application, you can use the `AuthenticationGuard`. Go to your routing module and edit the route as follow:  
```
{
    path: 'path-of-the-route',
    component: ComponentClassName,
    canLoad: [AuthenticationGuard],
    canActivate: [AuthenticationGuard],
    data: {
      roles: ['FIRST_ALLOWED_ROLE','SECOND_ALLOWED_ROLE']
    }
  }
```
