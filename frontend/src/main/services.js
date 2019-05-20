import React, { Component } from 'react'

export default class Services extends Component {
  render() {
    return (
      <div className='services my-5'>
        <h2 className="text-center hf">Services</h2>

        <div className="specialized">
          {/* specialized */}
          <div className="head mt-5">
            <div className="spark"></div>
            <h3>Specialized</h3>
          </div>

          <div className="services_list">
            <div className="service">
              <i className="fas fa-piggy-bank fa-2x"></i>
              <div className="name">Service Tax, Excise, Customs</div>
            </div>
            <div className="service">
              <i className="fas fa-hand-holding-usd fa-2x"></i>
              <div className="name">Goods and Service tax</div>
            </div>
            <div className="service">
              <i className="fas fa-hand-holding-heart fa-2x"></i>
              <div className="name">Provident Fund</div>
            </div>
            <div className="service">
              <i className="fas fa-user-tie fa-2x"></i>
              <div className="name">ESIC</div>
            </div>
            <div className="service">
              <i className="fas fa-building fa-2x"></i>
              <div className="name">RERA</div>
            </div>
            <div className="service">
              <i className="fas fa-exchange-alt fa-2x"></i>
              <div className="name">FEMA</div>
            </div>
            <div className="service">
              <i className="fas fa-dollar-sign fa-2x"></i>
              <div className="name">Money Laundering</div>
            </div>
            <div className="service">
              <i className="fas fa-shield-alt fa-2x"></i>
              <div className="name">SEBI related litigations</div>
            </div>
            <div className="service">
              <i className="fas fa-box-open fa-2x"></i>
              <div className="name">Export incentives</div>
            </div>
            <div className="service">
              <i className="fas fa-bolt fa-2x"></i>
              <div className="name">Electricity Law</div>
            </div>
          </div>
        </div>

        {/* Featured */}
        <div className="featured">
          <div className="head mt-5">
            <div className="spark"></div>
            <h3>Featured</h3>
          </div>

          <div className="services_list">
            <div className="service">
              <i className="fas fa-chalkboard-teacher fa-2x"></i>
              <div className="name">Preventive Consultancy</div>
            </div>
            <div className="service">
              <i className="fas fa-chart-line fa-2x"></i>
              <div className="name">Curative Consultancy</div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
