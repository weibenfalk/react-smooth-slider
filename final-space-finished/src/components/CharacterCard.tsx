import React from 'react';
// Components
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
// Types
import { Character } from '../App';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    width: 320
  },
  media: {
    height: 150
  }
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
        <Typography gutterBottom variant='h5'>
          Name: {character.name}
        </Typography>
        <Typography gutterBottom color='textSecondary'>
          Hair: {character.hair}
          <br />
          Origin: {character.origin}
          <br />
          Species: {character.species}
          <br />
          Status: {character.status}
          <br />
          Alias:
          <br />
        </Typography>
        {character.alias.map((alias: any) => (
          <Chip key={alias} style={{ margin: 3 }} size='small' label={alias} />
        ))}
        <Typography color='textSecondary'>Abilities:</Typography>
        {character.abilities.map((ability: any) => (
          <Chip
            key={ability}
            style={{ margin: 3 }}
            size='small'
            label={ability}
          />
        ))}
      </CardContent>
    </Card>
  );
};

export default CharacterCard;
