import React, { Component } from 'react'

export default class values extends Component {
    render() {
        return (
            <div className='values' id='values'>
                <h2 className="hf text-center wow fadeInUp">What We Value</h2>
                <p className="text-center mt-5 desc wow fadeIn" data-wow-duration='2s' data-wow-delay='0.5s'>
                    We firmly believe that our values made us what we are today.
                    <br />
                    We are fully committed to upholding these values.
                </p>

                <div className="list row mt-5">
                    <div className="value col-md-3 wow fadeInUp" data-wow-delay='0.3s'>
                        <h3 className='hf'>
                            High standard of ethics
                        </h3>
                        <p>
                        A strong sense of fairness has always been the guiding light for all our decisions - big and small. Highest standard of ethics is maintained while dealing with government departments. With clients, confidentiality and conflicts are addressed first. Transparency is the very crux of professionalism and we, believe in - letter and spirit.
                        </p>
                    </div>
                    <div className="value col-md-3  wow fadeInUp" data-wow-delay='0.5s'>
                        <h3 className='hf'>Teamwork</h3>
                        <p>
                        In today's complex world a multi-disciplinary approach is needed. We harness the strengths, skills and abilities of the attorneys, engineers, accounts and scientists - they work as a team. This helps us to deliver customised solutions to clients.
                        </p>
                    </div>
                    <div className="value col-md-3  wow fadeInUp" data-wow-delay='0.8s'>
                        <h3 className='hf'>Passion for quality</h3>
                        <p>
                        We are passionate about quality. We are dedicated to the pursuit of perfection and every client is treated like our only client.
                        </p>
                    </div>
                    <div className="value col-md-3  wow fadeInUp" data-wow-delay='1s'>
                        <h3 className='hf'>Client Satisfaction</h3>
                        <p>
                        Our mantra is client satisfaction. We strive to understand the needs of clients, make optimum use of our resources and go the extra mile to ensure client satisfaction.
                        </p>
                    </div>
                </div>
            </div>
        )
    }
}
