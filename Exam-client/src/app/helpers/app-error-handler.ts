import { BadInput } from './../exceptions/bad-input';
import { ToastrService } from 'ngx-toastr';
import { ErrorHandler, Inject, Injector, Injectable } from '@angular/core';
import { NotFoundError } from '../exceptions/not-found-error';
import { UnauthorizedError } from '../exceptions/unauthroized-error';

@Injectable()
export class AppErrorHandler extends ErrorHandler {
  constructor(@Inject(Injector) private injector: Injector) {
    super();
  }

  // Need to get ToastrService from injector rather than constructor injection to avoid cyclic dependency error
  private get toastrService(): ToastrService {
    return this.injector.get(ToastrService);
  }

  handleError(error: any): void {
    console.log(error);
    if (error instanceof BadInput || error instanceof NotFoundError) {
    } else if (error instanceof UnauthorizedError) {
      this.toastrService.warning('You have been disconnected, please login again.', 'Error', {
        onActivateTick: true
      });
    } else {
      this.toastrService.error('An unexpected error occurred.', 'Error', {
        onActivateTick: true
      });
    }
    super.handleError(error);
  }
}
