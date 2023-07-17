import { useEffect, useState } from 'react';

function StatisticPagenav({
    maxDigit,
    setNewPage,
}: {
    maxDigit: number | undefined;
    setNewPage: (page: number) => void;
}) {
    const [numberList, setNumberList] = useState<number[]>([]);

    useEffect(() => {
        if (maxDigit) {
            const updatedNumberList: number[] = [];

            for (let i = 1; i <= maxDigit; i++) {
                updatedNumberList.push(i);
            }
            setNumberList(updatedNumberList);
        }
    }, [maxDigit]);

    const HandleNewPage = (e: React.MouseEvent<HTMLUListElement, MouseEvent>) => {
        e.preventDefault();
        const target = e.target as HTMLElement;
        const active = document.querySelector('.page-navbar .active');

        if (target.tagName === 'A') {
            if (active) {
                active.classList.remove('active');
                target.closest('li')?.classList.add('active');
            }
            setNewPage(Number(target.textContent));
        }
    };

    return (
        <ul onClick={HandleNewPage} className='page-navbar flex flex-wrap justify-center mb-4'>
            {numberList.map((number, index) => (
                <li key={number} className={`border mb-2 page-number ${index + 1 === 1 ? 'active' : ''}`}>
                    <a href='#' className='px-3 py-1 inline-block hover:bg-slate-200'>
                        {number}
                    </a>
                </li>
            ))}
        </ul>
    );
}

export default StatisticPagenav;
