import React, { useEffect, useState } from "react";
import { Doughnut, PolarArea } from "react-chartjs-2";

const StatsPage = ({ fish }) => {
  const [fishBySpecies, setCount] = useState(null)
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
    });
  }

  function getRandomColor() {
    var letters = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

    
  const colorRandomizer = (array) => {
    let colors = []
    array.forEach(entry => {
      colors.push(getRandomColor())
    })
  }

  // let speciesPiedata = {
  //   labels: getSpeciesData(getSpeciesData(0)),
  //   datasets: [
  //     {
  //       label: "My First Dataset",
  //       data: [1, 2, 3],
  //       backgroundColor: colorRandomizer([1, 2, 3]),
  //       hoverOffset: 4,
  //     },
  //   ],
  // };

  // const speciesPieconfig = {
  //   type: "doughnut",
  //   data: speciesPiedata,
  // };

  return (
    <div>
      <div className="user-overview-charts-wrapper">
        <Doughnut data={speciesPieData} />
      </div>
    </div>
  );
};

export default StatsPage;
