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

    read_less_handler = () => this.setState({
        ...this.state,
        show_history: false
    })


    render() {
        const readmore_btn = <button
            onClick={this.read_more_handler}
            id='read_more'>read more</button>

        const readless_btn = <button
            onClick={this.read_less_handler}
            id='read_more'>read less</button>

        return (
            <div className='aboutus' id='aboutus'>
                <div className="container">
                    <div className="row">
                        <div className="col-md-5 px-3 px-md-5">
                            <div className="info mt-4 text-center">
                                <h4 className="hf wow fadeInUp">J K GUPTA</h4>
                                <div className='font-weight-bold wow zoomIn' data-wow-delay='0.5s'>B.COMM, FCA, LLB</div>
                            </div>
                            <p className='text-justify mt-4'>
                                Our Associate is
                                Powered by 10 Yrs of Experience in Litigations, advisories in the Customs,
                                Central Excise & Service Tax, GST, Labor laws, provident fund, ESIC, Goods
                                and Services Tax etc.
                        </p>
                            <div className={`text-center d-none d-md-block `}>
                                {this.state.show_history ? readless_btn : readmore_btn}
                            </div>
                        </div>

                        <div className="col-md-7 d-none d-md-block">
                            <h2 className="hf text-center wow fadeInUp">About Us</h2>
                            <p className='text-justify mt-4'>
                                Our core competency and area of expertise is Indirect Taxation, and specializes in all aspects of GST, Excise, Service Tax, Customs, VAT, Labor laws, Money laundering, etc. and carries a blend of Litigation, Advisories and Compliance experience.
                        </p>
                            <p className='text-justify '>
                                We have good hands-on experience in carrying out diagnostic review of business operations with respect to Indirect Taxation, opinion & advisory services, litigation services at all appropriate forums, representation before the TRU/ CBEC/ DGFT/ CBDT, etc. for various matters concerning to trade, industry and commerce, process review, structuring of business model,  and providing  Strategic  legal  &  Taxation  services  to  a number  of  clients across diverse sectors.
                        </p>
                            <p className='text-justify '>
                                We have authored 1000+ articles in the domain of indirect taxation and our associate is also a Member of Excise Customs & Gold Control Bar Association (Commonly known as CESTAT Bar Association) at New Delhi.
                        </p>
                        </div>
                    </div>
                </div>
                {this.state.show_history ? <History /> : ''}
                <div className="text-center mt-5">
                    {this.state.show_history ? readless_btn : ''}
                </div>
            </div>
        )
    }
}
