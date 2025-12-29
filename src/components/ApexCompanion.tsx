import React, { useState, useEffect } from 'react';
import { Crosshair, Users, Zap, Shield, Activity, TrendingUp } from 'lucide-react';

// Types
interface LegendInfo {
    role: 'skirmisher' | 'recon' | 'support' | 'defense' | 'assault';
    mobility: 'high' | 'medium' | 'low';
    range: string;
}

interface SynergyEntry {
    score: number;
    combo?: string;
    conflict?: string;
}

interface SynergyScores {
    ability: number;
    role: number;
    range: number;
    mobility: number;
    ultimate: number;
    total: number;
    combos: string[];
    conflicts: string[];
}

// Legend Data Structure
const LEGEND_DATA: Record<string, LegendInfo> = {
    'Wraith': { role: 'skirmisher', mobility: 'high', range: 'close-mid' },
    'Pathfinder': { role: 'skirmisher', mobility: 'high', range: 'close-mid' },
    'Octane': { role: 'skirmisher', mobility: 'high', range: 'close' },
    'Horizon': { role: 'skirmisher', mobility: 'high', range: 'mid' },
    'Valkyrie': { role: 'skirmisher', mobility: 'high', range: 'mid' },
    'Revenant': { role: 'skirmisher', mobility: 'medium', range: 'close-mid' },
    'Ash': { role: 'skirmisher', mobility: 'high', range: 'mid' },
    'Alter': { role: 'skirmisher', mobility: 'high', range: 'close-mid' },

    'Bloodhound': { role: 'recon', mobility: 'medium', range: 'mid' },
    'Crypto': { role: 'recon', mobility: 'low', range: 'mid-long' },
    'Seer': { role: 'recon', mobility: 'medium', range: 'mid' },
    'Vantage': { role: 'recon', mobility: 'medium', range: 'long' },

    'Lifeline': { role: 'support', mobility: 'medium', range: 'close-mid' },
    'Loba': { role: 'support', mobility: 'medium', range: 'mid' },
    'Newcastle': { role: 'support', mobility: 'medium', range: 'close-mid' },

    'Gibraltar': { role: 'defense', mobility: 'low', range: 'mid' },
    'Caustic': { role: 'defense', mobility: 'low', range: 'close-mid' },
    'Wattson': { role: 'defense', mobility: 'low', range: 'mid' },
    'Rampart': { role: 'defense', mobility: 'low', range: 'mid-long' },
    'Catalyst': { role: 'defense', mobility: 'low', range: 'mid' },

    'Bangalore': { role: 'assault', mobility: 'high', range: 'mid' },
    'Mirage': { role: 'assault', mobility: 'medium', range: 'close-mid' },
    'Fuse': { role: 'assault', mobility: 'medium', range: 'mid-long' },
    'Mad Maggie': { role: 'assault', mobility: 'high', range: 'close-mid' },
    'Ballistic': { role: 'assault', mobility: 'medium', range: 'mid' },
};

// Ability Synergy Matrix (positive combos)
const SYNERGY_COMBOS: Record<string, SynergyEntry> = {
    'Bangalore_Bloodhound': { score: 9, combo: 'Smoke + Scan is a classic combo' },
    'Bangalore_Seer': { score: 8, combo: 'Smoke + Heartbeat sensor works well' },
    'Caustic_Wattson': { score: 8, combo: 'Area denial stacking for fortified positions' },
    'Caustic_Rampart': { score: 7, combo: 'Gas + walls for lockdown defense' },
    'Gibraltar_Lifeline': { score: 9, combo: 'Dome + revive is incredibly safe' },
    'Gibraltar_Newcastle': { score: 8, combo: 'Double shield for ultimate protection' },
    'Crypto_Caustic': { score: 7, combo: 'EMP destroys traps, then push through gas' },
    'Crypto_Revenant': { score: 8, combo: 'EMP shield break + totem push' },
    'Wraith_Pathfinder': { score: 8, combo: 'Portal + zipline for team mobility' },
    'Wraith_Octane': { score: 7, combo: 'Portal + pad for fast rotations' },
    'Bloodhound_Gibraltar': { score: 7, combo: 'Scan for info + dome for safety' },
    'Bloodhound_Bangalore': { score: 9, combo: 'See through smoke during scan' },
    'Valkyrie_Any': { score: 7, combo: 'Valk ult provides rotation for any team' },
    'Loba_Rampart': { score: 7, combo: 'Black market for ammo + Rampart walls' },
    'Mad Maggie_Bangalore': { score: 8, combo: 'Speed boost through smoke' },
    'Horizon_Caustic': { score: 7, combo: 'Lift enemies into gas' },
    'Newcastle_Lifeline': { score: 8, combo: 'Mobile shield + revive support' },
    'Pathfinder_Octane': { score: 7, combo: 'Zipline + pad for aggressive pushes' },
};

