import React, { Component } from 'react'
import {Route,Switch} from 'react-router-dom'

import Subsciber from './subscriber/subscriber';
import Sidebar from './sidebar/sidebar';
import Email from './email/email';
import Newmail from './newmail/newmail'

export default class admin extends Component {
    render() {
        return (
            <div className='admin'>
                <Sidebar />
                <Switch>
                    <Route path='/admin/subscriber/' component={Subsciber} />
                    <Route path='/admin/email/:draftId/' component={Newmail} />
                    <Route path='/admin/email/' component={Email} />
                    <Route path='/admin/news/' component={Subsciber} />
                    <Route path='/admin/outbox/' component={Subsciber} />
                    <Route path='/admin/sent/' component={Subsciber} />
                    <Route path='/admin/' component={Subsciber} />
                </Switch>
            </div>
        )
    }
}
