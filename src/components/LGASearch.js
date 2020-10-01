import React from 'react';
import './LGASearch.css';


class LGASearch extends React.Component {
    constructor() {
        super()
        this.state = {
            selected: ''
        }

        this.onSubmit = this.onSubmit.bind(this)
    }

    onSubmit(evt) {
        evt.preventDefault()
        this.props.onSelected(this.state.selected)
        this.setState({selected: ''})
    }

    render() {
        return (
          <div className="lga-search" onSubmit={this.onSubmit}>
            <form>
                <datalist id="lga-choice">
                    {this.props.lgaOptions.map(opt => {
                        return <option value={opt} key={opt.toLowerCase()}/>
                    })}
                </datalist>
                <input 
                    type="text"
                    placeholder="Search for LGA..."
                    list="lga-choice"
                    value={this.state.selected}
                    onChange={ evt => this.setState({selected: evt.target.value.toLowerCase()})}></input>
                <button>Add</button>
            </form>
          </div>
        )
    }
}

export default LGASearch