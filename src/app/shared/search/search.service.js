"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var SearchService = (function () {
    function SearchService(http) {
        this.http = http;
    }
    SearchService.prototype.getAll = function () {
        return this.http.get('app/shared/search/data/people.json').map(function (res) { return res.json(); });
    };
    SearchService.prototype.search = function (q) {
        if (!q || q === '*') {
            q = '';
        }
        else {
            q = q.toLowerCase();
        }
        return this.getAll().map(function (data) {
            var results = [];
            data.map(function (item) {
                if (JSON.stringify(item).toLowerCase().includes(q)) {
                    results.push(item);
                }
            });
            return results;
        });
    };
    SearchService = __decorate([
        core_1.Injectable()
    ], SearchService);
    return SearchService;
}());
exports.SearchService = SearchService;
var Address = (function () {
    function Address(obj) {
        this.street = obj && obj.street || null;
        this.city = obj && obj.city || null;
        this.state = obj && obj.state || null;
        this.zip = obj && obj.zip || null;
    }
    return Address;
}());
exports.Address = Address;
var Person = (function () {
    function Person(obj) {
        this.id = obj && Number(obj.id) || null;
        this.name = obj && obj.name || null;
        this.phone = obj && obj.phone || null;
        this.address = obj && obj.address || null;
    }
    return Person;
}());
exports.Person = Person;
//# sourceMappingURL=search.service.js.map