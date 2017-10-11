import React from 'react'
import Grid from 'material-ui/Grid'
import PropTypes from 'prop-types';

import AgendaItem from './AgendaItem'

function AgendaList (props) {
  const {
    items = [],
    type = 'agenda',
  } = props

  const list = items.map((item, index) => {
    return (
      <Grid item xs={12} key={index}>
        <AgendaItem
          type={type}
          id={item.id}
          name={item.name}
          startedAt={item.startedAt}
          updatedAt={item.updatedAt}
          duration={item.duration}
        />
      </Grid>
    )
  })

  return (
    <Grid container>
      {list}
    </Grid>
  )
}

AgendaList.propTypes = {
  type: PropTypes.oneOf(['agenda','template','trash']),
  items: PropTypes.array
}

export default AgendaList