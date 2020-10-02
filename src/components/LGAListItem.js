import React from 'react';
import './LGAListItem.css';


class LGAListItem extends React.Component {
    render() {
        if (!this.props.data) return
        const { data } = this.props
        return (
          <li className="lga-list-item">
              <span>{data.displayName}</span>
              <span>{data.new} new</span>
              <span>{data.cases} total</span>
              <span>{(data.cases / data.population).toLocaleString()} %</span>
          </li>
        )
    }
}

export default LGAListItem