import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tags'
})
export class TagsPipe implements PipeTransform {
  transform(value: string, args?: any): any {
    const tags = value.split(',');
    let returnStr = '';
    tags.forEach((tag, i) => {
      if (i === 0) {
        returnStr += tag;
      } else {
        returnStr += ' | ' + tag;
      }
    });
    return returnStr;
  }
}
