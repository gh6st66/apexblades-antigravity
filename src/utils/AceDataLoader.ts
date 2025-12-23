import aceData from '../../data/ace_calculator_data.json';

export interface AcePillar {
    id: string;
    label: string;
    description: string;
    value: number;
}

export interface AceWildcard {
    id: string;
    label: string;
    description: string;
    value: number;
}

export interface AceRank {
    minScore: number;
    rank: string;
    verdict: string;
}

export interface AceCalculatorData {
    calculatorName: string;
    pillars: AcePillar[];
    wildcardFactors: AceWildcard[];
    ratingSystem: AceRank[];
}

export const loadAceData = (): AceCalculatorData => {
    return aceData as AceCalculatorData;
};
