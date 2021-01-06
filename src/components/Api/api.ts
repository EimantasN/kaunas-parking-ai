/* tslint:disable */
/* eslint-disable */
//----------------------
// <auto-generated>
//     Generated using the NSwag toolchain v13.9.0.0 (NJsonSchema v10.3.0.0 (Newtonsoft.Json v12.0.0.0)) (http://NSwag.org)
// </auto-generated>
//----------------------
// ReSharper disable InconsistentNaming

export class DetectionClient {
    private http: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> };
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(baseUrl?: string, http?: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> }) {
        this.http = http ? http : <any>window;
        this.baseUrl = baseUrl !== undefined && baseUrl !== null ? baseUrl : "https://detection.endev.lt";
    }

    detect(): Promise<AnalyzeObject> {
        let url_ = this.baseUrl + "/Detect";
        url_ = url_.replace(/[?&]$/, "");

        let options_ = <RequestInit>{
            method: "POST",
            headers: {
                "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processDetect(_response);
        });
    }

    protected processDetect(response: Response): Promise<AnalyzeObject> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = AnalyzeObject.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<AnalyzeObject>(<any>null);
    }
}

export class ModelControlClient {
    private http: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> };
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(baseUrl?: string, http?: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> }) {
        this.http = http ? http : <any>window;
        this.baseUrl = baseUrl !== undefined && baseUrl !== null ? baseUrl : "https://detection.endev.lt";
    }

    active(source: number): Promise<boolean> {
        let url_ = this.baseUrl + "/Active";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(source);

        let options_ = <RequestInit>{
            body: content_,
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processActive(_response);
        });
    }

    protected processActive(response: Response): Promise<boolean> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = resultData200 !== undefined ? resultData200 : <any>null;
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<boolean>(<any>null);
    }

    sources(): Promise<StreamSource[]> {
        let url_ = this.baseUrl + "/Sources";
        url_ = url_.replace(/[?&]$/, "");

        let options_ = <RequestInit>{
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processSources(_response);
        });
    }

    protected processSources(response: Response): Promise<StreamSource[]> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            if (Array.isArray(resultData200)) {
                result200 = [] as any;
                for (let item of resultData200)
                    result200!.push(StreamSource.fromJS(item));
            }
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<StreamSource[]>(<any>null);
    }

    allSelected(source: number | undefined): Promise<Rect[]> {
        let url_ = this.baseUrl + "/AllSelected/source?";
        if (source === null)
            throw new Error("The parameter 'source' cannot be null.");
        else if (source !== undefined)
            url_ += "source=" + encodeURIComponent("" + source) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_ = <RequestInit>{
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processAllSelected(_response);
        });
    }

    protected processAllSelected(response: Response): Promise<Rect[]> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            if (Array.isArray(resultData200)) {
                result200 = [] as any;
                for (let item of resultData200)
                    result200!.push(Rect.fromJS(item));
            }
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<Rect[]>(<any>null);
    }

    selected(source: number | undefined, selected: Rect[]): Promise<boolean> {
        let url_ = this.baseUrl + "/Selected?";
        if (source === null)
            throw new Error("The parameter 'source' cannot be null.");
        else if (source !== undefined)
            url_ += "source=" + encodeURIComponent("" + source) + "&";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(selected);

        let options_ = <RequestInit>{
            body: content_,
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processSelected(_response);
        });
    }

    protected processSelected(response: Response): Promise<boolean> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = resultData200 !== undefined ? resultData200 : <any>null;
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<boolean>(<any>null);
    }
}

export class MRCnnClient {
    private http: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> };
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(baseUrl?: string, http?: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> }) {
        this.http = http ? http : <any>window;
        this.baseUrl = baseUrl !== undefined && baseUrl !== null ? baseUrl : "https://detection.endev.lt";
    }

    predict(source: number | undefined): Promise<MRCnnResponse> {
        let url_ = this.baseUrl + "/Predict/source?";
        if (source === null)
            throw new Error("The parameter 'source' cannot be null.");
        else if (source !== undefined)
            url_ += "source=" + encodeURIComponent("" + source) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_ = <RequestInit>{
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processPredict(_response);
        });
    }

    protected processPredict(response: Response): Promise<MRCnnResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = MRCnnResponse.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<MRCnnResponse>(<any>null);
    }
}

export class AnalyzeObject implements IAnalyzeObject {
    data?: string;
    totalCount?: number;
    detected?: number;
    matches?: Match[];

