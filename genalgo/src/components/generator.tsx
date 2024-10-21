import { useCallback, useEffect, useState } from "react";
import Evolution from "../classes/Evolution";
import Fitness from "../classes/Fitness";
import Individual from "../classes/Individual";

const Generator = () => {
  const [value, setValue] = useState<string>("");
  const [isEvolving, setIsEvolving] = useState<boolean>(false);
  const [population, setPopulation] = useState<Array<Individual>>();
  const [currentDNS, setCurrentDNS] = useState<Individual>();
  const handleStart = useCallback(() => {
    if (value.length) {
      setIsEvolving(true);
      const evo = new Evolution(value, new Fitness(value));
      evo.evolve();
      setPopulation(evo.population);
    }
  }, [value]);

  useEffect(() => {
    return () => {
      setIsEvolving(false);
    };
  });

  useEffect(() => {
    if (population) {
      setInterval(() => {
        setCurrentDNS(population.pop());
      }, 50);
    }
  }, [population]);

  return (
    <>
      <input
        type="text"
        placeholder="add your input"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={isEvolving}
      />
      <button type="submit" disabled={isEvolving} onClick={handleStart}>
        Start evolution
      </button>
      <p>
        <input
          style={{ background: "none", border: "none" }}
          type="text"
          disabled
          value={currentDNS?.dns}
        />
      </p>
    </>
  );
};

export default Generator;
