import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Question {
  @PrimaryColumn()
  id: string;

  @Column()
  travelStartOfTheDay: string;

  @Column()
  idealTravelExperience: string;

  @Column()
  destinationType: string;

  @Column()
  localCuisineAndDiningExperience: string;

  @Column()
  travelStyle: string;

  @Column()
  socialInterraction: string;

  @Column()
  unexpectedChangesWhileTravelling: string;

  @Column()
  prefferedAccomodationOptions: string;

  @Column()
  travelBudget: string;

  @Column()
  transportationTypeWhenTravelling: string;

  @Column()
  preferredTravelDuration: string;

  @Column()
  modernTechnologyAndConectivity: string;

  @Column()
  travelExperience: string;

  @Column()
  inTouchWithLoveOnes: string;

  @Column()
  travelMode: string;

  @Column()
  longDistanceTravelAndTimeZone: string;

  @Column()
  travelNonStopOrStop: string;

  @Column()
  prefferedTravelPace: string;

  @Column()
  preferredTravelClimate: string;

  @Column()
  tourAndExcursionIcon: string;
}
