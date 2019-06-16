import React, { Component, Suspense } from 'react'
import { Route, Switch } from 'react-router-dom'

const Sidebar = React.lazy(() => import('./sidebar/sidebar'))
const Signout = React.lazy(() => import('./auth/signout'))
const Email = React.lazy(() => import('./email/email'))
const New_mail = React.lazy(() => import('./email/new_mail'))
const Sent_mail = React.lazy(() => import('./email/sent_mail'))
const Send_mail = React.lazy(() => import('./email/send_mail'))
const Groups = React.lazy(() => import('./subscriber/groups'))
const Group = React.lazy(() => import('./subscriber/group'))
const News = React.lazy(() => import('./news/newsfeed'))
const New_news = React.lazy(() => import('./news/new_news'))
const Dashboard = React.lazy(() => import('./dashboard/dashboard'))
const Summernote = React.lazy(() => import('./email/sumemrnote'))

export default class admin extends Component {
    render() {
        return (
            <div className='admin'>
                <Suspense fallback={<div className='sus-loader'><div className="lds-dual-ring"></div></div>}>
                    <Sidebar />
                    <Summernote/>
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
                </Suspense>
            </div>
        )
    }
}
