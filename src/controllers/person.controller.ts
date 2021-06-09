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
    for (const iterator of persons) {
      // calculate body mass index
      const bmi: number = PersonController.calculateBMIs(iterator);
      // calculate body mass index category and health risk
      const {bmiCategory, healthRisk} = PersonController.calculateBMICategoryBMIrange(bmi);
      // create a new PersonBmi Object
      const PersonBmiObj: PersonBmi = new PersonBmi({
        gender: iterator["Gender"] ?? "Male",
        heightCm: iterator["HeightCm"] ?? 1,
        weightKg: iterator["WeightKg"] ?? 1,
        bmi,
        bmiCategory,
        healthRisk
      })
      // push person object with bmi, bmiCategory and healthRisk
      personObj.push(PersonBmiObj)
    }
    // add to the database and return it in response
    return this.personBmiRepository.createAll(personObj);
  }

  /**
 * calculate bmiCategory and healthRisk
 * @param bmi - number
 */
  private static calculateBMICategoryBMIrange(bmi: number): {bmiCategory: string, healthRisk: string} {
    let bmiCategory = "";
    let healthRisk = "";
    if (bmi < 18.4) {
      bmiCategory = "Underweight";
      healthRisk = "Malnutrition risk";
    }
    if (bmi >= 18.5 && bmi <= 24.9) {
      bmiCategory = "Normal weight";
      healthRisk = "Low risk";
    }
    if (bmi >= 25 && bmi <= 29.9) {
      bmiCategory = "Overweight Moderately";
      healthRisk = "Enhanced risk";
    }
    if (bmi >= 30 && bmi <= 34.9) {
      bmiCategory = "obese";
      healthRisk = "Medium risk";
    }
    if (bmi >= 35 && bmi <= 39.9) {
      bmiCategory = "Severely obese";
      healthRisk = "High risk";
    }
    if (bmi >= 40) {
      bmiCategory = "Very severely obese";
      healthRisk = "Very high risk";
    }
    return {bmiCategory, healthRisk};
  }

  /**
   * calculate bmi and send
   * @param person - person
   */
  private static calculateBMIs(person: Person): number {
    const weightKg: number = person["WeightKg"] ?? 0;
    const heightCm: number = person["HeightCm"] && person["HeightCm"] !== 0 ? person["HeightCm"] / 100 : 1;
    return weightKg / heightCm;
  }
  /* End of Custom API */
}
