import React from 'react'
import PropTypes from 'prop-types'
import { SLink } from '../common/StyledComponents'
import Button from 'material-ui/Button'

function LoggedOutView(props) {
  const {
    isShow = false
  } = props
  return (
    <div style={{ display: isShow ? null : 'none' }}>
      <SLink to="/login"><Button color="contrast">Log in / Sign up</Button></SLink>
    </div>
  )
}

LoggedOutView.propTypes = {
  isShow: PropTypes.bool
}

export default LoggedOutView