import React, { useState, useEffect } from "react";
import { Doughnut, PolarArea } from "react-chartjs-2";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
// import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
}));

const FishStats = ({ fish }) => {
  const [currentSpecies, setCurentSpecies] = useState('')
  const [speciesData, setSpeciesData] = useState({})
  const [fishByBait, setBait] = useState({})
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };


  useEffect(() => {
    let fishBait = {}
    const userSpecies = [...new Set(fish.map((feesh) => feesh.baitType))];
    userSpecies.map((species) => (fishBait[species] = []));

    fish.map((feesh, idx) => {
      if (idx === 0) setCurentSpecies(feesh.species)
      fishBait[feesh.baitType] = fishBait[feesh.baitType].concat(feesh)
    })

    setBait(fishBait)
  }, []);

  return (
    <div>
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary
          // expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography className={classes.heading}>{currentSpecies}</Typography>
          <Typography className={classes.secondaryHeading}>
            I am an accordion
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat.
            Aliquam eget maximus est, id dignissim quam.
          </Typography>
        </AccordionDetails>
      </Accordion>
     
    </div>
  );
};

export default FishStats;
