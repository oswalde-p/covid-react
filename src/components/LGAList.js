import React from 'react';
import './LGAList.css';
import LGAListItem from './LGAListItem'


class LGAList extends React.Component {
    render() {
        return (
          <div className="lga-list">
            <h2>{this.props.title}</h2>
            <ul>
              {this.props.lgas.map(lga => <LGAListItem data={this.props.records[lga]} key={lga}/>)}
            </ul>
          </div>
        )
    }
}

export default LGAList