import React, { Component } from 'react'
import {Route,Switch} from 'react-router-dom'

import Sidebar from './sidebar/sidebar';
import Email from './email/email';
import New_mail from './email/new_mail'
import Sent_mail from './email/sent_mail'
import Send_mail from './email/send_mail'
import Outbox from './outbox/outbox'
import Sent from './sent/sent'
import Settings from './settings/settings'
import Signout from './settings/signout'
import Group from './subscriber/group'
import Groups from './subscriber/groups'
import New_news from './news/new_news'
import News from './news/newsfeed'

export default class admin extends Component {
    render() {
        return (
            <div className='admin'>
                <Sidebar />
                <Switch>
                    <Route path='/admin/group/:id/' component={Group} />
                    <Route path='/admin/group/' component={Groups} />
                    <Route path='/admin/email/sent_email/:id/' component={Sent_mail} />
                    <Route path='/admin/email/send_email/:id/' component={Send_mail} />
                    <Route path='/admin/email/edit_email/:id/' component={New_mail} />
                    <Route path='/admin/email/' component={Email} />
                    <Route path='/admin/news/edit_news/:id/' component={New_news} />
                    <Route path='/admin/news' component={News} />
                    <Route path='/admin/outbox/' component={Outbox} />
                    <Route path='/admin/sent/' component={Sent} />
                    <Route path='/admin/settings/' component={Settings} />
                    <Route path='/admin/signout/' component={Signout} />
                    {/* <Route path='/admin/' component={Subscriber} /> */}
                </Switch>
            </div>
        )
    }
}
