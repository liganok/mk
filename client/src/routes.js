import React from 'react'
import {Route, Switch } from 'react-router-dom'

import Login from './components/Login'
import Register from './components/Register'
import Setting from './pages/Setting'
import AgendaList from './pages/Agenda'
import AgendaItem from './containers/AgendaItem'
import AgendaDetail from './containers/AgendaDetail'
import Play from './containers/AgendaPlay'
import TemplateList from './pages/Template'
import TrashList from './pages/Trash'
import Help from './pages/Help'

export default (
    <Switch>
        <Route exact path='/' component={AgendaList} />
        <Route path='/login' component={Login} />
        <Route path='/register' component={Register} />
        <Route path='/AgendaItem' component={AgendaItem} />
        <Route path='/template/detail/:id' component={AgendaDetail} />
        <Route path='/template/play/:id' component={Play} />
        <Route path='/agenda/detail/:id' component={AgendaDetail} />
        <Route path='/agenda/play/:id' component={Play} />
        <Route path='/new' component={AgendaDetail} />
        <Route path='/setting' component={Setting} />
        <Route path='/agenda' component={AgendaList} />
        <Route path='/template' component={TemplateList} />
        <Route path='/trash' component={TrashList} />
        <Route path='/help' component={Help} />
    </Switch>
)