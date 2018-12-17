import {IPlayerSettings, PlayerSettingsModel} from "./youtube-player-settings-model";

export class YoutubePlayerService {
    private static instances: Array<YoutubePlayerService>;
    private id: string;
    private settingsModel: IPlayerSettings;

    private constructor (componentId) {
        this.id = componentId;
        this.loadSettings();
    }

    static getInstanceById (componentId): YoutubePlayerService {
        YoutubePlayerService.instances = YoutubePlayerService.instances || [];
        let instance: YoutubePlayerService;

        if (componentId) {
            for (let i = 0; i < YoutubePlayerService.instances.length; i++) {
                if (YoutubePlayerService.instances[i].id === componentId) {
                    instance = YoutubePlayerService[i];
                }
            }
        }

        if (!instance) {
            instance = new YoutubePlayerService(componentId || '1');
            YoutubePlayerService.instances.push(instance);
        }

        return instance;
    }

    private loadSettings (): void {
        const loadedSettings = localStorage.getItem('KretPlayerSettings');
        if (loadedSettings) {
            this.settingsModel = JSON.parse(loadedSettings);
        } else {
            this.settingsModel = this.generateDefaultSettings();
        }
        console.log(this.settingsModel);
    }

    private generateDefaultSettings (): IPlayerSettings {
        return Object.assign({}, PlayerSettingsModel)
    }

    get settings (): IPlayerSettings {
        return this.settingsModel;
    }

    set settings (settings: IPlayerSettings) {
        this.settingsModel = settings;
        console.log(this.settings);
        localStorage.setItem('KretPlayerSettings', JSON.stringify(this.settingsModel));
    }
}