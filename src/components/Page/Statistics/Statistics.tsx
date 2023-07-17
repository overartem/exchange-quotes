import { nanoid } from 'nanoid';

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
                    <ul className='flex flex-wrap justify-between'>
                        {statistics?.quotations.map((item, index) => (
                            <li
                                key={nanoid()}
                                data-att={item.quota_id + index + item.quota_value}
                                className='px-6'
                            >
                                <span>Id: {item.quota_id + ' =>'} </span>
                                <span>Value: {item.quota_value}</span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </>
    );
}

export default Statistics;
