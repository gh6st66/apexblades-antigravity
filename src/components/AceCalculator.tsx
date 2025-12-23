import React, { useState, useEffect } from 'react';
import { loadAceData, AceCalculatorData, AceRank } from '../utils/AceDataLoader';

export default function AceCalculator() {
    const [data, setData] = useState<AceCalculatorData | null>(null);
    const [checkedPillars, setCheckedPillars] = useState<Set<string>>(new Set(['checkComfort'])); // Default checked
    const [checkedWildcards, setCheckedWildcards] = useState<Set<string>>(new Set());
    const [mode, setMode] = useState<'ranked' | 'wildcard'>('ranked');

    useEffect(() => {
        const loadedData = loadAceData();
        setData(loadedData);
    }, []);

    if (!data) return <div>Loading Calculator...</div>;

    const togglePillar = (id: string) => {
        const newSet = new Set(checkedPillars);
        if (newSet.has(id)) newSet.delete(id);
        else newSet.add(id);
        setCheckedPillars(newSet);
    };

    const toggleWildcard = (id: string) => {
        const newSet = new Set(checkedWildcards);
        if (newSet.has(id)) newSet.delete(id);
        else newSet.add(id);
        setCheckedWildcards(newSet);
    };

    const calculateScore = () => {
        let score = 0;

        // Pillars
        data.pillars.forEach(pillar => {
            if (checkedPillars.has(pillar.id)) score += pillar.value;
        });

        // Wildcards (only if in wildcard mode)
        if (mode === 'wildcard') {
            data.wildcardFactors.forEach(factor => {
                if (checkedWildcards.has(factor.id)) score += factor.value;
            });
        }

        return Math.min(score, 100);
    };

    const getRankAndVerdict = (score: number): AceRank => {
        // Find the first rank where score >= minScore
        // Assumes data.ratingSystem is sorted desc by minScore
        const found = data.ratingSystem.find(r => score >= r.minScore);
        return found || { minScore: 0, rank: 'UNKNOWN', verdict: '' };
    };

    const score = calculateScore();
    const { rank, verdict } = getRankAndVerdict(score);

    // Color logic based on rank (could be dynamic too, but hardcoded for now matches style)
    // Color logic is now handled by CSS classes (rank-S, rank-A, etc.)

    return (
        <div className="ace-calculator card">
            <h2 className="card__title gradient-text">{data.calculatorName}</h2>

            <div className="ace-mode-toggle">
                <button
                    className={`ace-btn ${mode === 'ranked' ? 'active' : ''}`}
                    onClick={() => setMode('ranked')}
                >
                    Ranked
                </button>
                <button
                    className={`ace-btn ${mode === 'wildcard' ? 'active' : ''}`}
                    onClick={() => setMode('wildcard')}
                >
                    Wildcard
                </button>
            </div>

            <div className="ace-section">
                <h3 className="ace-section-title">Core Pillars</h3>
                {data.pillars.map(pillar => (
                    <label key={pillar.id} className="ace-checklist-item">
                        <input
                            type="checkbox"
                            checked={checkedPillars.has(pillar.id)}
                            onChange={() => togglePillar(pillar.id)}
                        />
                        <span className="ace-label">{pillar.label}</span>
                        <span className="ace-desc">{pillar.description}</span>
                    </label>
                ))}
            </div>

            {mode === 'wildcard' && (
                <div className="ace-section">
                    <h3 className="ace-section-title">Wildcard Factors</h3>
                    {data.wildcardFactors.map(factor => (
                        <label key={factor.id} className="ace-checklist-item">
                            <input
                                type="checkbox"
                                checked={checkedWildcards.has(factor.id)}
                                onChange={() => toggleWildcard(factor.id)}
                            />
                            <span className="ace-label">{factor.label}</span>
                            <span className="ace-desc">{factor.description}</span>
                        </label>
                    ))}
                </div>
            )}

            <div className="ace-score-panel">
                <div className="ace-score-value">{score}</div>
                <div className={`ace-score-rank rank-${rank.charAt(0)}`}>{rank}</div>
                <div className="ace-score-verdict">{verdict}</div>
            </div>

        </div>
    );
}
