import React, { Fragment } from 'react';
import DailyTotal from './DailyTotal';
import './Dashboard.css'
import LGASearch from './LGASearch'
import PinnedLGAList from './PinnedLGAList'

const DATA_URL = 'https://discover.data.vic.gov.au/api/3/action/datastore_search'

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
            body: '%7B%22resource_id%22%3A%22bc71e010-253a-482a-bdbc-d65d1befe526%22%2C%22q%22%3A%22%22%2C%22filters%22%3A%7B%7D%2C%22limit%22%3A100%2C%22offset%22%3A0%7D',
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        })
        .then(response => response.json())
        .then(json => {
            console.log(json.result.records[0])
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

    render() {
        return (
            <div className="dashboard">
                <h1> Victoria Covid Dashboard </h1>
                <DailyTotal newCases={this.state.totalNew} dataDate={this.state.dataDate} fetching={this.state.fetching} />
                <LGASearch 
                  lgaOptions={this.state.allLgas}
                  onSelected={this.pinLGA}
                />
                <PinnedLGAList lgas={this.state.pinnedLgas} records={this.state.records}/>
            </div>

        )
    }
}

export default Dashboard