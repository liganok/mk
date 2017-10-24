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
    return (
      <div>
        <HeaderItem
          name={currentAgenda.name}
          duration={currentAgenda.duration}
          spend={timer} />
        <BodyItems
          agenda={currentAgenda}
          timer={timer}/>
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