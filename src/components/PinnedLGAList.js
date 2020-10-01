import React from 'react';
import './PinnedLGAList.css';
import LGAListItem from './LGAListItem'


class PinnedLGAList extends React.Component {
    render() {
        return (
          <div className="pinned-lga-list">
            <h1> PinnedLGAList </h1>
            {this.props.lgas.map(lga => {
              return <LGAListItem data={this.props.records[lga]} />
            })}
          </div>
        )
    }
}

export default PinnedLGAList