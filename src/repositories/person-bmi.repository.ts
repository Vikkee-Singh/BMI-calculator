import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {PersonBmi, PersonBmiRelations} from '../models';

export class PersonBmiRepository extends DefaultCrudRepository<
  PersonBmi,
  typeof PersonBmi.prototype.ID,
  PersonBmiRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(PersonBmi, dataSource);
  }
}
