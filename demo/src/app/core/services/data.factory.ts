import { Injectable } from '@angular/core';
import * as faker from 'faker';

@Injectable()
export class DataFactory {

    public getFistName() { return faker.name.firstName(); }
    public getName() { return this.getFistName() + ' ' + faker.name.lastName(); }
    public getPhoneNumber() { return faker.phone.phoneNumber(); }
    public getColor() { return faker.internet.color(); }
    public getEmail() { return faker.internet.email().toLowerCase(); }
    public getAvatar() { return faker.image.avatar(); }
    public getDate() { return faker.date.past(); }
    public getProfession() { return faker.name.jobDescriptor(); }
    public getProfArea() { return faker.name.jobArea(); }
    public getProfType() { return faker.name.jobType(); }
    public getHeight(min: number = 50, max: number = 150) { return Math.max(Math.floor(Math.random() * max), min); }

    public getRandomObject() {
        return {
            name: this.getName(),
            phone: this.getPhoneNumber(),
            color: this.getColor(),
            email: this.getEmail(),
            avatar: this.getAvatar(),
            date: this.getDate(),
            profession: this.getProfession(),
            profArea: this.getProfArea(),
            profType: this.getProfType(),
            height: this.getHeight()
        };
    }

}