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
  height_cm?: number;

  @property({
    type: 'number',
  })
  weight_kg?: number;

  @property({
    type: 'string',
  })
  bmi_category?: string;

  @property({
    type: 'string',
  })
  health_risk?: string;

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
