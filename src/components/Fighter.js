import React, { Component } from 'react'

import './Fighter.css'

function generateRandomBrightColor() {
    // 0: hsl, 1: gradient
    const BRIGHT_COLOR_SETTING = 1

    if (BRIGHT_COLOR_SETTING === 1) {
        const lightness = (85 + 10 * Math.random())
        
		const gradient = `
			linear-gradient(
				hsl(
					${360 * Math.random()}, 
					${(25 + 70 * Math.random())}%, 
					${lightness}%
				),
				hsl(
                    ${360 * Math.random()}, 
                    ${(25 + 70 * Math.random())}%, 
                    ${lightness - 20}%
                )
			)
        `
        return gradient
    } 

    // DEFAULT
    else {
        return 'hsl(' + 360 * Math.random() + ',' +
            (25 + 70 * Math.random()) + '%,' +
            (85 + 10 * Math.random()) + '%)'
    }
}

function dynamicBarStyles() {
    return {
        background: generateRandomBrightColor()
    }
}

export default class Fighter extends Component {
    state = {
        barStyle: [...Array(this.props.characterState.wins)].map(dynamicBarStyles)
    }

	increment = () => {
		this.setState({
			barStyle: this.state.barStyle.concat(dynamicBarStyles())
        })

		this.props.incrementWin(this.props.characterState.playerName)
    }

	baseStyles = (place) => {
		return {
			0: {
				background: 'linear-gradient(#ffe161, #dc0)',
			},
			1: {
				background: 'linear-gradient(#eee, #bbb)',
			},
			2: {
				background: 'linear-gradient(#e59944, #c71)',
			},
		}[place]
	}
	
    render() {
        const { place, wins, playerName } = this.props.characterState

        return (
            <div className="fighter-container">
                <div className="fighter">

                    <div className="bars-section">
						<div className="wins">
							{wins}
						</div>

						<div className="bars">
                            {[...Array(wins)].map((_, index) =>
                                <div
                                    className="bar"
                                    style={this.state.barStyle[index]}
                                    key={index}
                                />
                            )}
						</div>
                    </div>

                    <div
                        style={this.baseStyles(place)}
                        className="character-section"
                        onClick={this.increment}
                    >
                        <img src={this.props.img} alt={playerName} />
                    </div>

                </div>
            </div>
        )
    }
}
