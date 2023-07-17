export function ConnectionState({ isConnected }: { isConnected: any }) {
    return (
        <p>
            State:
            <span className={`pl-3 ${isConnected === 'open' ? 'text-green-500' : 'text-red-500'}`}>
                {isConnected}
            </span>
        </p>
    );
}
