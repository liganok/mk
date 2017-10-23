import React from 'react'
import PropTypes from 'prop-types';
import { SLink } from '../components/StyledComponents'
import { connect } from 'react-redux'
import agent from '../agent'
import Add from 'material-ui-icons/Add'
import styled from 'styled-components'

import AgendaList from '../components/AgendaList'


import * as types from '../constants/actionTypes'

const mapStateToProps = state => ({
  ...state.agendaList,
  currentUser: state.common.currentUser
})

const mapDispatchToProps = dispatch => ({
  onLoad: (payload) => dispatch({
    type: types.GET_LIST_AGENDA,
    payload
  }),
})

function AddAgenda() {
  const styles = {
    root: {
      marginTop: 10,
      marginBottom: 10,
      padding: 10,
    },
    addIcon: {
      height: 25,
      width: 25,
      padding: 10,
    }

  }

  return (
    <SLink to="/new">
        <div style={styles.root}>
          <Add style={styles.addIcon}/>
        </div>
    </SLink>

  )
}

const SAddAgenda = styled(AddAgenda)`
  transition: background-color 1.5s;
  &:hover {
          background-color: white;
      }
`
class Agenda extends React.Component {

  componentWillMount() {
    if (this.props.currentUser) {
      this.props.onLoad(agent.Agenda.all(this.props.currentPage, 0))
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.currentUser !== this.props.currentUser) {
      this.props.onLoad(agent.Agenda.all())
    }
  }
  render() {
    if (!this.props.agendas) {
      return null
    }
    return (
      <div>
        <SAddAgenda/>
        {this.props.agendas && <AgendaList items={this.props.agendas} type="agenda"/>}
      </div>
    )
  }

}

Agenda.propTypes = {
  onLoad: PropTypes.func,
  currentPage: PropTypes.number,
  agendas: PropTypes.array,
  currentUser: PropTypes.object
}

export default connect(mapStateToProps, mapDispatchToProps)(Agenda)