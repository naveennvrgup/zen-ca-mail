import React, { Component } from 'react'
import History from './history'

export default class aboutus extends Component {
    state = {
        show_history: false
    }

    read_more_handler = () => this.setState({
        ...this.state,
        show_history: true
    })

    render() {
        return (
            <div className='aboutus' id='aboutus'>
                <div className="container">
                    <div className="row">
                        <div className="col-md-5 px-3 px-md-5">
                            <div className="client-pic mx-auto"></div>
                            <div className="info mt-4 text-center">
                                <h5 className="hf">J K GUPTA</h5>
                                <div>Chartered Accountant</div>
                            </div>
                            <p className='text-justify mt-4'>
                                Our Associate is a
                                Powered by 10 Yrs of Experience in Litigations, advisories in the Customs,
                                Central Excise & Service Tax, GST, Labor laws, provident fund, ESIC, Goods
                                and Services Tax etc.
                        </p>
                            {!this.state.show_history ? <div className={`text-center d-none d-md-block `}>
                                <button
                                    onClick={this.read_more_handler}
                                    id='read_more'>read more</button>
                            </div> : null}
                        </div>

                        <div className="col-md-7 d-none d-md-block">
                            <h2 className="hf">About</h2>
                            <p className='text-justify mt-4'>
                                Our core competency and area of expertise is Indirect Taxation, and specializes in all aspects of GST, Excise, Service Tax, Customs, VAT, Labor laws, Money laundering, etc. and carries a blend of Litigation, Advisories and Compliance experience.
                        </p>
                            <p className='text-justify '>
                                We have good hands on experience in carrying out diagnostic review of business operations with respect to Indirect Taxation, opinion & advisory services, litigation services at all appropriate forum, representation before the TRU/ CBEC/ DGFT/ CBDT, etc. for various matters concerning to trade, industry and commerce, process review, structuring of business model,  and provides  Strategic  legal  &  Taxation  services  to  number  of  clients across diverse sectors.
                        </p>
                            <p className='text-justify '>
                                We have Authored 1000+ articles in the domain of indirect taxation and our associate is also a Member of Excise Customs & Gold Control Bar Association (Commonly known as CESTAT Bar Association) at New Delhi.
                        </p>
                        </div>
                    </div>
                </div>
                {this.state.show_history ? <History /> : ''}
            </div>
        )
    }
}
