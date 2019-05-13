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
        <h2>Standings Page</h2>
        <table style={{width:'80vw', maxWidth: '800px', minWidth: '200px'}}>
          <tr>
            <th id={'teamTableHead'}> Team </th>
            <th> W </th>
            <th> L </th>
            <th> T </th>
            <th> % </th>
            <th> RS </th>
            <th> RA </th>
            <th> RD </th>
          </tr>
          <tbody>
            {this.state.standings.map((team, i) =>
              <tr key={i}>
                <td className="teamName">{team.name}</td>
                <td>{team.w}</td>
                <td>{team.l}</td>
                <td>{team.t}</td>
                <td>{team.wp}</td>
                <td>{team.rs}</td>
                <td>{team.ra}</td>
                <td>{team.rd}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Standings;
