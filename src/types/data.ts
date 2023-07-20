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
    total?: string | null
}

export type FrequencyMap = {
    [key : string]: number
}

export type DataFromSql = {
    quotations:SqlQuotations[],
    totalPages: number
}

export type Quotations = {
    [key : string]: number | string | CalculateMode 
}

export type SqlQuotations = {
    [key : string]: number | string
}