import React from 'react'
import PropTypes from 'prop-types';
import Typography from 'material-ui/Typography'
import Grid from 'material-ui/Grid'
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
    width: '150px',
    height: '150px',
    display: 'inline-block',
  };

  let percent = parseInt(spend / duration * 100)

  return (
    <Grid container spacing={0} alignItems='center' style={{ padding: 5, backgroundColor: 'white' }}>
      <Grid item xs={8} >
        <Typography color="inherit" type="headline">{name}</Typography>
        <Typography color="secondary" type="body2">{location}</Typography>
        <Typography color="secondary" type="body2">{'Today 08:00 - 08:50'}</Typography>
      </Grid>
      <Grid item xs={4} container justify="center">
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