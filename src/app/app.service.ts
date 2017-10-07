import { LoadingController, AlertController, ToastController } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Buffer } from 'buffer';
//import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AppGlobal {
    //缓存key的配置
    static cache: any = {
        slides: "_dress_adventImage",
        categories: "_dress_stores",
        products: "_dress_details"
    }
    //接口基地址
    static domain = "http://192.168.1.39:8888/"
    //接口地址
    static API: any = {
        getAdventImage: 'ad/',
        getStores: 'stores/',
        getUser: 'user/',
        getProducts: 'products/'
    };
}

@Injectable()
export class AppService {
    constructor(public http: Http,
        public loadingCtrl: LoadingController,
        private alertCtrl: AlertController,
        private toastCtrl: ToastController,
        //private storage: Storage
    ) { }

    buildHeaders(params) {
        var baseic = params['username']+":"+params['password'];
        console.log("handers:"+new Buffer(baseic).toString('base64'));
        let headers = new Headers({
            'Content-Type': 'application/json',
            'withCredentials': 'true'
        });
        headers.append('Authorization', 'Basic ' + new Buffer(baseic).toString('base64'));
        return headers;
    }
    httpGet(url, params, callback, loader: boolean = false) {
        console.log("111 "+new Buffer('customer').toString('base64'));
        let loading = this.loadingCtrl.create({});
        if (loader) {
            loading.present();
        }
        this.http.get(AppGlobal.domain + url + this.encode(params))
            .toPromise()
            .then(res => {
                var d = res.json();
                console.log(d)
                if (loader) {
                    loading.dismiss();
                }
                callback(d == null ? "[]" : d);
            })
            .catch(error => {
                if (loader) {
                    loading.dismiss();
                }
                this.handleError(error);
            });
    }
    // get(url,params) {
    //     return Observable
    //         .fromPromise(this.buildHeaders(params))
    //         .switchMap((headers) => this.http.get(AppGlobal.domain + url, { headers: headers }));
    // }

    // 对参数进行编码
    encode(params) {
        var str = '';
        if (params != null) {
            for (var key in params) {
                if (params.hasOwnProperty(key)) {
                    var value = params[key];
                    str += encodeURIComponent(key) + '=' + encodeURIComponent(value) + '&';
                }
            }
            str = '?' + str.substring(0, str.length - 1);
        }
        return str;
    }
    httpPost(url, params, callback, loader: boolean = false) {
        console.log(this.buildHeaders(params));
        let loading = this.loadingCtrl.create();
        if (loader) {
            loading.present();
        }
        alert(params);
        this.http.post(AppGlobal.domain + url, {headers:this.buildHeaders(params)})
            .toPromise()
            .then(res => {
                var d = res.json();
                if (loader) {
                    loading.dismiss();
                }
                callback(d == null ? "[]" : d);
            }).catch(error => {
                if (loader) {
                    loading.dismiss();
                }
                this.handleError(error);
            });
    }
    // httpGetuser(url, params, callback, loader: boolean = false) {
    //     console.log(this.buildHeaders(params));
    //     let loading = this.loadingCtrl.create();
    //     if (loader) {
    //         loading.present();
    //     }
    //     alert(params);
    //     this.http.get(AppGlobal.domain + url ,{headers:this.buildHeaders(params)})
    //         .toPromise()
    //         .then(res => {
    //             var d = res.json();
    //             console.log(d)
    //             if (loader) {
    //                 loading.dismiss();
    //             }
    //             callback(d == null ? "[]" : d);
    //         })
    //         .catch(error => {
    //             if (loader) {
    //                 loading.dismiss();
    //             }
    //             this.handleError(error);
    //         });
    // }

    private handleError(error: Response | any) {
        let msg = '';
        if (error.status == 400) {
            msg = '请求无效(code：404)';
            console.log('请检查参数类型是否匹配');
        }
        if (error.status == 404) {
            msg = '请求资源不存在(code：404)';
            console.error(msg + '，请检查路径是否正确');
        }
        if (error.status == 500) {
            msg = '服务器发生错误(code：500)';
            console.error(msg + '，请检查路径是否正确');
        }
        console.log(error);
        if (msg != '') {
            this.toast(msg);
        }
    }

    alert(message, callback?) {
        if (callback) {
            let alert = this.alertCtrl.create({
                title: '提示',
                message: message,
                buttons: [{
                    text: "确定",
                    handler: data => {
                        callback();
                    }
                }]
            });
            alert.present();
        } else {
            let alert = this.alertCtrl.create({
                title: '提示',
                message: message,
                buttons: ["确定"]
            });
            alert.present();
        }
    }
    toast(message, callback?) {
        let toast = this.toastCtrl.create({
            message: message,
            duration: 2000,
            dismissOnPageChange: true,
        });
        toast.present();
        if (callback) {
            callback();
        }
    }

    setItem(key: string, obj: any) {
        try {
            var json = JSON.stringify(obj);
            window.localStorage[key] = json;
        }
        catch (e) {
            console.error("window.localStorage error:" + e);
        }
    }
    getItem(key: string, callback) {
        try {
            var json = window.localStorage[key];
            var obj = JSON.parse(json);
            callback(obj);
        }
        catch (e) {
            console.error("window.localStorage error:" + e);
        }
    }
}

