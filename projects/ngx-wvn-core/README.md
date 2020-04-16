# ngx-wvn-core
Wavenet core library for Angular application.

## Features

### Demo
A demo application is available on [GitHub](https://github.com/wavenet-be/wvn-angular-demo).

### Authentication
#### Role-based route access validation
In order to protect a certain route of your application, you can use the `AuthenticationGuard`. Go to your routing module and edit the route as follow:  
```
{
    path: 'path-of-you-component',
    component: ComponentClassName,
    canLoad: [AuthenticationGuard],
    canActivate: [AuthenticationGuard],
    data: {
      roles: ['FIRST_ALLOWED_ROLE','SECOND_ALLOWED_ROLE']
    }
  }
```

You have to provide the current user to the `AuthenticationService` to make it work. Here is an example:
```
this.authenticationService.user.next({
    roles: ['TEST_ROLE']
});
``` 

To retrieve the current user, use the service as follow:
```
this.authenticationService.user.subscribe(user => {
  if(user == null){
    console.log('anonymous');
  }else{
    console.log('logged');
  }
});
``` 

## Getting started
Install NPM dependency by using this command:
````
npm install -s wavenet-be/ngx-wvn-core
````
