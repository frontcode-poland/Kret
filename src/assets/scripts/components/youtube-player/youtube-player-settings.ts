import {Component} from "../../component";
import {IPlayerSettings} from "./youtube-player-settings-model";
import {Utils} from "../../utils";
import {YoutubePlayerService} from "./youtube-player-service";

export class YoutubePlayerSettings extends Component {
    private youtubePlayerService: YoutubePlayerService;
    public model: IPlayerSettings;
    private hoverTimeField: HTMLInputElement;
    private playingTimeField: HTMLInputElement;
    private videoUrlField: HTMLInputElement;
    private saveButton: HTMLButtonElement;

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
        this.saveButton = this.getRefs('save').first();
    }

    private initializeValues (): void {
        this.hoverTimeField.value = (this.model.hoverTime / 1000).toString();
        this.playingTimeField.value = (this.model.playingTime / 1000).toString();
        this.videoUrlField.value = this.makeUrlFromId(this.model.videoId);
    }

    private initializeEvents (): void {
        if (this.isCommpleteStructure()) {
            Utils.addEvent(this.hoverTimeField, 'change', event => {
                this.model.hoverTime = parseInt(this.hoverTimeField.value) * 1000;
            });

            Utils.addEvent(this.playingTimeField, 'change', event => {
                this.model.playingTime = parseInt(this.playingTimeField.value) * 1000;
            });

            Utils.addEvent(this.videoUrlField, 'change', event => {
                this.model.videoId = this.getIdFromUrl(this.videoUrlField.value);
            });

            Utils.addEvent(this.saveButton, 'click', event => {
               event.preventDefault();
               this.saveSettings();
               location.reload();
            });
        }
    }

    private makeUrlFromId (id): string {
        return 'https://www.youtube.com/watch?v=' + id;
    }

    private getIdFromUrl (url): string {
        const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
        const match = url.match(regExp);
        return (match&&match[7].length==11)? match[7] : this.model.videoId;
    };

    private isCommpleteStructure (): Boolean {
        return (!!this.hoverTimeField && !!this.playingTimeField && !!this.videoUrlField && !!this.saveButton);
    }

    private saveSettings (): void {
        this.youtubePlayerService.settings = this.model;
    }
}