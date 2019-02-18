import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'

const Sidebar = React.lazy(() => import('./sidebar/sidebar'))
const Signout = React.lazy(() => import('./auth/signout'))
const Email = React.lazy(() => import('./email/email'))
const New_mail = React.lazy(() => import('./email/new_mail'))
const Sent_mail = React.lazy(() => import('./email/sent_mail'))
const Send_mail = React.lazy(() => import('./email/sent_mail'))
const Groups = React.lazy(() => import('./subscriber/groups'))
const Group = React.lazy(() => import('./subscriber/group'))
const News = React.lazy(() => import('./news/newsfeed'))
const New_news = React.lazy(() => import('./news/new_news'))
const Dashboard = React.lazy(() => import('./dashboard/dashboard'))

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

                    <Route path='/admin/signout/' component={Signout} />

                    <Route path='/admin/' component={Dashboard} />
                </Switch>
            </div>
        )
    }
}
