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

import Item from './Item'

function ItemList(props) {
  const {
    agenda,
    onChangeField,
    mouseOverId,
    isShowActions,
    onActionMouseOver,
    onActionMouseOut,
    onMenuItemTap,
  } = props

  if (!agenda) {
    return null
  }

  function renderComponent(payload) {
    const {
      agenda,
      isRoot = false,
    } = payload

    let componentArr = []
    let isHasSubItem = agenda.subItems.length
    const item = (
      <Item
        key={agenda.id}
        id={agenda.id}
        startedAt={agenda.startedAt}
        duration={agenda.duration}
        isHasSubItem={isHasSubItem}
        name={agenda.name}
        isRoot={isRoot}
        mouseOverId={mouseOverId}
        isShowActions={isShowActions}
        onChangeField={onChangeField}
        onActionMouseOver={onActionMouseOver}
        onActionMouseOut={onActionMouseOut}
        onMenuItemTap={onMenuItemTap}
      />
    )
    if (!isHasSubItem) {
      componentArr.push(item)
      return componentArr
    } else {

      componentArr.push(item)

      agenda.subItems.forEach(item => {
        componentArr.push(
          <div style={{ paddingLeft: '15px' }} key={`subItem${item.id}`}>
            {renderComponent({ agenda: item })}
          </div>
        )
      })

      return componentArr
    }
  }

  return (
    <div>
      {renderComponent({ agenda: agenda, isRoot: true })}
    </div>
  )
}

ItemList.propTypes = {
  id: PropTypes.string,

}
export default ItemList