import React, { Component } from 'react'

import './App.css'
import Fighter from './components/Fighter'

// type Fighter = {
//   wins: number
//   img: string
//   playerName: string
//   place: number
// }

/**
 * generate player default state based on player
 * @type {String -> Fighter}
 */
function makeFighter(playerName) {
	let fighter = {
		wins: 0,
		playerName: playerName
	}
  
	if (playerName === 'liu_kang') {
		fighter.wins = 4
		fighter.img = 'https://vignette.wikia.nocookie.net/mkwikia/images/0/07/Kung_Lao_1MKX.png/revision/latest?cb=20150517024915'
	} else if (playerName === 'kung_lao') {
		fighter.wins = 10
		fighter.img = 'https://vignette.wikia.nocookie.net/mkwikia/images/4/44/Raiden_mkx_Render.png/revision/latest?cb=20150324024119'
	} else if (playerName === 'raiden') {
		fighter.wins = 2
		fighter.img = 'https://vignette.wikia.nocookie.net/mkwikia/images/e/e4/Liu_Kang_5.png/revision/latest?cb=20150516165245'
	} 

	return fighter
}

export default class App extends Component {
  state = {
    liu_kang: makeFighter('liu_kang'),
    kung_lao: makeFighter('kung_lao'),
    raiden: makeFighter('raiden'),
  }
  
  // Click on player icon to increment that player's wins by one.
  incrementWin = playerName => {
    this.setState({
      [playerName]: {
        ...this.state[playerName],
        wins: this.state[playerName].wins + 1,
      }
    })

    //var audio = new Audio('http://soundfxcenter.com/video-games/mortal-kombat-4/8d82b5_Mortal_Kombat_4_Outstanding_Sound_Effect.mp3');
    //audio.play();
  }

  // Render to main APP dom
  render() {
    // most wins first
    const fighters = Object.values(this.state)
      .sort((f1, f2) => f1.wins > f2.wins ? -1 : 1)
      .map((fighter, index) => ({ ...fighter, place: index }))

    return (
      <div className="App">
	  	<div className="header">KILL KOUNTER</div>
        <div className="items-container">
          {fighters.map((fighter, index) => (
            <div className="item-container" key={index}>
              <Fighter
                characterState={fighter}
                incrementWin={this.incrementWin}
                img={fighter.img}
              />
            </div>
          ))}
        </div>
      </div>
    )
  }
}
