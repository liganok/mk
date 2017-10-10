import React from 'react'
import Auth from './Auth'
import Grid from 'material-ui/Grid'

function Register(props) {

  const styles = {
    root: {
      marginTop: '20vh',
      maxWidth: 400,
      height: 200
    },
  }

  return (
    <Grid container justify="center">
      <Grid item xs={11}>
        <Auth tabIndex={1} style={styles.root}/>
      </Grid>
    </Grid>
  )
}

export default Register
