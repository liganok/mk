import React from 'react'
import PropTypes from 'prop-types'
import { SLink } from '../common/StyledComponents'
import Drawer from 'material-ui/Drawer'
import Grid from 'material-ui/Grid'
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List'
import ViewAgenda from 'material-ui-icons/ViewAgenda'
import Delete from 'material-ui-icons/Delete'
import Help from 'material-ui-icons/Help'
import Description from 'material-ui-icons/Description'
import Settings from 'material-ui-icons/Settings'

import AppHeader from './AppHeader'

function Header(props) {
  const {
    appName,
    user,
    appLoaded,
    inProgress,
    onActionToggle,
    isShowDrawer
  } = props
  return (
    <div>
      <AppHeader
        appName={appName}
        user={user}
        appLoaded={appLoaded}
        inProgress={inProgress}
        onActionToggle={onActionToggle}/>
      <Drawer open={isShowDrawer} onRequestClose={onActionToggle}>
        <AppHeader
          appName={appName}  
          isShowRightButtons={false}
          position="absolute"
          onActionToggle={onActionToggle}
        />

        <Grid style={{ width: 250, paddingLeft: 10 }}>
          <SLink to="/agenda">
            <ListItem button onClick={onActionToggle}>
              <ListItemIcon>
                <ViewAgenda />
              </ListItemIcon>
              <ListItemText primary="Agenda" />
            </ListItem>
          </SLink>
          <SLink to="/template">
            <ListItem button onClick={onActionToggle}>
              <ListItemIcon>
                <Description />
              </ListItemIcon>
              <ListItemText primary="Template" />
            </ListItem>
          </SLink>
          <SLink to="/trash">
            <ListItem button onClick={onActionToggle}>
              <ListItemIcon>
                <Delete />
              </ListItemIcon>
              <ListItemText primary="Trash" />
            </ListItem>
          </SLink>
          <SLink to="/setting">
            <ListItem button onClick={onActionToggle}>
              <ListItemIcon>
                <Settings />
              </ListItemIcon>
              <ListItemText primary="Setting" />
            </ListItem>
          </SLink>
          <SLink to="/help">
            <ListItem button onClick={onActionToggle}>
              <ListItemIcon>
                <Help />
              </ListItemIcon>
              <ListItemText primary="Help" />
            </ListItem>
          </SLink>
        </Grid>
      </Drawer>
    </div>
  )
}

Header.propTypes = {
  appName: PropTypes.string,
  user: PropTypes.object,
  appLoaded: PropTypes.bool,
  inProgress: PropTypes.bool,
  isShowDrawer: PropTypes.bool,
  onActionToggle: PropTypes.func,

}

export default Header