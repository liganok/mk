import React from 'react'
import PropTypes from 'prop-types'
import Snackbar from 'material-ui/Snackbar';
import Slide from 'material-ui/transitions/Slide';

function MessageBox(props) {
  const {
    isShowMsg = false,
    msg = { status: '', message: '' },
    onRequestClose
  } = props

  function TransitionRight(props) {
    return <Slide direction="left" {...props} />;
  }

  return (
    <Snackbar
      style={{marginTop:50}}  
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}  
      open={isShowMsg}
      autoHideDuration={3000}
      onRequestClose={onRequestClose}
      transition={TransitionRight}
      SnackbarContentProps={{
        'aria-describedby': 'message-id',
      }}
      message={<span id="message-id">{msg.message}</span>}
    />
  )
}

MessageBox.propTypes = {
  isShowMsg: PropTypes.bool,
  msg: PropTypes.object,
  onRequestClose: PropTypes.func
}

export default MessageBox
