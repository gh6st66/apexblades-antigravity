import React, { useState, useEffect } from 'react';

interface PlatformData {
    foundRank: number;
    val: number;
    totalMastersAndPreds: number;
    updateTimestamp: number;
}

interface PredatorData {
    predator: {
        RP: {
            PC: PlatformData;
            PS4: PlatformData;
            X1: PlatformData;
            SWITCH: PlatformData;
        };
    };
}

const PLATFORM_ICONS: Record<string, string> = {
    PC: '🖥️',
    PS4: '🎮',
    X1: '🎮',
    SWITCH: '🕹️'
};

const PLATFORM_NAMES: Record<string, string> = {
    PC: 'PC',
    PS4: 'PlayStation',
    X1: 'Xbox',
    SWITCH: 'Switch'
};

function formatRP(rp: number): string {
    return rp.toLocaleString();
}

function getTimeAgo(timestamp: number): string {
    const now = Math.floor(Date.now() / 1000);
    const diff = now - timestamp;

    if (diff < 60) return 'Just now';
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
}

export default function PredatorCap() {
    const [data, setData] = useState<PredatorData | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch('/data/meta/als_snapshot.json')
            .then(res => {
                if (!res.ok) throw new Error('Failed to load predator data');
                return res.json();
            })
            .then(setData)
            .catch(err => setError(err.message));
    }, []);

    if (error) {
        return (
            <div className="card">
                <div className="card__title">🏆 Predator Cap</div>
                <p className="error-text">Error: {error}</p>
            </div>
        );
    }

    if (!data) {
        return (
            <div className="card">
                <div className="card__title">🏆 Predator Cap</div>
                <p className="muted-text">Loading...</p>
            </div>
        );
    }

    const platforms = Object.entries(data.predator.RP) as [keyof typeof PLATFORM_NAMES, PlatformData][];

    return (
        <div className="card">
            <div className="card__title">🏆 Predator Cap</div>
            <div className="predator-grid">
                {platforms.map(([platform, info]) => (
                    <div key={platform} className="predator-card">
                        <div className="predator-card__header">
                            <span className="predator-card__icon">{PLATFORM_ICONS[platform]}</span>
                            <span className="predator-card__platform">{PLATFORM_NAMES[platform]}</span>
                        </div>
                        <div className="predator-card__rp">
                            <span className="predator-card__value">{formatRP(info.val)}</span>
                            <span className="predator-card__label">RP</span>
                        </div>
                        <div className="predator-card__meta">
                            <span className="predator-card__count">
                                {info.totalMastersAndPreds.toLocaleString()} Masters+
                            </span>
                            <span className="predator-card__updated">
                                {getTimeAgo(info.updateTimestamp)}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
