class Fitness {
  private solutionText: string;
  constructor(solutionText: string) {
    this.solutionText = solutionText;
  }

  public calculate(dns: string): number {
    let fitness = 0;
    for (let i = 0; i < this.solutionText.length; i++) {
      if (dns[i] === this.solutionText[i]) {
        fitness++;
      }
    }
    return fitness;
  }
}

export default Fitness;
