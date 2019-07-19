import React from "react";

export default function gstlinks() {
    return (
        <div className="gst_links pt-4 pb-4">
            <h3 className="hf">GST Resources:</h3>
            <div className="gstlink">
                <a
                    target="_blank"
                    className="three"
                    rel="noopener noreferrer"
                    href="http://www.cbic.gov.in/resources//htdocs-cbec/gst/gst-book-acts.pdf;jsessionid=D1649A6A0C68EEC05FC22C5F0A80C087"
                >
                    Acts
                </a>
            </div>
            <div className="gstlink">
                <a
                    target="_blank"
                    className="three"
                    rel="noopener noreferrer"
                    href="http://www.cbic.gov.in/resources//htdocs-cbec/gst/Rule.pdf"
                >
                    Rules
                </a>
            </div>
            <div className="gstlink">
                <a
                    target="_blank"
                    className="three"
                    rel="noopener noreferrer"
                    href="http://www.cbic.gov.in/resources//htdocs-cbec/gst/Notification.pdf;jsessionid=7A289CF9C866F95BC0D3A4924E3475DA"
                >
                    Notifications
                </a>
            </div>
            <div className="gstlink">
                <a
                    target="_blank"
                    className="three"
                    rel="noopener noreferrer"
                    href="http://www.cbic.gov.in/resources//htdocs-cbec/gst/Circular.pdf;jsessionid=0329113CAB193B993814F0B29B534999"
                >
                    Circulars and Orders
                </a>
            </div>
        </div>
    );
}
