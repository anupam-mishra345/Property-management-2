import { firstValueFrom } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})
export class ApiService{
    
    baseUrl = 'https://api.airtable.com/v0/apph4ydSk8vrStorI/property_details/';
    
    constructor(private http: HttpClient){}

    async createProperty(values: any){
        const options = {
            headers: {
                'Authorization': 'Bearer keyMhtx372x5t9Hsi',
                'Content-Type': 'application/json'
            }
        }
        const body = {
            "fields": {
                "description": values.description,
                "name": values.name,
                "size": values.size
              }
        }
        const response = await firstValueFrom(this.http.post(this.baseUrl, body, options));
        console.log("response: ", response);
        return await this.getProperties();
    }

    async getProperties(){
        const options = {
            headers: {
                Authorization: 'Bearer keyMhtx372x5t9Hsi'
            }
        }
        const response = await firstValueFrom(this.http.get(this.baseUrl+'?sort%5B0%5D%5Bfield%5D=id', options));
        console.log("response: ", response);
        return response;
    }

    async deleteProperty(id: any){
        const options = {
            headers: {
                Authorization: 'Bearer keyMhtx372x5t9Hsi'
            }
        }
        const response = await firstValueFrom(this.http.delete(this.baseUrl+id, options));
        console.log("response: ", response);
        return await this.getProperties();
    }
}