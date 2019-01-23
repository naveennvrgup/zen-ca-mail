import React, { Component } from 'react'
import {Route,Switch} from 'react-router-dom'

import Subsciber from './subscriber/subscriber';
import Sidebar from './sidebar/sidebar';
import Email from './email/email';
import New_mail from './email/new_mail'
import Outbox from './outbox/outbox'
import Sent from './sent/sent'
import Settings from './settings/settings'
import Signout from './settings/signout'
import New_news from './news/create'
import News from './news/newsfeed'

export default class admin extends Component {
    render() {
        return (
            <div className='admin'>
                <Sidebar />
                <Switch>
                    <Route path='/admin/subscriber/' component={Subsciber} />
                    <Route path='/admin/email/:draftId/' component={New_mail} />
                    <Route path='/admin/email/' component={Email} />
                    <Route path='/admin/news/:id/' component={New_news} />
                    <Route path='/admin/news' component={News} />
                    <Route path='/admin/news/' component={Subsciber} />
                    <Route path='/admin/outbox/' component={Outbox} />
                    <Route path='/admin/sent/' component={Sent} />
                    <Route path='/admin/settings/' component={Settings} />
                    <Route path='/admin/signout/' component={Signout} />
                    <Route path='/admin/' component={Subsciber} />
                </Switch>
            </div>
        )
    }
}
