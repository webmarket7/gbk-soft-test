import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';


type HeadersObj = string | { [name: string]: string | string[] };

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    constructor(
        private readonly http: HttpClient
    ) {
    }

    static prepareParams<P>(params: P): HttpParams {
        const prepared: {[param: string]: string} = {};

        if (params) {
            for (const key in params) {
                if (params.hasOwnProperty(key)) {
                    prepared[key] = `${params[key]}`;
                }
            }
        }

        return new HttpParams({fromObject: prepared});
    }

    static prepareHeaders(headers: HeadersObj): HttpHeaders {
        return new HttpHeaders(headers);
    }

    static prepareOptions(params?: HttpParams, headers?: HttpHeaders): { params?: HttpParams, headers?: HttpHeaders } {
        return {
            ...(params && {params}),
            ...(headers && {headers})
        };
    }

    static getEndpoint(url: string): string {
        return `${ environment.api }${ url }`;
    }

    postRequest<T, P = any>(url: string, body?: T, params?: HttpParams, headers?: HttpHeaders): Observable<unknown> {
        return this.http.post(ApiService.getEndpoint(url), body, ApiService.prepareOptions(params, headers));
    }

    getRequest(url: string, params?: HttpParams, headers?: HttpHeaders): Observable<unknown> {
        return this.http.get(ApiService.getEndpoint(url), ApiService.prepareOptions(params, headers));
    }

    putRequest<T>(url: string, body: T, params?: HttpParams, headers?: HttpHeaders): Observable<unknown> {
        return this.http.put(ApiService.getEndpoint(url), body, ApiService.prepareOptions(params, headers));
    }

    deleteRequest(url: string): Observable<unknown> {
        return this.http.delete(ApiService.getEndpoint(url));
    }
}
