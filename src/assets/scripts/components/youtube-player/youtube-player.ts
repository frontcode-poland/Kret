import {Component} from "../../component";
import {Utils} from "../../utils";

const playerConfig = {
    interval: 5000,
    hoverTimeout: 2000
};

enum VideoStatus {
    Paused,
    Playing,
    Ended
}

export class YoutubePlayer extends Component {
    private player: any;
    private playerElement: HTMLIFrameElement;
    private hoverTimeout: any;
    private playingTimeout: any;
    private videoStatus: VideoStatus;

    constructor (element) {
        super(element);
    }

    protected onMounted(): void {
        this.createScript();
        this.checkIfApiLoaded();
    }

    protected onUnmounted(): void { }

    private createScript (): void {
        let tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        let firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }

    private checkIfApiLoaded () {
        var checkIframeReadyInterval = setInterval (() => {
            if (window['YT']) {
                if (window['YT'].loaded) {
                    this.initialize();
                    clearInterval(checkIframeReadyInterval);
                }
            }
        });
    };

    public initialize (): void {
        this.initializeElements();
    }

    private initializeElements (): void {
        this.videoStatus = VideoStatus.Paused;
        this.player = new window['YT']['Player']('player', {
            videoId: 'qL7zrWcv6XY',
            playerVars: {
                rel: 0,
                showinfo: 0,
                modestbranding: true
            },
            events: {
                'onReady': (event) => {this.onReady(event)},
                'onStateChange': (event) => {this.onStateChange(event)},
            }
        });
    }

    private onReady (event): void {
        this.playerElement = this.player.getIframe();
        this.initializeEvents();
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
        this.videoStatus = VideoStatus.Ended;
    }

    private onStatePause (): void {
        this.videoStatus = VideoStatus.Paused;
    }

    private onStatePlay (): void {
        this.videoStatus = VideoStatus.Playing;
        this.playingTimeout = setTimeout(() => {
            this.pauseVideo();
        }, playerConfig.interval);
    }

    private initializeEvents (): void {
        Utils.addEvent(document, 'mousemove', event => {
           console.log('Mouse move');
        });
        Utils.addEvent(this.playerElement, 'mousemove', event => {
            console.log(this.videoStatus);
            if (this.videoStatus === VideoStatus.Paused) {
                this.hoverTimeout = setTimeout(() => {
                    this.playVideo();
                }, playerConfig.hoverTimeout);
            }
        });

        Utils.addEvent(this.playerElement, 'mouseout', event => {
            clearTimeout(this.hoverTimeout);
        });
    }

    private pauseVideo (): void {
        this.player.pauseVideo();
    }

    private playVideo (): void {
        this.player.playVideo();
    }
}