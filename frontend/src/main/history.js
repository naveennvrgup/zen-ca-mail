import React, { Component } from 'react'
import { scroller } from 'react-scroll'

export default class history extends Component {
    componentDidMount = () => {
        scroller.scrollTo('history', {
            duration: 500,
            smooth: true,
            offset: -100,
        })
    }

    componentWillUnmount() {
        scroller.scrollTo('aboutus', {
            duration: 500,
            smooth: true,
            offset: -100,
        })
    }
    


    render() {
        return (
            <div ref={ele => this.history = ele} id='history'>
                <div className="container">
                    <h2 className="hf text-center mt-5">Brief Profile</h2>
                    <p className='mt-5'>
                        Our Associate is qualified as Chartered Accountant in May 2011 and after his qualification he got the privilege to for work about 3 years with distinguished Author of Law, Practice and Procedure of Service Tax 2 Vols and his renowned legal firm J. K. Mittal & Co. New Delhi (Advocates and Legal Consultants) and presently practicing independently etc.
                </p>
                    <p>
                        In three years of experience with J.K.Mittal & Co. Advocates and legal consultants and after completing 4 years in Independent practice in Chhattisgarh and New Delhi he has handled following and Key Role Undertaken is as follows:
                </p>
                    <ul>
                        <li>
                            <div>
                                Reply to show cause notice, Refund Applications, Appeal before the Commissioner (Appeals), Appeal before the Tribunal (CESTAT) and drafting of Opinions pertaining to service tax/Excise/Customs/VAT, assistance in drafting of Writ Petitions before the High Courts.
                            </div>
                        </li>
                        <li>
                            <div>
                                Handled the GST related Search and Seizure, prosecution cases.
                            </div>
                        </li>
                        <li>
                            <div>
                                Given various representations to reduce the rate of GST and suggested various exemptions to the GST Council.
                            </div>
                        </li>
                        <li>
                            <div>
                                Appeared and represented before the Central Excise and Service tax Appellate Tribunal (CESTAT), New Delhi, Kolkata, Mumbai etc.
                            </div>
                        </li>
                        <li>
                            <div>
                                Independently extended the arguments before the Larger Bench of Tribunal (CESTAT) in the long awaited and highest revenue implication matter of free of cost issue (commonly known as FOC matter) which is widely published Judgement. (Reported in the name of Bhayana Builders & Others)
                            </div>
                        </li>
                        <li>
                            <div>
                                Represented the matter before the various departmental authorities at Delhi, Chandigarh, Ludhiana, Pune, Raipur, Gauhati, Shilong, Hyderabad, Patna, Nagpur, Mumbai, Bangalore, Ranchi and Kolkata including Commissioner (Appeals), Commissioner, Additional Commissioner and Joint Commissioner etc.
                            </div>
                        </li>
                        <li>
                            <div>
                                Compliance relating to GST like Registration, filing of service tax returns etc.
                            </div>
                        </li>
                        <li>
                            <div>
                                Liasoning and follow up with the Tax Authorities against tax issues/notices and always tried to resolve the problem in short span of time by taking the issue with higher authorities, if required.
                            </div>
                        </li>
                        <li>
                            <div>
                                Assisted & advised the clients at the time of Departmental, CERA, CAG and Anti-Evasion audit by ensuing that balance between the Departmental requirement for information and clients benefits.
                            </div>
                        </li>
                        <li>
                            <div>
                                Readiness for departmental audit and submission of audit replies.
                            </div>
                        </li>
                        <li>
                            <div>
                                Assisted Mr. J.K. Mittal before Various Hon’ble High Court of Delhi, Allahabad, Guwahati and Chandigarh and Kolkata.
                            </div>
                        </li>
                        <li>
                            <div>
                                Assisted Mr. J.K. Mittal in authoring of his Book named ‘Law, procedure and practice of Service tax’.
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}
