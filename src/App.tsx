import { useCallback, useRef, useState } from 'react';

import PrepareData from './components/Data/PrepareData';
import StatisticsLayout from './components/Page/Statistics/StatisticsLayout';
import { SOCKET_URL } from './constants/settings';
import { WebsocketProvider } from './context/WebsocketContext';

function App() {
    const [socketUrl, setSocketUrl] = useState('');
    const [ready, setReady] = useState(false);
    const [priority, setPriority] = useState(false);
    const countQuotations = useRef<HTMLInputElement>(null);
    const start = useCallback(() => {
        if (!ready) {
            setSocketUrl(SOCKET_URL);
        }
    }, [ready]);

    return (
        <>
            <div className='relative bg-white shadow-lg rounded-sm border border-slate-200 p-6 text-center m-9'>
                <label htmlFor='quotations' className='text-2xl font-bold text-center w-full'>
                    <span
                        className={`rounded w-4 h-4 inline-block mr-3 ${
                            ready ? 'bg-green-700' : 'bg-red-700'
                        }`}
                    ></span>
                    Number of quotations
                </label>
                <input
                    type='number'
                    name='quotations'
                    id='quotations'
                    defaultValue='10'
                    ref={countQuotations}
                    className='block mx-auto my-8 border rounded-sm h-11 p-2 outline-none'
                />
                <WebsocketProvider url={socketUrl}>
                    <>
                        <PrepareData
                            getReady={setReady}
                            count={countQuotations.current?.value}
                            priorityActions={{ priority, setPriority }}
                        />
                    </>
                </WebsocketProvider>
                <StatisticsLayout appActions={{ start, ready, setPriority }} />
            </div>
        </>
    );
}

export default App;
