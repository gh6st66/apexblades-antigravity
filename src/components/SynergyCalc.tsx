import React, { useState, useEffect } from 'react';
import synergyDataRaw from '../../data/legends/legend_synergy.json';

interface Synergy {
    legend1: string;
    legend2: string;
    synergy_type: string;
    rating: number;
    description: string;
    tips: string;
    anti_synergy: boolean;
}

export default function SynergyCalc() {
    const [synergies, setSynergies] = useState<Synergy[]>([]);
    const [l1, setL1] = useState('');
    const [l2, setL2] = useState('');
    const [activeSynergy, setActiveSynergy] = useState<Synergy | null>(null);

    useEffect(() => {
        setSynergies(synergyDataRaw as Synergy[]);
    }, []);

    const findSynergy = () => {
        if (!l1 || !l2) return;
        const found = synergies.find(s =>
            (s.legend1.toLowerCase() === l1.toLowerCase() && s.legend2.toLowerCase() === l2.toLowerCase()) ||
            (s.legend1.toLowerCase() === l2.toLowerCase() && s.legend2.toLowerCase() === l1.toLowerCase())
        );
        setActiveSynergy(found || null);
    };

    const legends = Array.from(new Set(synergies.flatMap(s => [s.legend1, s.legend2]))).sort();

    return (
        <div className="synergy-calc card">
            <h3 className="card-title">Legend Synergy Matrix</h3>
            <div className="synergy-controls">
                <select value={l1} onChange={e => setL1(e.target.value)} className="synergy-select">
                    <option value="">Select Legend 1</option>
                    {legends.map(l => <option key={l} value={l}>{l}</option>)}
                </select>
                <div className="synergy-vs">VS</div>
                <select value={l2} onChange={e => setL2(e.target.value)} className="synergy-select">
                    <option value="">Select Legend 2</option>
                    {legends.map(l => <option key={l} value={l}>{l}</option>)}
                </select>
                <button onClick={findSynergy} className="synergy-btn" disabled={!l1 || !l2}>Analyze</button>
            </div>

            {activeSynergy ? (
                <div className={`synergy-result ${activeSynergy.anti_synergy ? 'anti' : 'pro'}`}>
                    <div className="synergy-res-header">
                        <span className="synergy-type">{activeSynergy.synergy_type}</span>
                        <div className="synergy-rating">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <span key={i} className={i < activeSynergy.rating ? 'star filled' : 'star'}>★</span>
                            ))}
                        </div>
                    </div>
                    <p className="synergy-desc">{activeSynergy.description}</p>
                    <div className="synergy-tips">
                        <strong>Pro Tip:</strong> {activeSynergy.tips}
                    </div>
                </div>
            ) : l1 && l2 && (
                <div className="synergy-no-result">
                    No specific synergy data found for this pair. Try another combo!
                </div>
            )}
        </div>
    );
}
