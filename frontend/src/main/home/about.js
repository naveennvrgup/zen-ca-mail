import React, { Component } from 'react'

export default class about extends Component {
    constructor(props) {
        super(props)

        this.state = {
            currTab: 'Mission'
        }
    }

    changeTabHandler = (e) => {
        e.preventDefault()
        console.log(e.target.innerHTML)
    }

    componentDidMount = () => {
        let tabs = document.querySelectorAll('.main .tabs div');
        let contents = document.querySelectorAll('.main .content div');

        tabs.forEach((tab, i) => {
            tab.addEventListener('click', e => {
                contents.forEach(content => content.style.display = 'none')
                tabs.forEach(tab=>tab.classList.remove('active'))
                contents[i].style.display = 'block'
                tabs[i].classList.add('active')
            })
        })

    }


    text = (
        <div>
            <div className="tabs d-flex mt-5 mx-5">
                <div className='active'>Mission</div>
                <div>Who we are</div>
                <div>Our History</div>
            </div>
            <div className="m-5 content">
                <div>Mission Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione ex id quam optio iste ipsum necessitatibus reprehenderit officiis esse quia aliquid exercitationem iusto laboriosam, accusantium delectus culpa mollitia. Alias, saepe quos voluptatem magnam necessitatibus nobis odio labore enim ad cumque iusto, cum at sint. Animi quae maiores corrupti ipsum quam.</div>
                <div>who we are</div>
                <div>history</div>
            </div>
        </div>
    )

    render() {
        return (
            <div className="about row mx-0">
                <div className="main col-md-6">
                    {this.text}
                </div>
                <div className="col-md-6 about-img">
                    {this.text}
                </div>
            </div>
        )
    }
}
