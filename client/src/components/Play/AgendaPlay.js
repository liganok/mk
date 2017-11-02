import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';

import agent from '../../agent'
import HeaderItem from './HeaderItem'
import BodyItems from './BodyItems'

import {
  AP_ACTION_GET_DETAIL,
  AP_ACTION_UPDATE_TIMER,
} from '../../constants/actionTypes'

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
    const { match, onLoad } = this.props
    if (match.params.id) {
      onLoad(agent.Agenda.get(match.params.id))
    }
  }

  componentWillUnmount() {
    if (this.clock) {
      clearInterval(this.clock)
    }
  }

  render() {
    const { currentAgenda, timer, onUpdateTimer } = this.props
    if (!currentAgenda) {
      return null
    }
    let startTime = new Date(currentAgenda.startedAt).getTime()
    let nowTime = new Date().getTime()
    if (nowTime >= startTime && nowTime <= (startTime + currentAgenda.duration * 60000)) { 
      this.clock = setInterval(() => {
        let timer = parseInt((new Date().getTime() - startTime) / 1000)
        onUpdateTimer(timer)
      }, 1000)
      if (timer > currentAgenda.duration * 60) {
        clearInterval(this.clock)
      }
    } else {
      clearInterval(this.clock)
     }

    return (
      <div>
        <HeaderItem
          name={currentAgenda.name}
          duration={currentAgenda.duration}
          spend={timer} />
        <BodyItems
          agenda={currentAgenda}
          timer={timer} />
      </div>
    )
  }
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