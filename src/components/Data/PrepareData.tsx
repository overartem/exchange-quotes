import { useContext, useEffect, useRef, useState } from 'react';

import { WebsocketContext } from '../../context/WebsocketContext';
import { CalculateMode, WebSocketMessageData } from '../../types/data';
import {
    calculateAverage,
    calculateMode,
    calculateStandardDeviation,
    countMissingQuotes,
    findMaxValue,
    findMinValue,
} from '../../utils/calculations';
import { sendData } from '../../utils/fetch';

const BASE_COUNT_QUOTATIONS = 10; //if the value in the input is empty

function PrepareData({
    getReady,
    count,
    priorityActions,
}: {
    getReady: (status: boolean) => void;
    count: string | undefined;
    priorityActions: { priority: boolean; setPriority: (item: boolean) => void };
}): JSX.Element {
    const [ready, val] = useContext(WebsocketContext);
    const [items, setItems] = useState<WebSocketMessageData[]>([]);
    const startAt = useRef<Date | number>(-1);
    const workAt = useRef<number>(-1);
    const batchSize = useRef<number>(0);
    const numberSlice = useRef<number>(0);
    const currentIndexSlice = useRef<number>(0);
    const [deviation, setDeviation] = useState<number | undefined>();
    const [average, setAverage] = useState<number | undefined>();
    const [modes, setModes] = useState<CalculateMode | undefined>();
    const [maxValue, setMaxValue] = useState<number | undefined>();
    const [minValue, setMinValue] = useState<number | undefined>();
    const [missingQuotes, setMissingQuotes] = useState<number | undefined>();

    useEffect(() => {
        batchSize.current = count ? Number(count) : BASE_COUNT_QUOTATIONS;
        getReady(ready);
    }, [ready]);

    useEffect(() => {
        if (ready && val?.value) {
            setItems((prev) => {
                return [...prev, val];
            });
            numberSlice.current = numberSlice.current + 1;
        }
    }, [ready, val]);

    useEffect(() => {
        if ((priorityActions.priority && val) || (numberSlice.current >= batchSize.current && val)) {
            startAt.current = Date.now();

            const sliceGroup = items.slice(
                currentIndexSlice.current,
                currentIndexSlice.current + batchSize.current
            );

            const batchSizeLoc = priorityActions.priority ? sliceGroup.length : batchSize.current;

            currentIndexSlice.current += batchSizeLoc;
            setAverage(calculateAverage(sliceGroup));
            setDeviation(calculateStandardDeviation(sliceGroup));
            setModes(calculateMode(sliceGroup));
            setMaxValue(findMaxValue(sliceGroup));
            setMinValue(findMinValue(sliceGroup));
            setMissingQuotes(countMissingQuotes(sliceGroup, val));
            sendData(sliceGroup, batchSizeLoc);
        }
    }, [items, priorityActions.priority]);

    useEffect(() => {
        if (
            priorityActions.priority ||
            (numberSlice.current >= batchSize.current &&
                average &&
                deviation &&
                modes &&
                maxValue &&
                minValue)
        ) {
            const startTime = startAt.current as number;
            workAt.current = Date.now() - startTime;
            numberSlice.current = 0;
            if (priorityActions.priority) {
                priorityActions.setPriority(false);
            }
        }
    }, [average, deviation, modes, maxValue, minValue]);

    return (
        <>
            <div className='grid grid-cols-6 my-7 text-center'>
                <div className='average min-h-[60px]'>
                    <p>Average:</p>
                    <p className='font-semibold'>{average ? average.toFixed(3) : '0'}</p>
                </div>
                <div className='deviation min-h-[60px]'>
                    <p>Deviation:</p>
                    <p className='font-semibold'>{deviation ? deviation.toFixed(3) : '0'}</p>
                </div>
                <div className='modes min-h-[60px]'>
                    <p>Mode:</p>
                    <p className='font-semibold'>
                        {modes ? modes.mode + ' / Freq:' + modes.maxFrequency : '0'}
                    </p>
                </div>
                <div className='max-value min-h-[60px]'>
                    <p>Max Value:</p>
                    <p className='font-semibold'>{maxValue || '0'}</p>
                </div>
                <div className='min-value min-h-[60px]'>
                    <p>Min Value:</p>
                    <p className='font-semibold'>{minValue || '0'}</p>
                </div>
                <div className='m-quotes min-h-[60px]'>
                    <p>Missing Quotes:</p>
                    <p className='font-semibold'>
                        {missingQuotes || missingQuotes === 0 ? missingQuotes : '0'}
                    </p>
                </div>
            </div>
            <div className='time-wrapper text-left absolute top-6 left-6'>
                <div>
                    <span className='start-time-label pr-2'>Start time</span>
                    <span className='start-time'>
                        {startAt.current === -1 ? '-' : new Date(startAt.current).toLocaleString()}
                    </span>
                </div>
                <div>
                    <span className='calculate-time-label pr-2'>Calculate time</span>
                    <span className='calculate-time'>
                        {workAt.current === -1 ? '-' : JSON.stringify(workAt.current / 1000) + 'ms'}
                    </span>
                </div>
            </div>
        </>
    );
}

export default PrepareData;
