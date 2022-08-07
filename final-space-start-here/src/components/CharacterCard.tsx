import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Chip from "@material-ui/core/Chip";
import Typography from "@material-ui/core/Typography";

import BinanceLogo from "../Images/Binance-Icon-Logo.wine.svg";
import CollectionLogo from "../Images/Icon feather-award.svg";

import { Character } from "../App";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    width: 300,
    background: "#0f1226",
    color: "#f8f8f8",
    fontFamily: "Poppins",
    boxShadow: "8px 9px 13px 0px rgba(17,17,17,0.75)",
  },
  media: {
    height: 0,
    paddingTop: "75.25%", // 16:9,
    marginTop: "30",
  },
});

type Props = {
  character: Character;
};

const CharacterCard: React.FC<Props> = ({ character }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardMedia className={classes.media} image={character.img_url} />
      <CardContent>
        <Typography align="center" variant="h5">
          {character.name}
        </Typography>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginLeft: "0",
            marginBottom: "8px",
            padding: "8px",
          }}
        >
          <img
            style={{ height: "50px", marginLeft: "-20px" }}
            src={BinanceLogo}
            alt="logo"
          />
          <Typography gutterBottom variant="h6">
            0.15 BNB ($47.89)
          </Typography>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginLeft: "0",
            marginBottom: "12px",
          }}
        >
          <img
            style={{ height: "20px", marginTop: "-5px", marginRight: "10px" }}
            src={CollectionLogo}
            alt="logo"
          />
          <Typography gutterBottom style={{ color: "#777bab" }}>
            Collection: {character.alias[0]}
          </Typography>
        </div>
        <Typography gutterBottom>Traits:</Typography>
        {character.abilities.map((ability: any) => (
          <Chip
            key={ability}
            style={{
              marginLeft: 4,
              marginTop: 4,
              marginBottom: 4,
              marginRight: 0,
              background: "#00b1ff",
              color: "#f8f8f8",
            }}
            size="small"
            label={ability}
          ></Chip>
        ))}
      </CardContent>
    </Card>
  );
};

export default CharacterCard;
