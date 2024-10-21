import { getRandomCharacter } from "../utils";
import Fitness from "./Fitness";

class Individual {
  public dns: string;
  public readonly fitness: number;
  private fitnessInstance: Fitness;
  constructor(dns: string, fitness: Fitness) {
    this.dns = dns;
    this.fitnessInstance = fitness;
    this.fitness = fitness.calculate(this.dns);
  }

  public crossover(parentIndividual: Individual): Individual {
    let childChromosome = "";
    for (let i = 0; i < this.dns.length; i++) {
      let p = Math.random();
      if (p < 0.45) childChromosome += this.dns[i];
      else if (p < 0.9) childChromosome += parentIndividual.dns[i];
      else childChromosome += getRandomCharacter();
    }
    return new Individual(childChromosome, this.fitnessInstance);
  }
}

export default Individual;
