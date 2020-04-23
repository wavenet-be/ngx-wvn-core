In order to avoid UTC date transformation during http request (PUT & POST), simply configure the `UtcDateTransformInterceptor` in the `providers` section of the `AppModule` of your application.
```
    providers: [
        ...
        {
            provide: HTTP_INTERCEPTORS,
            useClass: UtcDateTransformInterceptor,
            multi: true
        }
        ...
    ]
``` 
