import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { DataFromSql } from '../../../types/data';
import { getStatistics } from '../../../utils/fetch';
import { ConnectionNav } from '../../Connection/ConnectionNav';
import Statistics from './Statistics';

interface IAppActions {
    ready: boolean;
    start: () => void;
    setPriority: Dispatch<SetStateAction<boolean>>;
}

function StatisticsLayout({ appActions }: { appActions: IAppActions }) {
    const { start, ready, setPriority } = appActions;
    const [statistics, setStatistics] = useState<DataFromSql | undefined>();
    const [page, setPage] = useState<number>(0);

    const showStatistics = () => {
        const firstPage = page > 0 ? page : 1;
        fetchData(firstPage);
    };

    useEffect(() => {
        if (page > 0) fetchData(page);
    }, [page]);

    const fetchData = async (pageNumber: number) => {
        try {
            const { quotations, totalPages } = await getStatistics(pageNumber);
            setStatistics({ quotations, totalPages });
        } catch (error) {
            console.error('An error occurred while retrieving statistics:', error);
        }
    };
    return (
        <>
            <ConnectionNav actions={{ start, showStatistics, ready, setPriority }} />
            <Statistics statistics={statistics} setpage={setPage} />
        </>
    );
}

export default StatisticsLayout;
