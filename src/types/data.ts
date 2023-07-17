export type WebSocketMessageData = {
    id: number,
    value: number,
};

export type WebSocketMessageType = WebSocketMessageData | string | ArrayBuffer | Blob | ArrayBufferView;

export type UseWsHookReturnType = [
    boolean,
    WebSocketMessageData | null,
    (() => void) | null
];

export type CalculateMode = {
    mode?: string | null,
    maxFrequency?: number
}

export type FrequencyMap = {
    [key : string]: number
}

export type DataFromSql = {
    quotations: {
        quota_id:number,
        quota_value:number,
    }[],
    totalPages: number
}