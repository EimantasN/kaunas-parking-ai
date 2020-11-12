import React, { Component } from 'react';
import ReactPlayer from 'react-player'

export default class Player extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loop: false,
            playing: true,
            muted: true,
            url: 'https://www.youtube.com/watch?v=eJ7ZkQ5TC08&ab_channel=EarthCam'
        }
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    render() {
        return (
            <div className="playerContainer">
                <div className="player">
                <ReactPlayer
                    loop={this.state.loop}
                    playing={this.state.playing}
                    controls={false}
                    muted={this.state.muted}
                    url={this.state.url} />
                </div>
            </div>
        );
    }
}