import React from 'react'
import PropTypes from 'prop-types';
import Typography from 'material-ui/Typography'
import Grid from 'material-ui/Grid'
import Paper from 'material-ui/Paper'
import Circle from './CircleProgress';

import * as types from '../../constants/actionTypes'

function HeaderItem(props) {
  const {
    name = 'Board meeting for next q startage',
    host = 'Bob',
    location = 'New york tower building',
    startedAt,
    duration = 300,
    spend = 180,
  } = props

  const circleContainerStyle = {
    width: '100%',
    height: '100%',
  };

  let percent = parseInt(spend / 60 / duration * 100)

  return (
    <Paper>
      <Grid container spacing={0} alignItems='center' justify="center" style={{ padding: 5, backgroundColor: 'white' }}>
        <Grid item xs={9} >
          <Typography color="inherit" type="display1">{name}</Typography>
          <Typography color="secondary" type="body2">{location}</Typography>
          <Typography color="secondary" type="body2">{'Today 08:00 - 08:50'}</Typography>
        </Grid>
        <Grid item xs={3} container spacing={0} justify="flex-end" alignItems="center">
          <div style={circleContainerStyle}>
            <Circle
              percent={percent}
              strokeWidth="6"
              strokeLinecap="square"
              strokeColor='#3FC7FA'
              spend={spend}
              duration={duration}
            />
          </div>
        </Grid>
      </Grid>
    </Paper>
  )
}

HeaderItem.propTypes = {
  percent: PropTypes.number,
  name: PropTypes.string,
  host: PropTypes.string,
  location: PropTypes.string,
  startedAt: PropTypes.number,
  duration: PropTypes.number,
  spend: PropTypes.number
}

export default HeaderItem