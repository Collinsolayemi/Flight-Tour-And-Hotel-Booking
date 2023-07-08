"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Question = void 0;
const typeorm_1 = require("typeorm");
let Question = class Question {
};
__decorate([
    (0, typeorm_1.PrimaryColumn)()
], Question.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)()
], Question.prototype, "travelStartOfTheDay", void 0);
__decorate([
    (0, typeorm_1.Column)()
], Question.prototype, "idealTravelExperience", void 0);
__decorate([
    (0, typeorm_1.Column)()
], Question.prototype, "destinationType", void 0);
__decorate([
    (0, typeorm_1.Column)()
], Question.prototype, "localCuisineAndDiningExperience", void 0);
__decorate([
    (0, typeorm_1.Column)()
], Question.prototype, "travelStyle", void 0);
__decorate([
    (0, typeorm_1.Column)()
], Question.prototype, "socialInterraction", void 0);
__decorate([
    (0, typeorm_1.Column)()
], Question.prototype, "unexpectedChangesWhileTravelling", void 0);
__decorate([
    (0, typeorm_1.Column)()
], Question.prototype, "prefferedAccomodationOptions", void 0);
__decorate([
    (0, typeorm_1.Column)()
], Question.prototype, "travelBudget", void 0);
__decorate([
    (0, typeorm_1.Column)()
], Question.prototype, "transportationTypeWhenTravelling", void 0);
__decorate([
    (0, typeorm_1.Column)()
], Question.prototype, "preferredTravelDuration", void 0);
__decorate([
    (0, typeorm_1.Column)()
], Question.prototype, "modernTechnologyAndConectivity", void 0);
__decorate([
    (0, typeorm_1.Column)()
], Question.prototype, "travelExperience", void 0);
__decorate([
    (0, typeorm_1.Column)()
], Question.prototype, "inTouchWithLoveOnes", void 0);
__decorate([
    (0, typeorm_1.Column)()
], Question.prototype, "travelMode", void 0);
__decorate([
    (0, typeorm_1.Column)()
], Question.prototype, "longDistanceTravelAndTimeZone", void 0);
__decorate([
    (0, typeorm_1.Column)()
], Question.prototype, "travelNonStopOrStop", void 0);
__decorate([
    (0, typeorm_1.Column)()
], Question.prototype, "prefferedTravelPace", void 0);
__decorate([
    (0, typeorm_1.Column)()
], Question.prototype, "preferredTravelClimate", void 0);
__decorate([
    (0, typeorm_1.Column)()
], Question.prototype, "tourAndExcursionIcon", void 0);
Question = __decorate([
    (0, typeorm_1.Entity)()
], Question);
exports.Question = Question;
