import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class PersonBmi extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  ID?: number;

  @property({
    type: 'string',
  })
  gender?: string;

  @property({
    type: 'number',
  })
  heightCm?: number;

  @property({
    type: 'number',
  })
  weightKg?: number;

  @property({
    type: 'string',
  })
  bmiCategory?: string;

  @property({
    type: 'string',
  })
  healthRisk?: string;

  @property({
    type: 'number',
  })
  bmi?: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<PersonBmi>) {
    super(data);
  }
}

export interface PersonBmiRelations {
  // describe navigational properties here
}

export type PersonBmiWithRelations = PersonBmi & PersonBmiRelations;
