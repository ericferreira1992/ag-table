import { Injectable } from '@angular/core';
import * as Chance from 'chance';

const chance = new Chance();

@Injectable()
export class DataFactory {

    public getName() { return chance.name(); }
    public getPhoneNumber() { return chance.phone(); }
    public getColor() { return chance.color({format: 'hex'}); }
    public getEmail() { return chance.email(); }
    public getAvatar() { return chance.avatar({fallback: 'monsterid', protocol: 'https'}); }
    public getDate() { return chance.date({string: true, american: false}); }
    public getGender() { return chance.gender(); }
    public getProfession() { return chance.profession(); }
    public getCountry() { return chance.country({ full: true }); }
    public getHeight(min: number = 50, max: number = 150) { return Math.max(Math.floor(Math.random() * max), min); }

    public getRandomObject() {
        let data = {} as any;

        data.name = this.getName();
        data.phone = this.getPhoneNumber();
        data.color = this.getColor();
        data.email = this.getEmail();
        data.avatar = this.getAvatar();
        data.date = this.getDate();
        data.gender = this.getGender();
        data.profession = this.getProfession();
        data.country = this.getCountry();
        data.height = this.getHeight();

        return data
    }

}