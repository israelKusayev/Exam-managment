import { ToastrService } from 'ngx-toastr';
import { ErrorHandler, Inject, Injector, Injectable } from '@angular/core';

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
    this.toastrService.error('An unexpected error occurred.', 'Error', {
      onActivateTick: true
    });
    super.handleError(error);
  }
}
