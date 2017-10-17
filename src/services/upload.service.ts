import {Injectable, Inject} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
/*
@Injectable()
export class UploadService {
    static get parameters(){
        return [Http];
    }
    
    constructor(http){
        this.http = http;
        
    }
    
    getImage(){
        return this.http.get('http://192.168.1.12:8080/UploadPhoto/Photos')
            .map(res => res.json());
    }
    
    addImage(upload){
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post('http://192.168.1.12:8080/UploadPhoto/Upload', JSON.stringify(upload),
        {headers: headers})
            .map(res => res.json());
    }
}*/