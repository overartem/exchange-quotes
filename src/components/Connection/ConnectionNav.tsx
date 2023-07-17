export function ConnectionNav({ actions }: { actions: any }) {
    return (
        <>
            <div className='action-block mt-3 flex justify-between max-w-xs mx-auto'>
                <button
                    type='button'
                    className='start py-3 px-6 rounded-sm border bg-indigo-500 text-white hover:bg-indigo-600 disabled:bg-stone-500'
                    disabled={actions.ready}
                    onClick={() => actions.start()}
                >
                    Start
                </button>
                <button
                    type='button'
                    className='statistics py-3 px-6 rounded-sm border bg-green-500 text-white hover:bg-green-600 disabled:bg-stone-500'
                    disabled={!actions.ready}
                    onClick={() => {
                        actions.showStatistics();
                        actions.setPriority(true);
                    }}
                >
                    Statistics
                </button>
            </div>
        </>
    );
}
