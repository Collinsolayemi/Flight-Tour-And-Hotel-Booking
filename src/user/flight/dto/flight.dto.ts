// flight-booking.dto.ts

import { IsNotEmpty, IsDateString, IsNumber, Min, IsPositive, IsArray, ArrayMinSize, ValidateNested } from 'class-validator';

class PassengerDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  passportNumber: string;
}

class FlightBookingDto {
  @IsNotEmpty()
  flightNumber: string;

  @IsDateString()
  departureDate: Date;

  @IsNumber()
  @Min(1)
  @IsPositive()
  numOfPassengers: number;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  passengers: PassengerDto[];
}

export default FlightBookingDto;
