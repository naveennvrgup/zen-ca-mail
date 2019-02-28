import React, { Component } from 'react'

export default class values extends Component {
    render() {
        return (
            <div className='values' id='values'>
                <div className="container">
                    <h2 className="hf text-center">What we <span className="clr-yg">Value</span></h2>
                    <p className="text-center mt-3">
                        We firmly believe that our values are what that made us what we are today.
                    <br />
                        We are fully committed to the uphold these values
                </p>

                    <div className="list row">
                        <div className="value col-md-6">
                            <h3 className='hf'>
                                High standard of ethics
                        </h3>
                            <p>
                                A strong sense of fairness has always been the guiding light for all our decisions
                                - big and small. Highest standard of ethics is maintained while dealing with government departments.
                                With clients confidentiality and confilicts are addressed first. Transparency is the very crux of
                                professionalism and we, in L&amp;S, believe in - letter and spirit.
                        </p>
                        </div>
                        <div className="value col-md-6">
                            <h3 className='hf'>Teamwork</h3>
                            <p>
                                In today's complex world a multi-disciplinary approach is neeeded. In L&amp;S, we harness
                                the strengths, skills and abilities of the attorneys, engineers, accounts and scientists -
                                they work as a team. This helps us to deliver customised solutions to clients.
                        </p>
                        </div>
                        <div className="value col-md-6">
                            <h3 className='hf'>Passion for quality</h3>
                            <p>All attorneys and professionals associated with L&amp;S have one thing in common
                                - passion for quality. We are dedicated to the pursuit of perfection and
                                every client is treated as our only client.
                        </p>
                        </div>
                        <div className="value col-md-6">
                            <h3 className='hf'>Client Satisfaction</h3>
                            <p>Client statisfaction is the mantra at L&amp;S. We strive to understand the needs of clients,
                                make optimum use of our resources and go the extra mile to ensure client statisfaction.
                        </p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
