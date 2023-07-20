import { CalculateMode, FrequencyMap, WebSocketMessageData } from '../types/data';

export function calculateStandardDeviation(quotes: WebSocketMessageData[]): number | undefined {
    const n = quotes.length;
    if (n < 1) return;
    const mean = quotes.reduce((sum, quote) => sum + quote.value, 0) / n;
    const sumOfSquaredDeviations = quotes.reduce((sum, quote) => sum + Math.pow(quote.value - mean, 2), 0);
    const standardDeviation = Math.sqrt(sumOfSquaredDeviations / n);

    return standardDeviation;
}

export function calculateAverage(quotes: WebSocketMessageData[]): number | undefined {
    const n = quotes.length;
    if (n < 1) return;
    const mean = quotes.reduce((sum, quote) => sum + quote.value, 0) / n;
    return mean;
}

export function calculateMode(quotes: WebSocketMessageData[]): CalculateMode {
    const n = quotes.length;
    let total = null;
    if (n < 1) return { total };
    const frequencyMap: FrequencyMap = {};

    quotes.forEach((item: WebSocketMessageData) => {
        frequencyMap[item.value] = frequencyMap[item.value] ? frequencyMap[item.value] + 1 : 1;
    });

    let mode: string | null = null;
    let maxFrequency = 0;

    for (const key in frequencyMap) {
        if (frequencyMap.hasOwnProperty(key)) {
            const frequency = frequencyMap[key];

            if (frequency > maxFrequency) {
                mode = key;
                maxFrequency = frequency;
            }
        }
    }

    total = `${mode} / Freq: ${maxFrequency}`;

    return { total };
}

export function findMaxValue(quotes: WebSocketMessageData[]): number | undefined {
    const n = quotes.length;
    if (n < 1) return;

    let max = -Infinity; //for negative values

    quotes.forEach((obj) => {
        const value = obj.value;

        if (value > max) {
            max = value;
        }
    });

    return max;
}

export function findMinValue(quotes: WebSocketMessageData[]): number | undefined {
    const n = quotes.length;
    if (n < 1) return;

    let min = Infinity;

    quotes.forEach((obj) => {
        const value = obj.value;

        if (value < min) {
            min = value;
        }
    });

    return min;
}

export function countMissingQuotes(
    quotes: WebSocketMessageData[],
    actual: WebSocketMessageData
): number | undefined {
    const n = quotes.length;
    if (n < 1) return;

    let missedQuotes = 0;

    if (quotes.length > 0 && actual.id - quotes[quotes.length - 1].id > 1) {
        missedQuotes += actual.id - quotes[quotes.length - 1].id - 1;
    }
    return missedQuotes;
}

export const findUniqueObjectsByValue = (
    arr1: WebSocketMessageData[],
    arr2: WebSocketMessageData[]
): WebSocketMessageData[] => {
    const uniqueObjects: WebSocketMessageData[] = [];
    const valuesSet = new Set();

    const addUniqueObject = (obj: WebSocketMessageData) => {
        if (!valuesSet.has(obj.value)) {
            valuesSet.add(obj.value);
            uniqueObjects.push(obj);
        }
    };

    arr1.forEach(addUniqueObject);
    arr2.forEach(addUniqueObject);

    return uniqueObjects;
};
