declare class PassengerDto {
    name: string;
    passportNumber: string;
}
declare class FlightBookingDto {
    flightNumber: string;
    departureDate: Date;
    numOfPassengers: number;
    passengers: PassengerDto[];
}
export default FlightBookingDto;
