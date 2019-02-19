import React, { Component } from 'react'
import { ResponsiveLine } from '@nivo/line'
import fuser from '../../axios'

export default class emails_sent_chart extends Component {
    axios = fuser()

    state = {
        data: []
    }

    componentDidMount = () => {
        this.axios.get('api/get_delivery_reports/')
            .then(d => {
                d = d.data
                console.table(d);

                let sent = { id: 'sent', color:'green', data: [] }
                let complaints = { id: 'complaints', color:'hsl(0, 100%, 50%)', data: [] }
                let rejects = { id: 'rejects', data: [] }
                let bounces = { id: 'bounces', data: [] }

                d.reverse().forEach((ele, i) => {
                    i = 14 - i
                    let currDate = new Date()
                    currDate.setDate(currDate.getDate() - i)
                    let x = `${currDate.getMonth()+1}/${currDate.toDateString().slice(8, 10)}`
                    console.log(x);

                    sent.data.push({ x, y: ele.sent })
                    complaints.data.push({ x, y: ele.complaints })
                    rejects.data.push({ x, y: ele.rejects })
                    bounces.data.push({ x, y: ele.bounces })
                })
                d = [sent, complaints, rejects, bounces]
                console.log(d)
                this.setState({
                    ...this.state,
                    data: d
                })// end of setstate
            })
    }


    render = () => (
        <div className='emails-sent-chart'>

            <ResponsiveLine
                data={this.state.data}
                margin={{
                    "top": 50,
                    "right": 15,
                    "bottom": 50,
                    "left": 50
                }}
                xScale={{
                    "type": "point"
                }}
                yScale={{
                    "type": "linear",
                    "stacked": false,
                    "min": "auto",
                    "max": "auto"
                }}
                axisTop={null}
                axisRight={null}
                axisBottom={{
                    "orient": "bottom",
                    "tickSize": 5,
                    "tickPadding": 5,
                    "tickRotation": 0,
                    "legend": "Day of the month",
                    "legendOffset": 36,
                    "legendPosition": "middle"
                }}
                axisLeft={{
                    "orient": "left",
                    "tickSize": 5,
                    "tickPadding": 5,
                    "tickRotation": 0,
                    "legend": "No. of emails sent",
                    "legendOffset": -40,
                    "legendPosition": "middle"
                }}
                curve="linear"
                colors='dark2'
                dotSize={10}
                dotColor="inherit:darker(0.3)"
                dotBorderWidth={2}
                dotBorderColor="#ffffff"
                enableDotLabel={true}
                dotLabel="y"
                dotLabelYOffset={-12}
                animate={true}
                motionStiffness={90}
                motionDamping={15}
                legends={[
                    {
                        "anchor": "top-right",
                        "direction": "column",
                        "justify": false,
                        "translateX": 0,
                        "translateY": 0,
                        "itemsSpacing": 0,
                        "itemDirection": "left-to-right",
                        "itemWidth": 80,
                        "itemHeight": 20,
                        "itemOpacity": 0.75,
                        "symbolSize": 12,
                        "symbolShape": "circle",
                        "symbolBorderColor": "rgba(0, 0, 0, .5)",
                        "effects": [
                            {
                                "on": "hover",
                                "style": {
                                    "itemBackground": "rgba(0, 0, 0, .03)",
                                    "itemOpacity": 1
                                }
                            }
                        ]
                    }
                ]}
            />
        </div>
    )
}
