import React, { Component } from 'react'

export default class services extends Component {
    state = {
        stype: true
    }

    render() {
        return (
            <div id='services'>
                <h2 className="text-center hf">Services</h2>
                <div className="btns">
                    <button
                        onClick={() => this.setState({
                            ...this.state,
                            stype: true
                        })}> SPECIALIZED</button>
                    <button
                        onClick={() => this.setState({
                            ...this.state,
                            stype: false
                        })}> FEATURED</button>
                </div>
                <div className="container">
                    {this.state.stype ? specialized : featured}
                </div>
            </div>
        )
    }
}

const specialized =
    <div id="specialized">
        <div className="row">
            <div className="col-md-4">
                <h3 className="hf">
                    Hygiene Audit
                </h3>
                <p>
                    Undertaking one time comprehensive compliance audit in the domain of Central Excise, Service Tax and VAT.
                </p>
            </div>
            <div className="col-md-4">
                <h3 className="hf">
                    Legal Opinions
                </h3>
                <p>
                    Offering researched legal opinions in the domain of Customs, Central Excise, Service Tax, VAT and DGFT related issues.
                </p>
            </div>
            <div className="col-md-4">
                <h3 className="hf">
                    Refund Processing
                </h3>
                <p>
                    Processing of all refund / rebate claims under Customs, Excise and Service tax, liasioning with the department and handling disputes relating to the same.
                </p>
            </div>
        </div>
    </div>


const preventive =
    <div>
        <div className="h3 hf">
            Preventive Consultancy
        </div>
        <p>
            The aim of this package is to be with the clients 24x7 and to take care of the issues relating to their domain.
        </p>
        <h4 className="hf">
            Scope:
        </h4>
        <ul>
            <li>
                Monthly/Quarterly checks by Professionals, covering 100% verification of all the connected records.
            </li>
            <li>
                Procedural requirements and compliance thereof in respect to Central Excise, Cenvat Credit, Service Tax and VAT.
            </li>
            <li>
                Periodical Preventive checks by the professionals and overall verification of compliance.
            </li>
            <li>
                Chamber meeting and discussions on requirement basis on classification / valuation / entitlement / eligibility and other issues.
            </li>
            <li>
                Updating with latest information from notifications, department clarifications, trade notices, judgments, and other sources.
            </li>
            <li>
                Online replies to the queries on day to day basis on policy as well as routine issues.
            </li>
            <li>
                Replying all departmental queries / audit paras / show cause notices.
            </li>
            <li>
                Preparation of appeals and appearances before the original / appellate authorities.
            </li>
            <li>
                Review of contracts and agreements to help mitigate the overall incidence of Tax.
            </li>
            <li>
                Assistance in Maintenance of Registers and Records pertaining to Central Excise, Cenvat Credit, Service Tax and VAT.
            </li>
        </ul>
    </div>

const curative =
    <div>
        <h3 className='hf'>
            Curative Consultancy
        </h3>
        <p>
            This will suit those who believe more in fire fighting than installing a fire alarm i.e. as and when an issue emerges in the form of a show cause notice, etc., such issue will be handled by us throughout its course viz., adjudication, appeal, etc. Existing issues (show cause notices pending adjudication, appeal proceedings pending before various appellate authorities, etc) are also taken up in an appropriate manner.
        </p>
        <p>
            The scope of this service would include preparation of replies, appearances, preparation and filing of stay petitions, appeals and appearances before the appellate authorities.
        </p>
        <p>
            The fees of this service is decided on case to case basis depending on its merit, man & brain hour requirements and other relevant factors etc.
        </p>
    </div>

const featured =
    <div id="featured">
        <div className="row">
            <div className="col-md-6">
                {preventive}
            </div>
            <div className="col-md-6">
                {curative}
            </div>
        </div>
    </div>