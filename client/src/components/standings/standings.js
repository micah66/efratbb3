import React, {Component} from 'react';
import './standings.css';

class Standings extends Component {
  constructor() {
    super()
    this.state = {
      standings: []
    }
  }

  componentDidMount() {
    fetch('/standings')
      .then(res => res.json())
      .then(res => {
        const standings = Object.keys(res).reduce((standingsSoFar, teamName) => {
          res[teamName].name = teamName
          standingsSoFar.push(res[teamName])
          return standingsSoFar
        }, [])
          .sort((a,b) => {
            if (!(b.wp - a.wp)) {
              return b.rd - a.rd
            }
            return b.wp - a.wp
          })

        this.setState({standings}, () => console.log('standings fetched...', standings))
      })
  }

  render() {
    return (
      <div>
      </div>
    );
  }
}

export default Standings;
