import React, { Component } from 'react'


export default class Services extends Component {
  render() {
    return (
      <div className='services my-5'>
        <h2 className="text-center hf wow fadeIn" data-wow-duration='1s'>Practices</h2>

        <div className="specialized">
          {/* specialized */}
          <div className="head mt-5">
            <div className="spark wow zoomIn" data-wow-duration='1s'></div>
            <h3 className=''>Specialized</h3>
          </div>

          <div className="services_list">
            <div className="service wow zoomIn" data-wow-delay='0.1s'>
              <img src={require('../assets/pratices/service tax.jpg')} alt=""/>
              <div className="name">Service Tax, Excise, Customs</div>
            </div>
            <div className="service wow zoomIn" data-wow-delay='0.4s'>
              <img src={require('../assets/pratices/gst.jpg')} alt=""/>
              <div className="name">Goods and Service tax</div>
            </div>
            <div className="service wow zoomIn" data-wow-delay='0.2s'>
              <img src={require('../assets/pratices/epf.jpg')} alt=""/>
              <div className="name">Provident Fund</div>
            </div>
            <div className="service wow zoomIn" data-wow-delay='0.3s'>
              <img src={require('../assets/pratices/esic.jpg')} alt=""/>
              <div className="name">ESIC</div>
            </div>
            <div className="service wow zoomIn" data-wow-delay='0.6s'>
              <img src={require('../assets/pratices/rera.jpg')} alt=""/>
              <div className="name">RERA</div>
            </div>
            <div className="service wow zoomIn" data-wow-delay='0.5s'>
              <img src={require('../assets/pratices/fema.jpg')} alt=""/>
              <div className="name">FEMA</div>
            </div>
            <div className="service wow zoomIn" data-wow-delay='0.9s'>
              <img src={require('../assets/pratices/moneylau.jpg')} alt=""/>
              <div className="name">Money Laundering</div>
            </div>
            <div className="service wow zoomIn" data-wow-delay='0.8s'>
              <img src={require('../assets/pratices/sebi.jpg')} alt=""/>
              <div className="name">SEBI related litigations</div>
            </div>
            <div className="service wow zoomIn" data-wow-delay='0.2s'>
              <img src={require('../assets/pratices/exports.jpg')} alt=""/>
              <div className="name">Export incentives</div>
            </div>
            <div className="service wow zoomIn" data-wow-delay='0.3s'>
              <img src={require('../assets/pratices/electricity.jpg')} alt=""/>
              <div className="name">Electricity Law</div>
            </div>
          </div>
        </div>

        {/* Featured */}
        <div className="featured">
          <div className="head mt-5">
            <div className="spark  wow zoomIn" data-wow-duration='1s'></div>
            <h3>Featured</h3>
          </div>

          <div className="services_list">
            <div className="service wow zoomIn" data-wow-delay='0.2s'>
              <img src={require('../assets/pratices/Preventive.jpg')} alt=""/>
              <div className="name">Preventive Consultancy</div>
            </div>
            <div className="service wow zoomIn" data-wow-delay='0.5s'>
              <img src={require('../assets/pratices/curative.jpg')} alt=""/>
              <div className="name">Curative Consultancy</div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
