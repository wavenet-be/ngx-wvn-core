import {HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {DecimalPipe} from '@angular/common';

@Injectable()
export class UtcDateTransformInterceptor implements HttpInterceptor {

  /**
   * Create a new UTC date transform interceptor
   * @param pipe
   */
  public constructor(private pipe: DecimalPipe) {
  }

  /**
   * Intercept the HTTP request (POST & PUT) and convert UTC dates in body
   * @param req
   * @param next
   */
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (req.method === 'POST' || req.method === 'PUT') {
      this.convertDates(req.body);
    }
    return next.handle(req);
  }

  /**
   * Convert dates in the given body
   * @param body
   */
  private convertDates(body) {
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
        this.convertDates(value);
      }
    }
  }
}
