import React from 'react';
import './LGAListItem.css';


class LGAListItem extends React.Component {
    render() {
        return (
          <li className="lga-list-item">
              {`${this.props.data.displayName}: ${this.props.data.new} new`}
          </li>
        )
    }
}

export default LGAListItem