// Ability Conflicts (negative synergies)
const SYNERGY_CONFLICTS: Record<string, SynergyEntry> = {
    'Caustic_Bangalore': { score: -3, conflict: 'Gas obscures vision, blocks Bangalore' },
    'Crypto_Wattson': { score: -2, conflict: 'EMP destroys friendly Wattson fences' },
    'Crypto_Caustic': { score: -2, conflict: 'EMP destroys friendly Caustic traps' },
    'Revenant_Gibraltar': { score: -2, conflict: 'Low mobility conflict - hard to capitalize on totem' },
};

// Calculate synergy scores
const calculateSynergy = (legends: string[]): SynergyScores | null => {
    if (legends.length === 0) return null;

    let abilityScore = 5;
    const combosList: string[] = [];
    const conflictsList: string[] = [];

    for (let i = 0; i < legends.length; i++) {
        for (let j = i + 1; j < legends.length; j++) {
            const pair1 = `${legends[i]}_${legends[j]}`;
            const pair2 = `${legends[j]}_${legends[i]}`;

            if (SYNERGY_COMBOS[pair1]) {
                abilityScore = Math.min(10, abilityScore + SYNERGY_COMBOS[pair1].score / 3);
                combosList.push(SYNERGY_COMBOS[pair1].combo!);
            } else if (SYNERGY_COMBOS[pair2]) {
                abilityScore = Math.min(10, abilityScore + SYNERGY_COMBOS[pair2].score / 3);
                combosList.push(SYNERGY_COMBOS[pair2].combo!);
            }

            if (SYNERGY_CONFLICTS[pair1]) {
                abilityScore = Math.max(0, abilityScore + SYNERGY_CONFLICTS[pair1].score);
                conflictsList.push(SYNERGY_CONFLICTS[pair1].conflict!);
            } else if (SYNERGY_CONFLICTS[pair2]) {
                abilityScore = Math.max(0, abilityScore + SYNERGY_CONFLICTS[pair2].score);
                conflictsList.push(SYNERGY_CONFLICTS[pair2].conflict!);
            }
        }
    }

    const roles = legends.map(l => LEGEND_DATA[l].role);
    const uniqueRoles = new Set(roles);
    let roleScore: number;
    if (legends.length === 1) {
        roleScore = 7;
    } else if (legends.length === 2) {
        roleScore = uniqueRoles.size === 2 ? 8 : 6;
    } else {
        if (uniqueRoles.size === 3) roleScore = 10;
        else if (uniqueRoles.size === 2) roleScore = 7;
        else roleScore = 4;
    }

    const ranges = legends.map(l => LEGEND_DATA[l].range);
    const rangeTypes = ranges.map(r => {
        if (r.includes('close')) return 'close';
        if (r.includes('long')) return 'long';
        return 'mid';
    });
    const uniqueRanges = new Set(rangeTypes);
    let rangeScore: number;
    if (uniqueRanges.size === 1) rangeScore = 9;
    else if (uniqueRanges.size === 2 && uniqueRanges.has('mid')) rangeScore = 7;
    else rangeScore = 5;

    const mobilities = legends.map(l => LEGEND_DATA[l].mobility);
    const mobilityMap: Record<string, number> = { high: 3, medium: 2, low: 1 };
    const mobilityValues = mobilities.map(m => mobilityMap[m]);
    const avgMobility = mobilityValues.reduce((a, b) => a + b, 0) / mobilityValues.length;
    const mobilityVariance = mobilityValues.reduce((sum, val) => sum + Math.abs(val - avgMobility), 0) / mobilityValues.length;
    const mobilityScore = Math.max(0, 10 - (mobilityVariance * 5));

    const ultScore = uniqueRoles.size * 3 + 1;

    const total = (
        abilityScore * 0.30 +
        roleScore * 0.25 +
        rangeScore * 0.20 +
        mobilityScore * 0.15 +
        ultScore * 0.10
    );

    return {
        ability: Math.round(abilityScore * 10) / 10,
        role: Math.round(roleScore * 10) / 10,
        range: Math.round(rangeScore * 10) / 10,
        mobility: Math.round(mobilityScore * 10) / 10,
        ultimate: Math.round(ultScore * 10) / 10,
        total: Math.round(total * 10) / 10,
        combos: combosList,
        conflicts: conflictsList,
    };
};

