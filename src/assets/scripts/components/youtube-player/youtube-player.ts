/// <reference types="youtube" />

import {Component} from "../../component";
import {Utils} from "../../utils";

const playerConfig = {
    interval: 5000,
    hoverTimeout: 5000
};

enum VideoStatus {
    Paused,
    Playing,
    Ended
}

export class YoutubePlayer extends Component {
    private player: YT.Player;
    private hoverInterval: any;
    private videoStatus: VideoStatus;

    constructor (element) {
        super(element);
        console.log('Youtube Player');
    }

    protected onMounted(): void {
        this.initializeElements();
        this.initializeEvents();
    }

    protected onUnmounted(): void { }

    private initializeElements (): void {
        this.videoStatus = VideoStatus.Paused;
        const playerPlaceholder = this.getRefs('player').first();
        this.player = new YT.Player(playerPlaceholder, {
            events: {
                'onStateChange': this.onStateChange
            }
        });
    }

    private onStateChange (event): void {
        switch(event.data) {
            case 0:
                console.log('video ended');
                this.onStateEnded();
                break;
            case 1:
                console.log('video playing from ' + this.player.getCurrentTime());
                this.onStatePlay();
                break;
            case 2:
                console.log('video paused at ' + this.player.getCurrentTime());
                this.onStatePause();
        }
    }

    private onStateEnded (): void {
        this.videoStatus = VideoStatus.Ended
    }

    private onStatePause (): void {
        this.videoStatus = VideoStatus.Paused
    }

    private onStatePlay (): void {
        this.videoStatus = VideoStatus.Playing
    }

    private initializeEvents (): void {
        Utils.addEvent(this.player, 'mouseover', event => {
            if (this.videoStatus === VideoStatus.Paused) {
                this.hoverInterval = setInterval(() => {
                    console.log('Hover OK');
                }, playerConfig.hoverTimeout);
            }
        });

        Utils.addEvent(this.player, 'mouseout', event => {
            clearInterval(this.hoverInterval);
        });
    }

    private stopVideo (): void {
        this.player.stopVideo();
    }

    private  playVideo (): void {
        this.player.playVideo();
    }
}