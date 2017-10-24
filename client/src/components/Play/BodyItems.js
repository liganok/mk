import React from 'react'
import PropTypes from 'prop-types';
import Typography from 'material-ui/Typography'
import Grid from 'material-ui/Grid'
import PlayItem from './PlayItem'
import Chip from 'material-ui/Chip'
import Paper from 'material-ui/Paper'

function Item(props) {
  const {
    name,
    duration = 1,
    spend = 0,
    spacing = 10
  } = props

  const styles = {
    root: {
      marginTop: spacing,
      padding: 10,
      paddingTop: 15,
      paddingBottom: 15
    }
  }

  let completed = parseInt(spend / 60 / duration * 100)

  return (
    <Paper>
      <PlayItem completed={completed}>
        <Grid container spacing={0} justify="space-between" alignItems="center" style={styles.root}>
          <Typography color="secondary" type="title" noWrap>{name}</Typography>
          <Typography style={{ backgroundColor: '#eeeeee', padding: 5 }} color="secondary" gutterBottom noWrap>{spend} / {duration}:00</Typography>
        </Grid>
      </PlayItem>
    </Paper>
  )
}

function renderComponent(agenda, timer) {
  let componentArr = []
  let isHasSubItem = agenda.subItems.length
  let endPlayTime = agenda.duration * 60 + agenda.startedPlayAt

  let completed = timer < agenda.startedPlayAt ? 0
    : (timer >= endPlayTime ? 100 : (timer - agenda.startedPlayAt + 1) / 60 / agenda.duration * 100)
  let spend = timer < agenda.startedPlayAt ? 0
    : (timer >= endPlayTime ? agenda.duration*60 : (timer - agenda.startedPlayAt))
  const item = (
    <Item
      key={agenda.id}
      name={agenda.name}
      duration={agenda.duration}
      spend={spend}
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

function BodyItems(props) {
  const { agenda, timer, style } = props
  let itemList = renderComponent(agenda, timer)
  itemList.shift()
  return (
    <div style={style}>
      {itemList}
    </div>
  )
}

Item.propTypes = {
  name: PropTypes.string,
  completed: PropTypes.number,
  spacing: PropTypes.number,
  duration: PropTypes.number,
  timer: PropTypes.number,
  spend: PropTypes.string

}

BodyItems.propTypes = {
  style: PropTypes.object,
  agenda: PropTypes.object,
  timer: PropTypes.number
}

export default BodyItems