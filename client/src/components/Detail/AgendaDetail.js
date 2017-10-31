import React from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import Grid from 'material-ui/Grid'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import Typography from 'material-ui/Typography'
import Flag from 'material-ui-icons/Flag'
import Alarm from 'material-ui-icons/Alarm'
import Add from 'material-ui-icons/Add'
import Remove from 'material-ui-icons/Remove'
import IconButton from 'material-ui/IconButton'
import Button from 'material-ui/Button';

import agent from '../../agent'
import Item from './Item'
import ItemList from './ItemList'

import {
  AGENDA_UPDATE_FIELD,
  AGENDA_SAVE,
  AGENDA_MENU_ITEM_TAP,
  AGENDA_GET_DETAIL,
  AI_ACTION_MOUSE_OVER,
  AI_ACTION_MOUSE_OUT,
} from '../../constants/actionTypes'

const mapStateToProps = state => ({ ...state.agendaDetail })
const mapDispatchToProps = dispatch => ({
  onLoad: (payload) => dispatch({ type: AGENDA_GET_DETAIL, payload }),
  onSaveAgenda: agenda => dispatch({ type: AGENDA_SAVE, payload: agent.Agenda.save(agenda) }),
  onChangeField: (id, key, value) => dispatch({ type: AGENDA_UPDATE_FIELD, id: id, key: key, value: value }),
  onMenuItemTap: (id, value) => dispatch({ type: AGENDA_MENU_ITEM_TAP, id: id, value: value }),
  onActionMouseOver: value => dispatch({ type: AI_ACTION_MOUSE_OVER, payload: value }),
  onActionMouseOut: value => dispatch({ type: AI_ACTION_MOUSE_OUT, payload: value }),

})

class AgendaDetail extends React.Component {

  constructor(props) {
    super()
    this.id = props.match.params.id
    this.onLoad = props.onLoad
    this.onSaveAgenda = props.onSaveAgenda
    this.onChangeField = props.onChangeField

  }

  componentWillMount() {
    if (this.id) {
      if (this.props.match.path.indexOf('template') > 0) {
        this.onLoad(agent.Template.get(this.props.match.params.id))
      } else {
        this.onLoad(agent.Agenda.get(this.props.match.params.id))
      }
    }
  }

  render() {

    const agenda = this.props.currentAgenda
    return (
      <div>
        <ItemList
          agenda={agenda}
          mouseOverId={this.props.mouseOverId}
          isShowActions={this.props.isShowActions}
          onChangeField={this.props.onChangeField}
          onActionMouseOver={this.props.onActionMouseOver}
          onActionMouseOut={this.props.onActionMouseOut}
          onMenuItemTap={this.props.onMenuItemTap}
        />
        <Grid container spacing={0} justify="flex-end" style={{marginTop:10}}>
          <Button
            style={{ margin: 5 }}  
            raised dense color="primary"
            onClick={() => this.props.onSaveAgenda(agenda)}>
            Save
          </Button>
          <Button dense style={{ margin: 5 }} >
            Delete
          </Button>
        </Grid>
      </div>
    )
  }
}
AgendaDetail.propTypes = {
  id: PropTypes.string,

}
export default connect(mapStateToProps, mapDispatchToProps)(AgendaDetail)