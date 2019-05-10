import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

// this acts gaurd preventing the unauthenticated users from 
// accessing the protected routes
class protected_route extends Component {
    authorised = sessionStorage['token']

    componentWillMount = () => {
        console.log()
        if (!this.authorised) {
            this.props.history.push('/user_login/')
        }
    }

    render() {
        return (
            <div>
                {this.authorised && <this.props.component />}
            </div>
        )
    }
}

export default withRouter(protected_route)