    constructor(data?: IAnalyzeObject) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.data = _data["data"];
            this.totalCount = _data["totalCount"];
            this.detected = _data["detected"];
            if (Array.isArray(_data["matches"])) {
                this.matches = [] as any;
                for (let item of _data["matches"])
                    this.matches!.push(Match.fromJS(item));
            }
        }
    }

    static fromJS(data: any): AnalyzeObject {
        data = typeof data === 'object' ? data : {};
        let result = new AnalyzeObject();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["data"] = this.data;
        data["totalCount"] = this.totalCount;
        data["detected"] = this.detected;
        if (Array.isArray(this.matches)) {
            data["matches"] = [];
            for (let item of this.matches)
                data["matches"].push(item.toJSON());
        }
        return data; 
    }
}

export interface IAnalyzeObject {
    data?: string;
    totalCount?: number;
    detected?: number;
    matches?: Match[];
}

export class Match implements IMatch {
    uId?: string;
    value?: number;
    color?: Colors;
    type?: CarTypes;

    constructor(data?: IMatch) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.uId = _data["uId"];
            this.value = _data["value"];
            this.color = _data["color"];
            this.type = _data["type"];
        }
    }

    static fromJS(data: any): Match {
        data = typeof data === 'object' ? data : {};
        let result = new Match();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["uId"] = this.uId;
        data["value"] = this.value;
        data["color"] = this.color;
        data["type"] = this.type;
        return data; 
    }
}

export interface IMatch {
    uId?: string;
    value?: number;
    color?: Colors;
    type?: CarTypes;
}

export enum Colors {
    Black = 0,
    White = 1,
    Red = 2,
    Green = 3,
    Grey = 4,
}

export enum CarTypes {
    Sedan = 0,
    Coupe = 1,
    SportCar = 2,
    StationWagon = 3,
    Hatchback = 4,
    Convertible = 5,
    SUV = 6,
    Minivan = 7,
    PickupTruck = 8,
    Trunk = 9,
    Unidentified = 10,
}

export class Entity implements IEntity {
    id?: number;

    constructor(data?: IEntity) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.id = _data["id"];
        }
    }

    static fromJS(data: any): Entity {
        data = typeof data === 'object' ? data : {};
        let result = new Entity();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        return data; 
    }
}

export interface IEntity {
    id?: number;
}

export class StreamSource extends Entity implements IStreamSource {
    url?: string | undefined;
    title?: string | undefined;
    miliseconds?: number;
    current?: number;
    increment?: number;
    refresh?: boolean;
    active?: boolean;
    selected?: Rect[] | undefined;
    mrCnnSettingId?: number;

    constructor(data?: IStreamSource) {
        super(data);
    }

    init(_data?: any) {
        super.init(_data);
        if (_data) {
            this.url = _data["url"];
            this.title = _data["title"];
            this.miliseconds = _data["miliseconds"];
            this.current = _data["current"];
            this.increment = _data["increment"];
            this.refresh = _data["refresh"];
            this.active = _data["active"];
            if (Array.isArray(_data["selected"])) {
                this.selected = [] as any;
                for (let item of _data["selected"])
                    this.selected!.push(Rect.fromJS(item));
            }
            this.mrCnnSettingId = _data["mrCnnSettingId"];
        }
    }

    static fromJS(data: any): StreamSource {
        data = typeof data === 'object' ? data : {};
        let result = new StreamSource();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["url"] = this.url;
        data["title"] = this.title;
        data["miliseconds"] = this.miliseconds;
        data["current"] = this.current;
        data["increment"] = this.increment;
        data["refresh"] = this.refresh;
        data["active"] = this.active;
        if (Array.isArray(this.selected)) {
            data["selected"] = [];
            for (let item of this.selected)
                data["selected"].push(item.toJSON());
        }
        data["mrCnnSettingId"] = this.mrCnnSettingId;
        super.toJSON(data);
        return data; 
    }
}

export interface IStreamSource extends IEntity {
    url?: string | undefined;
    title?: string | undefined;
    miliseconds?: number;
    current?: number;
    increment?: number;
    refresh?: boolean;
    active?: boolean;
    selected?: Rect[] | undefined;
    mrCnnSettingId?: number;
}

export class Rect extends Entity implements IRect {
    x1?: number;
    y1?: number;
    x2?: number;
    y2?: number;
    streamSourceId?: number;

    constructor(data?: IRect) {
        super(data);
    }

    init(_data?: any) {
        super.init(_data);
        if (_data) {
            this.x1 = _data["x1"];
            this.y1 = _data["y1"];
            this.x2 = _data["x2"];
            this.y2 = _data["y2"];
            this.streamSourceId = _data["streamSourceId"];
        }
    }

