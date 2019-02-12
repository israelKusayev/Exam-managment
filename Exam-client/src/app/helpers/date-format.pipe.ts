import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    return moment(value).format('DD/MM/YYYY');
  }
}
