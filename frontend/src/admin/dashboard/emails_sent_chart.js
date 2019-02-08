import { render } from 'react-dom'
import { ResponsiveStream } from '@nivo/stream'

import React, { Component } from 'react'

export default class emails_sent_chart extends Component {
    render() {
        return (
            <div className='emails-sent-chart'>
                <ResponsiveStream
                    data={[{
                        "Raoul": 17,
                        "Josiane": 197,
                        "Marcel": 161,
                        "René": 155,
                        "Paul": 167,
                        "Jacques": 144
                    },
                    {
                        "Raoul": 178,
                        "Josiane": 12,
                        "Marcel": 172,
                        "René": 137,
                        "Paul": 130,
                        "Jacques": 107
                    },]}
                    keys={[
                        "Raoul",
                        "Josiane",
                        "Marcel",
                        "René",
                        "Paul",
                        "Jacques"
                    ]}
                    margin={{
                        "top": 50,
                        "right": 110,
                        "bottom": 50,
                        "left": 60
                    }}
                    axisBottom={{
                        "orient": "bottom",
                        "tickSize": 5,
                        "tickPadding": 5,
                        "tickRotation": 0,
                        "legend": "",
                        "legendOffset": 36
                    }}
                    axisLeft={{
                        "orient": "left",
                        "tickSize": 5,
                        "tickPadding": 5,
                        "tickRotation": 0,
                        "legend": "",
                        "legendOffset": -40
                    }}
                    offsetType="none"
                    fillOpacity={0.85}
                    borderColor="#000"
                    defs={[
                        {
                            "id": "dots",
                            "type": "patternDots",
                            "background": "inherit",
                            "color": "#2c998f",
                            "size": 4,
                            "padding": 2,
                            "stagger": true
                        },
                        {
                            "id": "squares",
                            "type": "patternSquares",
                            "background": "inherit",
                            "color": "#e4c912",
                            "size": 6,
                            "padding": 2,
                            "stagger": true
                        }
                    ]}
                    fill={[
                        {
                            "match": {
                                "id": "Paul"
                            },
                            "id": "dots"
                        },
                        {
                            "match": {
                                "id": "Marcel"
                            },
                            "id": "squares"
                        }
                    ]}
                    dotSize={8}
                    dotBorderWidth={2}
                    dotBorderColor="inherit:brighter(0.7)"
                    animate={true}
                    motionStiffness={90}
                    motionDamping={15}
                    legends={[
                        {
                            "anchor": "bottom-right",
                            "direction": "column",
                            "translateX": 100,
                            "itemWidth": 80,
                            "itemHeight": 20,
                            "itemTextColor": "#999",
                            "symbolSize": 12,
                            "symbolShape": "circle",
                            "effects": [
                                {
                                    "on": "hover",
                                    "style": {
                                        "itemTextColor": "#000"
                                    }
                                }
                            ]
                        }
                    ]}
                />
            </div>
        )
    }
}


// make sure parent container have a defined height when using responsive component,
// otherwise height will be 0 and no chart will be rendered.
// website examples showcase many properties, you'll often use just a few of them.