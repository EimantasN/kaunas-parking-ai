import { ModelControlClient, MRCnnClient, MRCnnResponse, StreamSource } from "../Api/api";
import IMaskRCNNModelState from "./Interfaces/IMaskRCNNModelState";

export default class MaskRCNNModelState implements IMaskRCNNModelState {
    public model?: MRCnnResponse | undefined;
    public count: number;
    public free: number;
    public currentSource: number;
    public unixTime: string;
    public lastUpdate: Date;
    public loading: boolean;
    public scale: number;
    public Sources: StreamSource[] = [];

    private ControlClient: ModelControlClient = new ModelControlClient();
    private Client: MRCnnClient = new MRCnnClient();

    private Loaded: boolean = false;

    constructor() {
        this.model = undefined;
        this.count = 0;
        this.free = 0;
        this.currentSource = 0;
        this.unixTime = `${Math.round(Date.now() / 1000)}`;
        this.lastUpdate = new Date();
        this.loading = true;
        this.scale = 1;
    }

    public async active(sourceId: number): Promise<MaskRCNNModelState> {
        await this.ControlClient.active(sourceId);
        await this.update();
        this.currentSource = sourceId;
        this.loading = true;

        return this;
    }

    public async load(): Promise<MaskRCNNModelState> {
        this.Sources = await this.ControlClient.sources();

        this.currentSource = this.Sources.filter((s) => s.active)[0].id ?? 1;

        this.Loaded = true;

        return this;
    }

    public async update(): Promise<MaskRCNNModelState> {
        const response = await this.Client.predict(this.currentSource);
        this.currentSource = this.currentSource === -1 
            ? this.Sources.findIndex(x => x.active === true)
            : this.currentSource;

        this.model = response;
        this.loading = this.isLoading();
        this.unixTime = `${Math.round(Date.now() / 1000)}`;
        this.lastUpdate = new Date();

        this.count = response.total ?? 0;
        this.free = response.free ?? 0;
        this.scale = this.getScale();

        return this;
    }

    private isLoading(): boolean {
        if (!this.model) {
          return true;
        }
        if (this.model.sourceId === undefined) {
          return true;
        }
        const sourceIndex = this.Sources.findIndex(x => x.id === this.model?.sourceId);
        if (sourceIndex < 0) {
          console.log(this.model);
          console.log(this.Sources);
    
          return true;
        }
        if (this.model.sourceId !== this.currentSource) {
          return true;
        }
        return false;
    }

    private getScale(): number {
        if (this.model 
            && this.model?.width 
            && this.model?.height) {
            const byWidth = (100 * 800) / this.model.width;
            return byWidth / 100;
        } else {
          return 1;
        }
    }

    public getImageUrl(): string {
        const source = this.Sources.find((s) => s.id === this.currentSource);
        if (source) {
          return `http://p170m109.endev.lt/${this.currentSource}.png?unix=${this.unixTime}`;
        }
        return '';
    }

    public offline(): boolean {
        return true;
    }

    public show(): boolean {
        return this.Sources.length !== 0 
            && !this.loading 
            && this.model?.online === true;
    }
}