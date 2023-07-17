export function ConnectionMsg({ response }: { response: any }) {
    return (
        <ul className='flex justify-between flex-wrap'>
            {response.map((item: string, index: number) => (
                <li key={index} className='w-1/5'>
                    {item}
                </li>
            ))}
        </ul>
    );
}
