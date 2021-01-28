import { Pipe, PipeTransform } from '@angular/core';
import { NumberFormat } from '../model/number-format';

@Pipe({
  name: 'safeNumber'
})
export class SafeNumberPipe implements PipeTransform {

  transform(input: any, format?: NumberFormat): string {
    let result = input;
    if (!isNaN(input) && format) {
      if (input)
        input = parseFloat(input);
      if (format.isEuro) {
        result = this.formatEuro(input, format.formatBigNumber, format.lang);
      }
      else {
        if (isNaN(format.decimal)) {
          if (Math.abs(input) > 100)
            format.decimal = 0;
          else if (Math.abs(input) < 1) {
            format.decimal = -1 * Math.log10(input) + 1;
            if (format.decimal < 0)
              format.decimal = 0;
            else if (format.decimal > 20)
              format.decimal = 20;
          }
          else
            format.decimal = 2;
        }
        result = parseFloat(input).toFixed(format.decimal);
        if (format.formatBigNumber) {
          result = this.formatBigNumber(result, format.decimal, format.lang);
        }
        else
          result = new Number(result).toLocaleString();
      }
    }
    if (format && format.textAfter)
      result += ' ' + format.textAfter;
    return result;
  }

  private formatEuro(input: any, bigNumber: boolean, lang: string) {
    let result = input;
    const suffix = " \u20AC";

    if (!isNaN(input)) {
      if (bigNumber)
        result = this.formatBigNumber(input, 0, lang);
      else
        result = parseFloat(input).toFixed(2).toString();
    }
    return result.toString().replace(".", ",").replace(/\B(?=(\d{3})+(?!\d))/g, ".") + suffix;

  }

  private formatBigNumber(input: any, decimal: number, lang: string) {
    var output = "";
    if (!lang)
      lang = "it";

    if (!decimal)
      decimal = 0;
    if (input) {
      if (input < 1000)
        output = parseFloat(input).toFixed(decimal);
      else if (input < 1000000)
        output = (input / 1000).toFixed(decimal) + (lang == 'it' ? " mila" : " k");
      else if (input < 1000000000)
        output = (input / 1000000).toFixed(decimal) + (lang == 'it' ? " mln" : " M");
      else
        output = (input / 1000000000).toFixed(decimal).toLocaleString() + (lang == 'it' ? " mld" : " B");
    }
    return ("" + output).replace(".", ",").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

}

