import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'odataDateFormat'
})
export class OdataDateFormatPipe implements PipeTransform {

  transform(value: any): Date {
    var customDate = new Date(value.match(/-?\d+/)[0] * 1);
    return customDate;
  }

}
