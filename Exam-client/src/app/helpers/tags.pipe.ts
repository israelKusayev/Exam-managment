import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tags'
})
export class TagsPipe implements PipeTransform {
  transform(value: string): any {
    return value
      ? value
          .split(',')
          .join(' | ')
          .trim()
      : null;
  }
}
