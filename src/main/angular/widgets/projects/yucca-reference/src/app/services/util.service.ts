import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor() { }


  public static formatJsObject(input: string): string {
    let out = "";
    var rx = /"[^"\\]*(?:\\[\s\S][^"\\]*)*"/g;
    //var res = input.match(rx);
    out = input.replace(rx, "<span class='js-attr-value'>$&</span>");
    out = out.replace(/,/g, ",<br><span class='intent-2'>&nbsp;</span>");
    return out;
  }

  public static formatCssSelector(input: string): string {
    let out = "";
    if (input) {
      const s1 = input.split("[ ]");
      for (let i = 0; i < s1.length; i++) {
        if (s1[i]) {
          if (s1[i].startsWith("#"))
            out += "<span class='css-selector-id'>" + s1[i] + "</span>";
          else if (s1[i].startsWith("."))
            out += "<span class='css-selector-class'>" + s1[i] + "</span>";
          else
            out += "<span class='css-selector-tag'>" + s1[i] + "</span>";
        }
      }
    }
    return out;
  }


  public static formatCssValues(input: string): string {
    let out = "";
    if (input) {
      const s1 = input.split(";");
      for (let i = 0; i < s1.length; i++) {
        if (s1[i]) {
          const s2 = s1[i].split(":");
          out += "<span class='css-attr'>" + s2[0] +
            "</span>:<span class='css-attr-value'>" + s2[1] + "</span>;<br>";
        }
      }
    }

    return out;
  }

  public saveFile = function (content: any, filename: string) {
    var file = new Blob([content]);
    var downloadLink = document.createElement("a");
    // File name
    downloadLink.download = filename;
    // Create a link to the file
    downloadLink.href = window.URL.createObjectURL(file);
    // Hide download link
    downloadLink.style.display = "none";
    // Add the link to DOM
    document.body.appendChild(downloadLink);
    // Click download link
    downloadLink.click();
    document.body.removeChild(downloadLink);

    return false;
  };

}