    static fromJS(data: any): Rect {
        data = typeof data === 'object' ? data : {};
        let result = new Rect();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["x1"] = this.x1;
        data["y1"] = this.y1;
        data["x2"] = this.x2;
        data["y2"] = this.y2;
        data["streamSourceId"] = this.streamSourceId;
        super.toJSON(data);
        return data; 
    }
}

export interface IRect extends IEntity {
    x1?: number;
    y1?: number;
    x2?: number;
    y2?: number;
    streamSourceId?: number;
}

export class MRCnnResponse implements IMRCnnResponse {
    total?: number;
    free?: number;
    width?: number;
    height?: number;
    online?: boolean;
    sourceId?: number;
    miliseconds?: number;
    working?: boolean;
    updated?: Date;
    rects?: DrawRects[];
    detected?: number[];
    result?: DrawRects[];

    constructor(data?: IMRCnnResponse) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.total = _data["total"];
            this.free = _data["free"];
            this.width = _data["width"];
            this.height = _data["height"];
            this.online = _data["online"];
            this.sourceId = _data["sourceId"];
            this.miliseconds = _data["miliseconds"];
            this.working = _data["working"];
            this.updated = _data["updated"] ? new Date(_data["updated"].toString()) : <any>undefined;
            if (Array.isArray(_data["rects"])) {
                this.rects = [] as any;
                for (let item of _data["rects"])
                    this.rects!.push(DrawRects.fromJS(item));
            }
            if (Array.isArray(_data["detected"])) {
                this.detected = [] as any;
                for (let item of _data["detected"])
                    this.detected!.push(item);
            }
            if (Array.isArray(_data["result"])) {
                this.result = [] as any;
                for (let item of _data["result"])
                    this.result!.push(DrawRects.fromJS(item));
            }
        }
    }

    static fromJS(data: any): MRCnnResponse {
        data = typeof data === 'object' ? data : {};
        let result = new MRCnnResponse();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["total"] = this.total;
        data["free"] = this.free;
        data["width"] = this.width;
        data["height"] = this.height;
        data["online"] = this.online;
        data["sourceId"] = this.sourceId;
        data["miliseconds"] = this.miliseconds;
        data["working"] = this.working;
        data["updated"] = this.updated ? this.updated.toISOString() : <any>undefined;
        if (Array.isArray(this.rects)) {
            data["rects"] = [];
            for (let item of this.rects)
                data["rects"].push(item.toJSON());
        }
        if (Array.isArray(this.detected)) {
            data["detected"] = [];
            for (let item of this.detected)
                data["detected"].push(item);
        }
        if (Array.isArray(this.result)) {
            data["result"] = [];
            for (let item of this.result)
                data["result"].push(item.toJSON());
        }
        return data; 
    }
}

export interface IMRCnnResponse {
    total?: number;
    free?: number;
    width?: number;
    height?: number;
    online?: boolean;
    sourceId?: number;
    miliseconds?: number;
    working?: boolean;
    updated?: Date;
    rects?: DrawRects[];
    detected?: number[];
    result?: DrawRects[];
}

export class DrawRects implements IDrawRects {
    x?: number;
    y?: number;
    width?: number;
    height?: number;

    constructor(data?: IDrawRects) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.x = _data["x"];
            this.y = _data["y"];
            this.width = _data["width"];
            this.height = _data["height"];
        }
    }

    static fromJS(data: any): DrawRects {
        data = typeof data === 'object' ? data : {};
        let result = new DrawRects();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["x"] = this.x;
        data["y"] = this.y;
        data["width"] = this.width;
        data["height"] = this.height;
        return data; 
    }
}

export interface IDrawRects {
    x?: number;
    y?: number;
    width?: number;
    height?: number;
}

export class ApiException extends Error {
    message: string;
    status: number;
    response: string;
    headers: { [key: string]: any; };
    result: any;

    constructor(message: string, status: number, response: string, headers: { [key: string]: any; }, result: any) {
        super();

        this.message = message;
        this.status = status;
        this.response = response;
        this.headers = headers;
        this.result = result;
    }

    protected isApiException = true;

    static isApiException(obj: any): obj is ApiException {
        return obj.isApiException === true;
    }
}

function throwException(message: string, status: number, response: string, headers: { [key: string]: any; }, result?: any): any {
    if (result !== null && result !== undefined)
        throw result;
    else
        throw new ApiException(message, status, response, headers, null);
}