import React, { useState, useEffect } from 'react';

interface CheatCard {
    legend: {
        name: string;
        role_type: string;
        primary_win_condition: string;
    };
    role: {
        responsibility: string;
        lead_when: string;
        follow_when: string;
        disengage_when: string;
    };
    positioning: {
        preferred_terrain: string[];
        fight_distance: string;
        commit_vs_hold: string;
    };
    abilities: {
        passive: { name: string; leverage_when: string; do_not_rely_on: string };
        tactical: { name: string; primary_use: string; timing_rule: string; notes: string };
        ultimate: { name: string; best_use_cases: string[]; do_not_use_when: string; cooldown_seconds?: number };
    };
    fight_flow: {
        start: string;
        mid_fight: string;
        exit_reset: string;
    };
    weapons: {
        primary: { weapon: string; reason: string };
        secondary: { weapon: string; reason: string };
        avoid: string[];
    };
    common_mistakes: string[];
    mental_rule: string;
}

type CheatCardsData = Record<string, CheatCard>;

export default function CheatCardViewer() {
    const [cards, setCards] = useState<CheatCardsData | null>(null);
    const [selectedLegend, setSelectedLegend] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch('/data/legends/cheat_cards/s27_cheat_cards.json')
            .then(res => {
                if (!res.ok) throw new Error('Failed to load cheat cards');
                return res.json();
            })
            .then((data: CheatCardsData) => {
                setCards(data);
                const legends = Object.keys(data);
                if (legends.length > 0) setSelectedLegend(legends[0]);
            })
            .catch(err => setError(err.message));
    }, []);

    if (error) {
        return (
            <div className="card">
                <div className="card__title">📋 Legend Cheat Card</div>
                <p className="error-text">Error: {error}</p>
            </div>
        );
    }

    if (!cards) {
        return (
            <div className="card">
                <div className="card__title">📋 Legend Cheat Card</div>
                <p className="muted-text">Loading...</p>
            </div>
        );
    }

    const legends = Object.keys(cards);
    const card = cards[selectedLegend];

    if (!card) return null;

    return (
        <div className="card cheat-viewer">
            <div className="card__title">📋 Legend Cheat Card</div>

            <select
                className="cheat-viewer__select"
                value={selectedLegend}
                onChange={(e) => setSelectedLegend(e.target.value)}
                aria-label="Select a legend"
            >
                {legends.map(legend => (
                    <option key={legend} value={legend}>
                        {card && cards[legend]?.legend?.name || legend}
                    </option>
                ))}
            </select>

            <div className="cheat-card">
                <div className="cheat-card__header">
                    <div className="cheat-card__legend-name">{card.legend.name}</div>
                    <span className="cheat-card__role-badge">{card.legend.role_type}</span>
                </div>

                <div className="cheat-card__grid">
                    {/* Role */}
                    <div className="cheat-section">
                        <div className="cheat-section__title">Role</div>
                        <div className="cheat-section__content">
                            <strong>Responsibility:</strong> {card.role.responsibility}
                            <br /><strong>Lead when:</strong> {card.role.lead_when}
                            <br /><strong>Follow when:</strong> {card.role.follow_when}
                            <br /><strong>Disengage when:</strong> {card.role.disengage_when}
                        </div>
                    </div>

                    {/* Positioning */}
                    <div className="cheat-section">
                        <div className="cheat-section__title">Positioning</div>
                        <div className="cheat-section__content">
                            <strong>Terrain:</strong> {card.positioning.preferred_terrain.join(', ')}
                            <br /><strong>Distance:</strong> {card.positioning.fight_distance}
                            <br /><strong>Commit/Hold:</strong> {card.positioning.commit_vs_hold}
                        </div>
                    </div>

                    {/* Abilities */}
                    <div className="cheat-section">
                        <div className="cheat-section__title">Abilities</div>
                        <div className="cheat-section__content">
                            <strong>{card.abilities.passive.name}:</strong> {card.abilities.passive.leverage_when}
                            <br /><strong>{card.abilities.tactical.name}:</strong> {card.abilities.tactical.primary_use} ({card.abilities.tactical.timing_rule})
                            <br /><strong>{card.abilities.ultimate.name}:</strong> {card.abilities.ultimate.best_use_cases.join(', ')}
                        </div>
                    </div>

                    {/* Fight Flow */}
                    <div className="cheat-section">
                        <div className="cheat-section__title">Fight Flow</div>
                        <div className="cheat-section__content">
                            <strong>Start:</strong> {card.fight_flow.start}
                            <br /><strong>Mid-fight:</strong> {card.fight_flow.mid_fight}
                            <br /><strong>Exit:</strong> {card.fight_flow.exit_reset}
                        </div>
                    </div>

                    {/* Weapons */}
                    <div className="cheat-section">
                        <div className="cheat-section__title">Weapons</div>
                        <div className="cheat-section__content">
                            <strong>Primary:</strong> {card.weapons.primary.weapon}
                            <br /><strong>Secondary:</strong> {card.weapons.secondary.weapon}
                            <br /><strong>Avoid:</strong> {card.weapons.avoid.join(', ')}
                        </div>
                    </div>

                    {/* Common Mistakes */}
                    <div className="cheat-section">
                        <div className="cheat-section__title">Common Mistakes</div>
                        <ul className="cheat-section__list">
                            {card.common_mistakes.slice(0, 4).map((mistake, i) => (
                                <li key={i}>{mistake}</li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Mental Rule */}
                <div className="mental-rule">
                    &quot;{card.mental_rule}&quot;
                </div>
            </div>
        </div>
    );
}
