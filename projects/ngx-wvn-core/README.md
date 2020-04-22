# ngx-wvn-core
Wavenet core library for Angular application.

## Documentation
A documentation website is available [here](https://wavenet-be.github.io/ngx-wvn-core).

## Demo
A demo application is available [here](https://github.com/wavenet-be/wvn-angular-demo).

## Features
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

You have to provide the current user to the `AuthenticationService` at startup or login phase of your application. Here is an example:
```
this.authenticationService.user.next({
  userId: 'j.doe',
  roles: ['TEST_ROLE'],
  email: 'j.doe@domain.tld',
  firstName: 'John',
  lastName: 'Doe'
})
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

To clear the current user, use the service as follow:
```
this.authenticationService.clear();
``` 

To configure the redirection urls (login required and forbidden access), simply change the values of the service at application startup:
```
this.authenticationService.loginRedirectUrl='/my/login/page';
this.authenticationService.forbiddenRedirectUrl='/my/forbidden/page';
```

## Getting started
Install NPM dependency by using this command:
````
npm install -s @wavenet/ngx-wvn-core
````
