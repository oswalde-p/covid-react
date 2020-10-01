import React from 'react';
import './DailyTotal.css';


class DailyTotal extends React.Component {
    render() {
        return (
          <div className="daily-total">
            <h1> Daily Total </h1>
            {this.props.fetching ? 
              'Fetching...' :
              <p>New cases for {this.props.dataDate}: {this.props.newCases}</p>
            }
          </div>
        )
    }
}

export default DailyTotal