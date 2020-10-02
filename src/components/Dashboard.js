import React from 'react';
import DailyTotal from './DailyTotal';
import './Dashboard.css'
import LGASearch from './LGASearch'
import LGAList from './LGAList'

const DATA_URL = 'https://discover.data.vic.gov.au/api/3/action/datastore_search'
const REQUEST_BODY = '%7B%22resource_id%22%3A%22bc71e010-253a-482a-bdbc-d65d1befe526%22%2C%22q%22%3A%22%22%2C%22filters%22%3A%7B%7D%2C%22limit%22%3A100%2C%22offset%22%3A0%7D'

function processRecords(records) {
    const transformed = {}
    const allLgas = []
    records.forEach(rec => {
        if (!rec.LGADisplay) return
        const key = rec.LGADisplay.toLowerCase()
        allLgas.push(key)
        transformed[key] = {
            new: Number(rec.new),
            active: Number(rec.active),
            cases: Number(rec.cases),
            population: Number(rec.population),
            displayName: rec.LGADisplay
        }
    })
    return { records: transformed, allLgas }
}

class Dashboard extends React.Component {
    constructor() {
        super()
        this.state = {
            searchTerm: '',
            records: {},
            dataDate: null,
            totalNew: null,
            fetching: false,
            allLgas: [],
            pinnedLgas: []
        }

        this.pinLGA = this.pinLGA.bind(this)
    }
    componentDidMount() {
        this.fetchData()
    }

    fetchData() {
        this.setState({fetching: true})
        fetch(DATA_URL, {
            method: 'POST',
            body: REQUEST_BODY,
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        })
        .then(response => response.json())
        .then(json => {
            let sum = 0
            json.result.records.map(rec => sum += Number(rec.new))
            const { records, allLgas } = processRecords(json.result.records)
            this.setState({
                records,
                allLgas,
                totalNew: sum,
                dataDate: json.result.records[0]['data_date']
            })
            this.setState({fetching: false})
        })
    }

    pinLGA(lga) {
        console.log(`pinning ${lga}`)
        this.setState({
            pinnedLgas: [...this.state.pinnedLgas, lga]
        })
    }

    topLgas() {
        if (!this.state.records) return []
        const lgas = Object.values(this.state.records)
        return lgas.sort((a, b) => b.new - a.new).slice(0,5).map(obj => obj.displayName.toLowerCase())
    }

    render() {
        return (
            <div className="dashboard">
                <h1> Victoria Covid Dashboard </h1>
                <DailyTotal newCases={this.state.totalNew} dataDate={this.state.dataDate} fetching={this.state.fetching} />
                <LGAList title="Top LGAs" lgas={this.topLgas()} records={this.state.records}/>
                <a href="https://knowyourcouncil.vic.gov.au/councils" target="_blank" rel="noopener noreferrer">What's an LGA?</a>
                
                <LGAList title="Pinned LGAs" lgas={this.state.pinnedLgas} records={this.state.records}/>
                <LGASearch 
                  lgaOptions={this.state.allLgas}
                  onSelected={this.pinLGA}
                />
            </div>

        )
    }
}

export default Dashboard