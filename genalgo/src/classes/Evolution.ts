import Individual from "./Individual";
import { POPULATION_LIMIT } from "../config";
import { generateDNS, getRandomNumber } from "../utils";
import Fitness from "./Fitness";

class Evolution {
  public population: Array<Individual>;
  private solutionText: string;
  private evolutionDone: boolean;
  private fitness: Fitness;
  private maxRun: number;

  constructor(solutionText: string, fitness: Fitness) {
    this.population = [];
    this.solutionText = solutionText;
    this.evolutionDone = false;
    this.fitness = fitness;
    this.maxRun = 0;

    for (let i = 0; i < POPULATION_LIMIT; i++) {
      const dns = generateDNS(this.solutionText.length);
      this.population.push(new Individual(dns, this.fitness));
    }

    this.evolve();
  }

  private getRandomEliteIndividual(): Individual {
    let rand = getRandomNumber(POPULATION_LIMIT / 2);
    return this.population[rand];
  }

  private sortPopulation(): void {
    this.population.sort(
      (individual1: Individual, individual2: Individual) =>
        individual2.fitness - individual1.fitness
    );
  }

  /**
   * Selects the 10% of the fittest from the whole population
   */
  private performElitism(): Array<Individual> {
    let eliteSelection: Array<Individual> = [];
    let newLimit = Math.floor((10 * POPULATION_LIMIT) / 100);
    for (let i = 0; i < newLimit; i++) eliteSelection.push(this.population[i]);
    return eliteSelection;
  }

  private produceOffspring(): Array<Individual> {
    const newPopulation = [];
    let newLimit = Math.floor((90 * POPULATION_LIMIT) / 100);
    for (let i = 0; i < newLimit; i++) {
      const offspring = this.getRandomEliteIndividual().crossover(
        this.getRandomEliteIndividual()
      );
      newPopulation.push(offspring);
    }
    return newPopulation;
  }

  public evolve(): void {
    while (!this.evolutionDone) {
      this.maxRun++;
      this.sortPopulation();

      if (this.maxRun === 2000) {
        this.evolutionDone = true;
        console.log("FAILED: ", this.population[0]);
        break;
      }

      const [firstIndividual] = this.population;
      if (firstIndividual.fitness === this.solutionText.length) {
        this.evolutionDone = true;
        console.log(this.population);
        break;
      }

      const newPopulation = [];
      newPopulation.push(...this.performElitism());
      newPopulation.push(...this.produceOffspring());

      this.population = newPopulation;
      console.log(this.population);
    }
  }
}

export default Evolution;
