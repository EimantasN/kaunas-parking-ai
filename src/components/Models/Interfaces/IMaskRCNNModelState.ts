import { MRCnnResponse, StreamSource } from "../../Api/api";
import MaskRCNNModelState from "../MaskRCNNModelState";

export default interface IMaskRCNNModelState {
    model?: MRCnnResponse,
    count: number,
    free: number,
    currentSource: number,
    unixTime: string,
    lastUpdate: Date,
    loading: boolean,
    scale: number,
    Sources: StreamSource[],
    load(): Promise<MaskRCNNModelState>,
    update(): Promise<MaskRCNNModelState>,
    active(sourceId: number): Promise<MaskRCNNModelState>,
    offline(): boolean,
    show(): boolean,
    getImageUrl(): string
}