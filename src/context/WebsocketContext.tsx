import { createContext, useEffect, useRef, useState } from 'react';

import { UseWsHookReturnType } from '../types/data';

export const WebsocketContext = createContext<UseWsHookReturnType>([false, null, () => {}]);
export const WebsocketProvider = ({ children, url }: { children: JSX.Element; url: string }) => {
    const [isReady, setIsReady] = useState(false);
    const [val, setVal] = useState(null);

    const ws = useRef<WebSocket | null>(null);
    useEffect(() => {
        if (!url) return;
        const socket = new WebSocket(url);
        socket.onopen = () => setIsReady(true);
        socket.onclose = () => setIsReady(false);
        socket.onmessage = (event) => setVal(JSON.parse(event.data));

        ws.current = socket;

        return () => {
            socket.close();
        };
    }, [url]);

    const close = ws.current?.close.bind(ws.current) || null;
    const ret: UseWsHookReturnType = [isReady, val, close];
    return <WebsocketContext.Provider value={ret}>{children}</WebsocketContext.Provider>;
};
