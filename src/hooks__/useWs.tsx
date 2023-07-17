import { useEffect, useRef, useState } from 'react';

type WebSocketMessageType = string | ArrayBuffer | Blob | ArrayBufferView;

type UseWsHookReturnType = [
    boolean, // isReady
    WebSocketMessageType | null, // val
    (() => void) | null // close
];

const useWs = ({ url }: { url: string }): UseWsHookReturnType => {
    const [isReady, setIsReady] = useState(false);
    const [val, setVal] = useState<WebSocketMessageType | null>(null);

    const ws = useRef<WebSocket | null>(null);

    useEffect(() => {
        if (!url) return;
        const socket = new WebSocket(url);
        socket.onopen = () => setIsReady(true);
        socket.onclose = () => setIsReady(false);
        socket.onmessage = (event) => setVal(event.data);

        ws.current = socket;

        return () => {
            socket.close();
        };
    }, [url]);

    const close = ws.current?.close.bind(ws.current) || null;

    return [isReady, val, close];
};

export default useWs;
