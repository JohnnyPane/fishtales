import React, { useEffect, useState } from "react";
import { Doughnut, PolarArea } from "react-chartjs-2";
import FishStats from "./FishStats";

const StatsPage = ({ fish }) => {
  const [fishBySpecies, setCount] = useState({})
  const [speciesCount, setSpeciesCount] = useState([])
  const [speciesPieData, setSpeciesPieData] = useState({
    labels: ["Red", "Blue", "Yellow"],
    datasets: [
      {
        label: "Fish",
        data: [30, 50, 100],
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
        ],
        hoverOffset: 4,
      },
    ],
  });

  useEffect(() => {
    let fishSpecies = {};
    const userSpecies = [...new Set(fish.map((feesh) => feesh.species))];
    userSpecies.map(species => fishSpecies[species] = [])
    fish.map(feesh => {
      fishSpecies[feesh.species] = fishSpecies[feesh.species].concat(feesh)
    })

    let dummyData = []
    for (const [species, speciesArray] of Object.entries(fishSpecies)) {
      setSpeciesCount(speciesCount.concat([species, speciesArray.length]))
      dummyData.push([species, speciesArray.length]);
    }
    setCount(fishSpecies)
    getSpeciesData(dummyData)
  }, [])


  const getSpeciesData = async (dummy) => {
    console.log(dummy)
    let counts = []
    let labels = []
    dummy.forEach(species => {
      counts.push(species[1])
      labels.push(species[0])
    })
    console.log(counts, labels)
    setSpeciesPieData({
      ...setSpeciesPieData,
      labels: labels,
      datasets: [
        {
          label: "Fish Caught by Species",
          data: counts,
          // NEED TO ADD COLOR ARRAY SOMEWHERE
          backgroundColor: [
            "rgb(255, 99, 132)",
            "rgb(54, 162, 235)",
            "rgb(255, 206, 86)",
            "rgb(75, 192, 192)",
            "rgb(153, 102, 255)",
            "rgb(255, 159, 64)",
          ],
          hoverOffset: 4,
        },
      ],
      options: {
        legend: {
          display: false,
        }
      },
    });
  }

  const generateFishStats = () => {
     for (const [species, speciesArray] of Object.entries(speciesCount)) {
      return (
        <FishStats fish={speciesArray} />
      )
    }
  }

  return (
    <div>
      <div className="user-overview-charts-wrapper">
        <div className="fish-by-species-wrapper">
          <Doughnut
            data={speciesPieData}
            options={{
              legend: { display: false },
            }}
          />
        </div>
      </div>
      {Object.keys(fishBySpecies).map(species => (
        <FishStats fish={fishBySpecies[species]} />
      ))}
    </div>
  );
};

export default StatsPage;
