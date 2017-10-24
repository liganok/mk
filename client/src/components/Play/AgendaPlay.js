import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';

import agent from '../agent'
import PlayItem from '../components/PlayItem'

import Typography from 'material-ui/Typography'
import Grid from 'material-ui/Grid'
import Chip from 'material-ui/Chip';

import HeaderItem from '../components/HeaderItem'

import {
  AP_ACTION_GET_DETAIL,
  AP_ACTION_UPDATE_TIMER,
} from '../constants/actionTypes'

function convertTime(time, short) {
  let h = parseInt(time / 3600)
  let m1 = parseInt((time - h * 3600) / 600)
  let m2 = parseInt((time - h * 3600 - m1 * 600) / 60)
  let s1 = parseInt(time % 60 / 10)
  let s2 = parseInt(time % 60 % 10)
  if (short) { return `${m1}${m2}:${s1}${s2}` }
  return `${h}:${m1}${m2}:${s1}${s2}`
}

function BodyItem(props) {
  const {
    completed,
    name,
    duration,
    timer
  } = props

  const styles = {
    root: {
      marginTop: 15,
    }
  }

  return (
    <PlayItem completed={completed}>
      <Grid container spacing={0} alignItems="center" justify="center" style={styles.root}>
        <Grid item xs={8}>
          <Typography color="secondary" type="title">{name}</Typography>
        </Grid>
        <Grid  item xs={4} container alignItems="flex-end" direction="column">
          <Chip label={duration} />
        </Grid>
      </Grid>
    </PlayItem>
  )
}

function renderComponent(agenda, timer) {
  let componentArr = []
  let isHasSubItem = agenda.subItems.length
  let endPlayTime = agenda.duration * 60 + agenda.startedPlayAt

  let completed = timer < agenda.startedPlayAt ? 0
    : (timer >= endPlayTime ? 100 : (timer - agenda.startedPlayAt + 1) / 60 / agenda.duration * 100)
  const item = (
    <BodyItem
      key={agenda.id}
      name={agenda.name}
      completed={parseInt(completed)}
      duration={agenda.duration * 60}
    />
  )

  if (!isHasSubItem) {
    componentArr.push(item)
    return componentArr
  } else {

    componentArr.push(item)
    agenda.subItems.forEach(item => {
      componentArr.push(
        <div style={{ paddingLeft: 15 }} key={`subItem${item.id}`}>
          {renderComponent(item, timer)}
        </div>
      )
    })

    return componentArr
  }
}

const mapStateToProps = state => ({ ...state.agendaPlay })
const mapDispatchToProps = dispatch => ({
  onLoad: (payload) => dispatch({ type: AP_ACTION_GET_DETAIL, payload }),
  onUpdateTimer: (payload) => dispatch({ type: AP_ACTION_UPDATE_TIMER, payload }),
})

class AgendaPlay extends React.Component {

  constructor() {
    super()
    this.clock
  }

  componentWillMount() {
    const { match, onLoad, onUpdateTimer } = this.props
    if (match.params.id) {
      onLoad(agent.Agenda.get(match.params.id))
    }
    if (this.props.currentAgenda) {
      let startTime = new Date().getTime()
      this.clock = setInterval(() => {
        let timer = parseInt((new Date().getTime() - startTime) / 1000)
        if (timer > this.props.currentAgenda.duration * 60) {
          clearInterval(this.clock)
        }
        onUpdateTimer(timer)
      }, 1000)
    }
  }

  componentWillUnmount() {
    if (this.clock) {
      clearInterval(this.clock)
    }
  }

  render() {
    const { currentAgenda, timer } = this.props
    if (!currentAgenda) {
      return null
    }
    let list = renderComponent(currentAgenda, timer)
    list.shift()

    return (
      <div>
        <HeaderItem
          name={currentAgenda.name}
          duration={currentAgenda.duration * 60}
          spend={timer} />
        <div style={{ marginTop: 5 }}>
          {list}
        </div>
      </div>
    )
  }
}

BodyItem.propTypes = {
  name: PropTypes.string,
  completed: PropTypes.number,
  duration: PropTypes.number,
  timer: PropTypes.number
}

AgendaPlay.propTypes = {
  currentAgenda: PropTypes.object,
  timer: PropTypes.number,
  match: PropTypes.object,
  onLoad: PropTypes.func,
  onUpdateTimer: PropTypes.func,
  name: PropTypes.string,
  items: PropTypes.array
}

export default connect(mapStateToProps, mapDispatchToProps)(AgendaPlay)