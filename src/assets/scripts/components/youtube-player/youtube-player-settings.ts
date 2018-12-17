import {Component} from "../../component";
import {IPlayerSettings, PlayerSettingsModel} from "./youtube-player-settings-model";
import {Utils} from "../../utils";
import {YoutubePlayerService} from "./youtube-player-service";

export class YoutubePlayerSettings extends Component {
    private youtubePlayerService: YoutubePlayerService;
    public model: IPlayerSettings;
    private hoverTimeField: HTMLInputElement;
    private playingTimeField: HTMLInputElement;
    private videoUrlField: HTMLInputElement;

    constructor (element) {
        super(element);
        this.youtubePlayerService = YoutubePlayerService.getInstanceById('playerId');
        this.model = this.youtubePlayerService.settings;
    }

    protected onMounted (): void {
        this.initializeElements();
        this.initializeValues();
        this.initializeEvents();
    }

    protected onUnmounted (): void { }

    private initializeElements (): void {
        this.hoverTimeField = this.getRefs('hoverTime').first();
        this.playingTimeField = this.getRefs('playingTime').first();
        this.videoUrlField = this.getRefs('videoUrl').first();
    }

    private initializeValues (): void {
        this.hoverTimeField.value = this.model.hoverTime.toString();
        this.playingTimeField.value = this.model.playingTime.toString();
        this.videoUrlField.value = this.model.videoId;
    }

    private initializeEvents (): void {
        if (this.isCommpleteStructure()) {
            Utils.addEvent(this.hoverTimeField, 'change', event => {
                this.model.hoverTime = parseInt(this.hoverTimeField.value);
                this.saveSettings();
            });

            Utils.addEvent(this.playingTimeField, 'change', event => {
                this.model.playingTime = parseInt(this.playingTimeField.value);
                this.saveSettings();
            });

            Utils.addEvent(this.videoUrlField, 'change', event => {
                this.model.videoId = this.getIdFromUrl(this.videoUrlField.value);
                this.saveSettings();
            });
        }
    }

    private getIdFromUrl (url): string {
        let videoId = this.model.videoId;
        let newVideoId = url.split('v=')[1];
        console.log(newVideoId);
        if (typeof newVideoId !== 'undefined') {
            videoId = newVideoId;
            let ampersandPosition = newVideoId.indexOf('&');
            if (ampersandPosition !== -1) {
                videoId = newVideoId.substring(0, ampersandPosition);
            }
        }
        return videoId;
    };

    private isCommpleteStructure (): Boolean {
        return (!!this.hoverTimeField && !!this.playingTimeField && !!this.videoUrlField);
    }

    private saveSettings (): void {
        this.youtubePlayerService.settings = this.model;
    }
}