// import { nanoid } from 'nanoid';

import { DataFromSql } from '../../../types/data';
import StatisticPagenav from './StatisticPagenav';

function Statistics({
    statistics,
    setpage,
}: {
    statistics: DataFromSql | undefined;
    setpage: (page: number) => void;
}) {
    return (
        <>
            <div
                className={`border-t-2 border-indigo-500 mt-4 ${
                    statistics?.totalPages && statistics?.totalPages > 0 ? 'block' : 'hidden'
                }`}
            >
                <h2 className='text-2xl font-bold text-center w-full my-4'>Statistics</h2>
                <StatisticPagenav maxDigit={statistics?.totalPages} setNewPage={setpage} />
                {statistics?.totalPages && (
                    <ul className='flex flex-wrap justify-start statistics-list'>
                        {statistics?.quotations.map((item) => (
                            <li
                                key={Number(item.id)}
                                data-quote-id={item.id}
                                className='text-left px-3 w-1/4 py-4 border-t-[1px] border-indigo-300 bg-slate-100'
                            >
                                <div>
                                    <span className='pr-1 font-semibold text-red-700'>Id:</span>
                                    <span>{item.id}</span>
                                </div>
                                <div>
                                    <span className='pr-1 font-semibold text-red-700'>Average:</span>
                                    <span>{item.average}</span>
                                </div>
                                <div>
                                    <span className='pr-1 font-semibold text-red-700'>Deviation:</span>
                                    <span>{Number(item.deviation).toFixed(4)}</span>
                                </div>
                                <div>
                                    <span className='pr-1 font-semibold text-red-700'>Mode:</span>
                                    <span>{item.mode}</span>
                                </div>
                                <div>
                                    <span className='pr-1 font-semibold text-red-700'>Max Value:</span>
                                    <span>{item.maxvalue}</span>
                                </div>
                                <div>
                                    <span className='pr-1 font-semibold text-red-700'>Min Value:</span>
                                    <span>{item.minvalue}</span>
                                </div>
                                <div>
                                    <span className='pr-1 font-semibold text-red-700'>Miss. quotes:</span>
                                    <span>{item.missing_quotes}</span>
                                </div>
                                <div>
                                    <span className='pr-1 font-semibold text-red-700'>Start date:</span>
                                    <span>{new Date(item.start_date).toLocaleString()}</span>
                                </div>
                                <div>
                                    <span className='pr-1 font-semibold text-red-700'>Calculated time:</span>
                                    <span>
                                        {JSON.stringify(Number(item.calculate_time) / 1000) + 'ms'}
                                    </span>{' '}
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </>
    );
}

export default Statistics;
