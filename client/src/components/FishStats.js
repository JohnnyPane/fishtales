import React, { useState, useEffect } from "react";
import { Doughnut, Bar, Line } from "react-chartjs-2";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
// import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis:  "100%",
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
}));

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
// const hours = [...Array(24).keys()];
const hours = [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22]

const FishStats = ({ fish }) => {
  const [currentSpecies, setCurentSpecies] = useState('')
  const [speciesData, setSpeciesData] = useState({})
  const [fishByBait, setBait] = useState({})
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [speciesPieData, setSpeciesPieData] = useState({});
  const [speciesMonthData, setSpeciesMonthData] = useState({})
  const [speciesHourData, setSpeciesHourData] = useState({})
  const [longest, setLongest] = useState(0)
  const [heaviest, setHeaviest] = useState(0)

  useEffect(() => {
    let fishBait = {}
    let fishMonth = {}
    let fishHour = {}
    let lengths = []
    let weights = []

    const speciesByBait = [...new Set(fish.map((feesh) => feesh.baitType))];
    speciesByBait.map((species) => (fishBait[species] = []));

    months.map((month) => fishMonth[month] = [])
    hours.map(hour => fishHour[hour] = [])
  
    fish.map((feesh, idx) => {
      if (idx === 0) setCurentSpecies(feesh.species)
      fishBait[feesh.baitType] = fishBait[feesh.baitType].concat(feesh)

      let month = parseInt(feesh.date.split("-")[1] - 1);
      fishMonth[months[month]] = fishMonth[months[month]].concat(feesh);

      let hour = parseInt(feesh.date.split("T")[1].split(":")[0])
      hour % 2 === 0 ? hour = hour : hour = Math.floor(hour / 2) * 2
      fishHour[hour] = fishHour[hour].concat(feesh)

      lengths.push(feesh.length ? feesh.length : 0)
      weights.push(feesh.weight ? feesh.weight : 0)
    })

    setLongest(Math.max(...lengths))
    setHeaviest(Math.max(...weights))

    // setBait(fishBait)
    getChartData(fishBait, speciesPieData, setSpeciesPieData);
    getChartData(fishMonth, speciesMonthData, setSpeciesMonthData, months);
    getChartData(fishHour, speciesHourData, setSpeciesHourData, hours)
  }, []);

  const getChartData = async (sortType, stateType, stateFunction, labels) => {
    let counts = [];
    let labelsArray = [];
    Object.entries(sortType).map((type) => {
      labelsArray.push(type[0]);
      counts.push(type[1].length);
    })

    stateFunction({
      ...stateType,
      labels: labels ? labels : labelsArray,
      datasets: [
        {
          label: "Fish caught",
          data: counts,
          // NEED TO ADD COLOR ARRAY SOMEWHERE
          backgroundColor: [
            "rgb(255, 99, 132, 0.8)",
            "rgb(54, 162, 235, 0.8)",
            "rgb(255, 206, 86, 0.8)",
            "rgb(75, 192, 192, 0.8)",
            "rgb(153, 102, 255, 0.8)",
            "rgb(255, 159, 64, 0.8)",
          ],
          hoverOffset: 4,
        },
      ],
    });
  };

  const accordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div style={{ width: "80%" }}>
      <Accordion
        expanded={expanded === "panel1"}
        onChange={accordionChange("panel1")}
      >
        <AccordionSummary
          // expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
          style={{ display: "block", flexGrow: 0 }}
        >
          <Typography
            style={{
              display: "block",
              flexGrow: 0,
              textAlign: "center",
              paddingTop: "13px",
              fontWeight: 500,
            }}
            className={classes.heading}
          >
            {currentSpecies}
          </Typography>
          {/* <Typography className={classes.secondaryHeading}></Typography> */}
        </AccordionSummary>
        <AccordionDetails className={classes.root}>
          <div className="fish-stats-summary">
            Total{"   "}
            <span style={{ color: "#38A700" }}>{fish.length}</span>
            <br />
            Longest{"   "}
            <span style={{ color: "rgb(54, 162, 235)" }}>{longest}"</span>
            <br />
            Heaviest{"   "}
            <span style={{ color: "rgb(54, 162, 235)" }}>{heaviest} lbs</span>
          </div>
          <div className="fish-stat-chart-wrapper">
            <Doughnut
              options={{
                plugins: {
                  legend: { display: false },
                  title: { display: true, text: "Bait Types" },
                },
              }}
              data={speciesPieData}
            />
          </div>
          <div className="fish-stat-chart-wrapper">
            <Line
              options={{
                elements: {
                  point: {
                    radius: 2,
                  },
                  line: {
                    borderWidth: 1,
                    tension: 0.5,
                  },
                },
                scales: {
                  y: {
                    display: false,
                    grid: { display: false },
                  },
                  x: { grid: { display: false } },
                },
                plugins: {
                  legend: { display: false },
                  title: { display: true, text: "Count by Month" },
                },
              }}
              data={speciesMonthData}
            />
          </div>
          <div className="fish-stat-chart-wrapper">
            <Bar
              options={{
                scales: {
                  y: { display: false, grid: { display: false } },
                  x: { grid: { display: false } },
                },
                plugins: {
                  legend: { display: false },
                  title: { display: true, text: "Fish by Hour" },
                },
              }}
              data={speciesHourData}
            />
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default FishStats;