// ScoreBar component
const ScoreBar: React.FC<{ label: string; score: number; color: string }> = ({ label, score, color }) => (
    <div className="companion-score-bar">
        <div className="companion-score-bar__header">
            <span className="companion-score-bar__label">{label}</span>
            <span className="companion-score-bar__value">{score}/10</span>
        </div>
        <div className="companion-score-bar__track">
            <div
                className={`companion-score-bar__fill ${color}`}
                style={{ width: `${(score / 10) * 100}%` }}
            />
        </div>
    </div>
);

const getScoreColor = (score: number): string => {
    if (score >= 9) return 'companion-score--green';
    if (score >= 7) return 'companion-score--blue';
    if (score >= 5) return 'companion-score--yellow';
    if (score >= 3) return 'companion-score--orange';
    return 'companion-score--red';
};

const getScoreTextColor = (score: number): string => {
    if (score >= 9) return 'companion-text--green';
    if (score >= 7) return 'companion-text--blue';
    if (score >= 5) return 'companion-text--yellow';
    if (score >= 3) return 'companion-text--orange';
    return 'companion-text--red';
};

export default function ApexCompanion() {
    const [playstyle, setPlaystyle] = useState('aggressive');
    const [role, setRole] = useState('assault');
    const [skillLevel, setSkillLevel] = useState('intermediate');
    const [selectedLegends, setSelectedLegends] = useState<string[]>([]);
    const [aiResponse, setAiResponse] = useState('');
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState<'loadout' | 'synergy'>('loadout');
    const [synergyScores, setSynergyScores] = useState<SynergyScores | null>(null);

    useEffect(() => {
        if (activeTab === 'synergy' && selectedLegends.length > 0) {
            setSynergyScores(calculateSynergy(selectedLegends));
        } else {
            setSynergyScores(null);
        }
    }, [selectedLegends, activeTab]);

    const getLoadoutRecommendation = async () => {
        setLoading(true);
        try {
            // Note: In production, use a backend proxy to hide API keys
            const response = await fetch('/api/companion', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    type: 'loadout',
                    playstyle,
                    role,
                    skillLevel,
                }),
            });

            if (!response.ok) {
                throw new Error('API request failed');
            }

            const data = await response.json();
            setAiResponse(data.response || 'No response received');
        } catch (error) {
            // Fallback: provide hard-coded recommendations
            setAiResponse(getHardcodedLoadout(playstyle, role, skillLevel));
        }
        setLoading(false);
    };

    const getTeamAnalysis = async () => {
        if (!synergyScores) return;

        setLoading(true);
        try {
            const response = await fetch('/api/companion', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    type: 'team',
                    legends: selectedLegends,
                    scores: synergyScores,
                }),
            });

            if (!response.ok) {
                throw new Error('API request failed');
            }

            const data = await response.json();
            setAiResponse(data.response || 'No response received');
        } catch (error) {
            // Fallback: provide hard-coded analysis
            setAiResponse(getHardcodedTeamAnalysis(selectedLegends, synergyScores));
        }
        setLoading(false);
    };

    const toggleLegend = (legend: string) => {
        if (selectedLegends.includes(legend)) {
            setSelectedLegends(selectedLegends.filter(l => l !== legend));
        } else if (selectedLegends.length < 3) {
            setSelectedLegends([...selectedLegends, legend]);
        }
    };

    const legends = Object.keys(LEGEND_DATA).sort();

    return (
        <div className="card companion">
            <h2 className="card__title">
                <Crosshair size={20} />
                Apex Companion
            </h2>

            <div className="companion-tabs">
                <button
                    onClick={() => setActiveTab('loadout')}
                    className={`companion-tab ${activeTab === 'loadout' ? 'companion-tab--active' : ''}`}
                >
                    <Zap size={16} />
                    Loadout
                </button>
                <button
                    onClick={() => setActiveTab('synergy')}
                    className={`companion-tab ${activeTab === 'synergy' ? 'companion-tab--active' : ''}`}
                >
                    <Users size={16} />
                    Team Synergy
                </button>
            </div>

            {activeTab === 'loadout' ? (
                <div className="companion-loadout">
                    <h3 className="companion-section-title">
                        <Activity size={16} />
                        Configure Playstyle
                    </h3>

                    <div className="companion-form">
                        <div className="companion-field">
                            <label className="companion-label" id="playstyle-label">Playstyle</label>
                            <select
                                value={playstyle}
                                onChange={(e) => setPlaystyle(e.target.value)}
                                className="companion-select"
                                aria-labelledby="playstyle-label"
                            >
                                <option value="aggressive">Aggressive</option>
                                <option value="balanced">Balanced</option>
                                <option value="defensive">Defensive</option>
                                <option value="support">Support</option>
                            </select>
                        </div>

                        <div className="companion-field">
                            <label className="companion-label" id="role-label">Preferred Role</label>
                            <select
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                className="companion-select"
                                aria-labelledby="role-label"
                            >
                                <option value="assault">Assault</option>
                                <option value="recon">Recon</option>
                                <option value="support">Support</option>
                                <option value="defense">Defense</option>
                                <option value="skirmisher">Skirmisher</option>
                            </select>
                        </div>

                        <div className="companion-field">
                            <label className="companion-label" id="skill-label">Skill Level</label>
                            <select
                                value={skillLevel}
                                onChange={(e) => setSkillLevel(e.target.value)}
                                className="companion-select"
                                aria-labelledby="skill-label"
                            >
                                <option value="beginner">Beginner</option>
                                <option value="intermediate">Intermediate</option>
                                <option value="advanced">Advanced</option>
                                <option value="pro">Pro</option>
                            </select>
                        </div>
                    </div>

                    <button
                        onClick={getLoadoutRecommendation}
                        disabled={loading}
                        className="companion-btn companion-btn--primary"
                    >
                        {loading ? 'Analyzing...' : 'Get Loadout Recommendation'}
                    </button>
                </div>
            ) : (
                <div className="companion-synergy">
                    <h3 className="companion-section-title">
                        <Shield size={16} />
                        Select Squad (Max 3)
                    </h3>

                    <div className="companion-legend-grid">
                        {legends.map(legend => (
                            <button
                                key={legend}
                                onClick={() => toggleLegend(legend)}
                                disabled={!selectedLegends.includes(legend) && selectedLegends.length >= 3}
                                className={`companion-legend-btn ${selectedLegends.includes(legend) ? 'companion-legend-btn--selected' : ''
                                    }`}
                            >
                                {legend}
                            </button>
                        ))}
                    </div>

                    <div className="companion-selected">
                        <span>Selected: {selectedLegends.length > 0 ? selectedLegends.join(', ') : 'None'}</span>
                        {selectedLegends.length > 0 && (
                            <button
                                onClick={() => setSelectedLegends([])}
                                className="companion-clear-btn"
                            >
                                Clear All
                            </button>
                        )}
                    </div>

                    {synergyScores && (
                        <div className="companion-scores">
                            <h4 className="companion-scores-title">
                                <TrendingUp size={16} />
                                Synergy Analysis
                            </h4>

                            <div className="companion-total-score">
                                <div className={`companion-total-value ${getScoreTextColor(synergyScores.total)}`}>
                                    {synergyScores.total}
                                </div>
                                <div className="companion-total-label">/ 10 Overall</div>
                            </div>

                            <div className="companion-score-bars">
                                <ScoreBar
                                    label="Ability Synergy (30%)"
                                    score={synergyScores.ability}
                                    color={getScoreColor(synergyScores.ability)}
                                />
                                <ScoreBar
                                    label="Role Balance (25%)"
                                    score={synergyScores.role}
                                    color={getScoreColor(synergyScores.role)}
                                />
                                <ScoreBar
                                    label="Range Compatibility (20%)"
                                    score={synergyScores.range}
                                    color={getScoreColor(synergyScores.range)}
                                />
                                <ScoreBar
                                    label="Mobility Sync (15%)"
                                    score={synergyScores.mobility}
                                    color={getScoreColor(synergyScores.mobility)}
                                />
                                <ScoreBar
                                    label="Ultimate Economy (10%)"
                                    score={synergyScores.ultimate}
                                    color={getScoreColor(synergyScores.ultimate)}
                                />
                            </div>

                            {synergyScores.combos.length > 0 && (
                                <div className="companion-combos">
                                    <div className="companion-combos-title">Combo Synergies:</div>
                                    {synergyScores.combos.map((combo, i) => (
                                        <div key={i} className="companion-combo-item">• {combo}</div>
                                    ))}
                                </div>
                            )}

                            {synergyScores.conflicts.length > 0 && (
                                <div className="companion-conflicts">
                                    <div className="companion-conflicts-title">⚠️ Conflicts:</div>
                                    {synergyScores.conflicts.map((conflict, i) => (
                                        <div key={i} className="companion-conflict-item">• {conflict}</div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    <button
                        onClick={getTeamAnalysis}
                        disabled={loading || selectedLegends.length === 0}
                        className="companion-btn companion-btn--primary"
                    >
                        {loading ? 'Analyzing Strategy...' : 'Get Strategic Analysis'}
                    </button>
                </div>
            )}

            {aiResponse && (
                <div className="companion-response">
                    <h4 className="companion-response-title">AI Analysis</h4>
                    <pre className="companion-response-content">{aiResponse}</pre>
                </div>
            )}
        </div>
    );
}

// Hard-coded fallback recommendations
function getHardcodedLoadout(playstyle: string, role: string, skillLevel: string): string {
    const recommendations: Record<string, Record<string, string>> = {
        aggressive: {
            assault: `TOP 3 LEGENDS:
1. Bangalore - Smoke cover for aggressive pushes
2. Mad Maggie - Breach walls and speed boost
3. Fuse - Crowd control and area denial

PRIMARY WEAPON: R-301 Carbine
Attachments: 2x HCOG, Extended Mag, Barrel Stabilizer
Why: Versatile and reliable for all ranges

SECONDARY WEAPON: Peacekeeper
Attachments: Precision Choke
Why: High burst damage for close encounters

KEY TIPS:
• Use smoke to close gaps safely
• Always have an escape route planned
• Coordinate pushes with your team`,
            skirmisher: `TOP 3 LEGENDS:
1. Wraith - Portal for safe repositioning
2. Octane - Speed for flanks and escapes
3. Pathfinder - High ground advantage

PRIMARY WEAPON: R-99 SMG
Attachments: 1x HCOG, Extended Mag
Why: Fast TTK for close-range fights

SECONDARY WEAPON: Wingman
Attachments: 1x HCOG
Why: High skill ceiling, great for pokes

KEY TIPS:
• Use abilities to create angles
• Hit-and-run tactics work best
• Always have a disengage plan`,
        },
        defensive: {
            defense: `TOP 3 LEGENDS:
1. Caustic - Area denial master
2. Wattson - Zone control and ult blocking
3. Rampart - Amped cover for gunfights

PRIMARY WEAPON: 30-30 Repeater
Attachments: 3x Ranger, Shatter Caps
Why: Effective at range while holding position

SECONDARY WEAPON: EVA-8 Auto
Attachments: Double Tap, Bolt
Why: Defense against pushes

KEY TIPS:
• Set up in buildings with multiple angles
• Stack defensive abilities for fortress
• Control ring rotations early`,
        },
    };

    const styleRecs = recommendations[playstyle] || recommendations.aggressive;
    return styleRecs[role] || styleRecs.assault || 'Select different options for recommendations.';
}

function getHardcodedTeamAnalysis(legends: string[], scores: SynergyScores): string {
    const legendList = legends.join(', ');

    let strengths = ['Unique legend selection'];
    let weaknesses = ['Limited sample size for analysis'];

    if (scores.mobility >= 8) {
        strengths.push('High team mobility for rotations');
    } else if (scores.mobility <= 4) {
        weaknesses.push('Low mobility may struggle with rotations');
    }

    if (scores.role >= 8) {
        strengths.push('Well-balanced roles cover all situations');
    } else if (scores.role <= 5) {
        weaknesses.push('Role overlap limits team versatility');
    }

    if (scores.combos.length > 0) {
        strengths.push(`${scores.combos.length} ability combo(s) available`);
    }

    if (scores.conflicts.length > 0) {
        weaknesses.push(`${scores.conflicts.length} ability conflict(s) to manage`);
    }

    return `TEAM: ${legendList}
OVERALL SCORE: ${scores.total}/10

STRENGTHS:
${strengths.map(s => `• ${s}`).join('\n')}

WEAKNESSES:
${weaknesses.map(w => `• ${w}`).join('\n')}

RECOMMENDED STRATEGY:
${scores.total >= 7
            ? 'This team has strong synergy. Focus on executing your combo abilities and maintaining team cohesion during fights.'
            : 'Consider adjusting your team composition for better synergy. Work around the conflicts by timing abilities carefully.'}`;
}
