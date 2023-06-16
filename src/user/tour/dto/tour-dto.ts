import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { CustomOption } from 'src/decorator/custom-option.decorator';

enum TravelStartOfTheDay {
  Option1 = 'Early bird',
  Option2 = 'Afternoon riser',
  Option3 = 'Night owl',
}

export class TourDto {
  @IsString()
  @IsNotEmpty()
  @IsEnum(TravelStartOfTheDay)
  travelStartOfTheDay: TravelStartOfTheDay;

  @IsString()
  @IsNotEmpty()
  @CustomOption(['Relaxing and laid back', 'moderatively active '])
  idealTravelExperience: string;

  @IsString()
  @IsNotEmpty()
  destinationType: string;

  @IsString()
  @IsNotEmpty()
  localCuisineAndDiningExperience: string;

  @IsString()
  @IsNotEmpty()
  travelStyle: string;

  @IsString()
  @IsNotEmpty()
  socialInterraction: string;

  @IsString()
  @IsNotEmpty()
  unexpectedChangesWhileTravelling: string;

  @IsString()
  @IsNotEmpty()
  prefferedAccomodationOptions: string;

  @IsString()
  @IsNotEmpty()
  travelBudget: string;

  @IsString()
  @IsNotEmpty()
  transportationTypeWhenTravelling: string;

  @IsString()
  @IsNotEmpty()
  preferredTravelDuration: string;

  @IsString()
  @IsNotEmpty()
  modernTechnologyAndConectivity: string;

  @IsString()
  @IsNotEmpty()
  travelExperience: string;

  @IsString()
  @IsNotEmpty()
  inTouchWithLoveOnes: string;

  @IsString()
  @IsNotEmpty()
  travelMode: string;

  @IsString()
  @IsNotEmpty()
  longDistanceTravelAndTimeZone: string;

  @IsString()
  @IsNotEmpty()
  travelNonStopOrStop: string;

  @IsString()
  @IsNotEmpty()
  prefferedTravelPace: string;

  @IsString()
  @IsNotEmpty()
  preferredTravelClimate: string;

  @IsString()
  @IsNotEmpty()
  tourAndExcursionIcon: string;
}
