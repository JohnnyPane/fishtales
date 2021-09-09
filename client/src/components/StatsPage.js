import React, { useEffect, useState } from "react";
import { Doughnut, PolarArea } from "react-chartjs-2";
import FishStats from "./FishStats";

const StatsPage = ({ fish }) => {
  const [fishBySpecies, setCount] = useState({})
  // const [speciesCount, setSpeciesCount] = useState([])
  const [speciesPieData, setSpeciesPieData] = useState({});

  useEffect(() => {
    let fishSpecies = {};
    const userSpecies = [...new Set(fish.map((feesh) => feesh.species))];
    userSpecies.map(species => fishSpecies[species] = [])
    fish.map(feesh => {
      fishSpecies[feesh.species] = fishSpecies[feesh.species].concat(feesh)
    })

    setCount(fishSpecies)
    getSpeciesData(fishSpecies)
  }, [])


  const getSpeciesData = async (species) => {
    let counts = []
    let labels = []
    Object.entries(species).map((fish) => {
      labels.push(fish[0]);
      counts.push(fish[1].length);
    });

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
        },
        title: {
          text: "Bait Types"
        }
      },
    });
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
      <div style={{marginTop: 30, display: "flex", alignItems: "center", flexDirection: "column"}}>
        {Object.keys(fishBySpecies).map((species) => (
          <FishStats fish={fishBySpecies[species]} />
        ))}
      </div>
    </div>
  );
};

export default StatsPage;
