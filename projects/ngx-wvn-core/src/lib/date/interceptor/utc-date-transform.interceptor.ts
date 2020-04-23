import {HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {DecimalPipe} from '@angular/common';

@Injectable()
export class UtcDateTransformInterceptor implements HttpInterceptor {

  public constructor(private pipe: DecimalPipe) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (req.method === 'POST' || req.method === 'PUT') {
      this.shiftDates(req.body);
    }
    return next.handle(req);
  }

  shiftDates(body) {
    if (body === null || body === undefined) {
      return body;
    }

    if (typeof body !== 'object') {
      return body;
    }

    for (const key of Object.keys(body)) {
      const value = body[key];
      if (value instanceof Date) {
        body[key] = `${value.getFullYear()}-${this.pipe.transform(value.getMonth() + 1, "2.0-0")}-${this.pipe.transform(value.getDate(), "2.0-0")}`;
      } else if (typeof value === 'object') {
        this.shiftDates(value);
      }
    }
  }
}
