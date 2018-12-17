import {Component} from "../../component";
import {Utils} from "../../utils";
import * as Plyr from 'plyr';
import {IPlayerSettings} from "./youtube-player-settings-model";
import {YoutubePlayerService} from "./youtube-player-service";

enum VideoStatus {
    Paused,
    Playing,
    Ended
}

export class YoutubePlayer extends Component {
    private youtubePlayerService: YoutubePlayerService;
    private player: any;
    private playerSourceElement: HTMLElement;
    private playerButton: HTMLIFrameElement;
    private hoverTimeout: any;
    private playingTimeout: any;
    private videoStatus: VideoStatus;
    private settings: IPlayerSettings;

    constructor (element) {
        super(element);
        this.youtubePlayerService = YoutubePlayerService.getInstanceById('playerId');
    }

    protected onMounted(): void {
        this.initialize();
    }

    protected onUnmounted(): void { }


    public initialize (): void {
        this.initializeElements();
        this.initializeEvents();
    }

    private initializeElements (): void {
        this.settings = this.youtubePlayerService.settings;
        this.videoStatus = VideoStatus.Paused;
        this.playerSourceElement = this.getRefs('playerSourceElement').first();

        if (this.playerSourceElement) {
            this.playerSourceElement.setAttribute('data-plyr-embed-id', this.settings.videoId);
        }

        this.player = new Plyr('#player', {
            controls: ['play-large'],
            settings: []
        });

        this.player.on('ready', event => {
            this.player.source = '';
            this.playerButton = this.player.elements.buttons.play[0];
            this.initializeEvents();
            this.initializeMouseEvents()
        });
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
        }, this.settings.playingTime);
    }

    private initializeEvents (): void {
        this.player.on('play', event => {
            this.onStatePlay();
        });

        this.player.on('pause', event => {
            this.onStatePause();
        });

        this.player.on('ended', event => {
            this.onStateEnded();
        });
    }

    private initializeMouseEvents (): void {
        Utils.addEvent(this.playerButton, 'mousemove', event => {
            if (this.videoStatus === VideoStatus.Paused && !this.hoverTimeout) {
                this.hoverTimeout = setTimeout(() => {
                    this.playVideo();
                }, this.settings.hoverTime);
            }
        });

        Utils.addEvent(this.playerButton, 'mouseout', event => {
            clearTimeout(this.hoverTimeout);
            this.hoverTimeout = null;
        });
    }

    private pauseVideo (): void {
        this.player.pause();
    }

    private playVideo (): void {
        this.player.play();
    }
}