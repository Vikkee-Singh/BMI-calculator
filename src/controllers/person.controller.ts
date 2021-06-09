import {
  repository
} from '@loopback/repository';
import {
  getModelSchemaRef, post, requestBody,
  response
} from '@loopback/rest';
import {Person, PersonBmi} from '../models';
import {PersonBmiRepository} from '../repositories';

export class PersonController {
  constructor(
    @repository(PersonBmiRepository)
    public personBmiRepository: PersonBmiRepository
  ) { }

  /* Start Custom API */
  @post('/bmi-calculator')
  @response(200, {
    description: 'Calculate bmi, bmi-category, bmi Range',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(PersonBmi, {includeRelations: true}),
        },
      },
    }
  })
  async calculateBMIsCategorysRange(
    @requestBody({
      content: {
        'application/json': {
          schema: {
            type: 'array',
            items: getModelSchemaRef(Person, {partial: true}),
          },
        },
      },
    })
    persons: Array<Person>,
  ): Promise<PersonBmi[]> {

    const personObj: Array<PersonBmi> = [];
    for (let index = 0; index < persons.length; index++) {
      const person: Person = new Person(persons[index]);

      const bmi: number = PersonController.calculateBMIs(person);
      const {bmi_category, health_risk} = PersonController.calculateBMICategoryBMIrange(bmi);
      // create a new PersonBmi Object
      const PersonBmiObj: PersonBmi = new PersonBmi({
        gender: person["Gender"] || "Male",
        height_cm: person["HeightCm"] || 1,
        weight_kg: person["WeightKg"] || 1,
        bmi,
        bmi_category,
        health_risk
      })

      personObj.push(PersonBmiObj)
    }
    return this.personBmiRepository.createAll(personObj);
  }

  /**
 * calculate bmi_category and bmi_range
 * @param bmi - number
 */
  private static calculateBMICategoryBMIrange(bmi: number): {bmi_category: string, health_risk: string} {
    let bmi_category: string = "";
    let health_risk: string = "";
    if (bmi < 18.4) {
      bmi_category = "Underweight";
      health_risk = "Malnutrition risk";
    }
    if (bmi >= 18.5 && bmi <= 24.9) {
      bmi_category = "Normal weight";
      health_risk = "Low risk";
    }
    if (bmi >= 25 && bmi <= 29.9) {
      bmi_category = "Overweight Moderately";
      health_risk = "Enhanced risk";
    }
    if (bmi >= 30 && bmi <= 34.9) {
      bmi_category = "obese";
      health_risk = "Medium risk";
    }
    if (bmi >= 35 && bmi <= 39.9) {
      bmi_category = "Severely obese";
      health_risk = "High risk";
    }
    if (bmi >= 40) {
      bmi_category = "Very severely obese";
      health_risk = "Very high risk";
    }
    return {bmi_category, health_risk};
  }

  /**
   * calculate bmi and send
   * @param person - person
   */
  private static calculateBMIs(person: Person): number {
    const weight_kg: number = person["WeightKg"] || 0;
    const height_m: number = person["HeightCm"] && person["HeightCm"] !== 0 ? person["HeightCm"] / 100 : 1;
    return weight_kg / height_m;
  }
  /* End of Custom API */
}
