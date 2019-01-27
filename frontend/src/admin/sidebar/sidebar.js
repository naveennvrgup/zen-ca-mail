import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'

class sidebar extends Component {
    componentDidMount = () => {
        let links = document.querySelectorAll('.sidebar a')
        document.querySelector('.sidebar').style.height = '100vh'
        
        // active page on load
        links.forEach(link=>{
            let clink = link.href.split('/').pop()
            let cpage = this.props.location.pathname.split('/').pop()
            if(clink===cpage){
                link.parentElement.classList.add('active')
            }else{
                link.parentElement.classList.remove('active')
            }
        })
        
        // on click
        links.forEach(link => {
            link.addEventListener('click', e => {
                links.forEach(link => link.parentElement
                    .classList.remove('active'))
                link.parentElement.classList.add('active')
            })
        })
    }


    render() {
        return (
            <div  className='sidebar pt-5'>
                <div className='link w-100'>
                    <Link to='/admin/'>
                        <i className="far fa-chart-bar"></i>
                        <span>Dashboard</span>
                    </Link>
                </div>
                <div className='link w-100'>
                    <i className="fa fa-users"></i>
                    <Link to='/admin/group'>Subscribers</Link>
                </div>
                <div className='link w-100'>
                    <i className="far fa-newspaper"></i>
                    <Link to='/admin/news'>Newsfeed</Link>
                </div>
                <div className='link w-100'>
                    <i className="far fa-envelope"></i>
                    <Link to='/admin/email'>E-mail</Link>
                </div>
                {/* <div className='link w-100'>
                    <i className="fas fa-inbox"></i>
                    <Link to='/admin/outbox'>Outbox</Link>
                </div>
                <div className='link w-100'>
                    <i className="fas fa-rocket"></i>
                    <Link to='/admin/sent'>Sent Mail</Link>
                </div> */}
                <div className='link w-100'>
                    <i className="fa fa-cog"></i>
                    <Link to='/admin/settings'>Settings</Link>
                </div>
                <div className='link w-100'>
                    <i className="fas fa-sign-out-alt"></i>
                    <Link to='/admin/signout'>Signout</Link>
                </div>
            </div>
        )
    }
}

export default withRouter(sidebar)