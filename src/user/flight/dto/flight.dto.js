"use strict";
// flight-booking.dto.ts
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const class_validator_1 = require("class-validator");
class PassengerDto {
}
__decorate([
    (0, class_validator_1.IsNotEmpty)()
], PassengerDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)()
], PassengerDto.prototype, "passportNumber", void 0);
class FlightBookingDto {
}
__decorate([
    (0, class_validator_1.IsNotEmpty)()
], FlightBookingDto.prototype, "flightNumber", void 0);
__decorate([
    (0, class_validator_1.IsDateString)()
], FlightBookingDto.prototype, "departureDate", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.IsPositive)()
], FlightBookingDto.prototype, "numOfPassengers", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayMinSize)(1),
    (0, class_validator_1.ValidateNested)({ each: true })
], FlightBookingDto.prototype, "passengers", void 0);
exports.default = FlightBookingDto;
