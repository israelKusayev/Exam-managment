import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ellipsis'
})
export class EllipsisPipe implements PipeTransform {
  transform(value: string, maxLen: number): any {
    return value
      ? value.length > maxLen
        ? value.slice(0, maxLen) + '...'
        : value
      : null;
  }
}
