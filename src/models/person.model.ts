import {Model, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Person extends Model {
  @property({
    type: 'string',
  })
  Gender?: string;

  @property({
    type: 'number',
  })
  HeightCm?: number;

  @property({
    type: 'number',
  })
  WeightKg?: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Person>) {
    super(data);
  }
}

export interface PersonRelations {
  // describe navigational properties here
}

export type PersonWithRelations = Person & PersonRelations;
