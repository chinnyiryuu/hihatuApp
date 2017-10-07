import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
//import 'rxjs/add/operator/map';

/*
  Generated class for the RestProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class RestProvider {
  private apiUrl = 'http://192.168.1.22:8080/ad/';

  getCountries(): Observable<string[]> {
    return this.http.get(this.apiUrl)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getCountriesSc(): Observable<string[]> {
    return this.http.get(this.apiUrl).map(this.extractDataSc);
  }

  getDataImag(): Observable<string[]> {
    return this.http.get(this.apiUrl).map(this.extractDataImag);
  }

  private extractData(res: Response) {
    var body = res.json();
    console.log(body || {})
    return body || {};
  }

  private extractDataSc(res: Response) {
    var bodys = new Array(res.json());
    var languages = new Array();
    var images = new Array();
    // for(let o in bodys || {}){
    //   var d = new Array(bodys[o])
    //   for (let s in d) {
    //     //console.log(d[s]["languages"]);
    //     var a = new Array(d[s]["data"])
    //     console.log(a);
    //     console.log(a[0].length);
    //     //languages.splice(0,0,a[0][0]) ;
    //     for (var i = 0; i < a[0].length; i++) {
    //       console.log(a[0][i]["nativeName"]);
    //       languages.splice(0,0,a[0][i]) ;
    //     }
    //   }
    // }
     for(let o in bodys){
      var d = new Array(bodys[o])
      for (let s in d) {
        var a = new Array(d[s]["data"])
        console.log(a);
        console.log(a[0].length);
        //languages.splice(0,0,a[0][0]) ;
        for (var i = 0; i < a[0].length; i++) {
          for(var l = 0; l<a[0][i]["images"].length; l++ ){
            console.log(a[0][i]["images"][l]["src"]);
            images.splice(0,0,a[0][i]["images"][l])
          }
          languages.splice(0,0,a[0][i]) ;
        }
      }
    }
    console.log("languages : "+languages || {})
    return languages || {} ;
  }

 private extractDataImag(res: Response){
    var bodys = new Array(res.json());
    var images = new Array();
     for(let o in bodys){
      var d = new Array(bodys[o])
      for (let s in d) {
        var a = new Array(d[s]["data"])
        for (var i = 0; i < a[0].length; i++) {
          for(var l = 0; l<a[0][i]["images"].length; l++ ){
            images.splice(0,0,a[0][i]["images"][l]["src"])
          }
        }
      }
    }
    console.log("images : "+images || {})
    return images || {} ;
 }

  private handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }


  constructor(public http: Http) {
    console.log('Hello RestProvider Provider');
  }

}
