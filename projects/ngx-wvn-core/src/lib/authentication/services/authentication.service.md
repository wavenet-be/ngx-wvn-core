You have to provide the current user at startup or login phase of your application. Here is an example:
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
