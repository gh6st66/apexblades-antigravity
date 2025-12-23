import React, { useState, useEffect } from 'react';

interface MapData {
    map: string;
    asset: string;
    remainingTimer?: string;
    readableDate_start: string;
    readableDate_end: string;
}

interface RotationMode {
    current: MapData;
    next: MapData;
}

interface ALSSnapshot {
    mapRotation: {
        battle_royale: RotationMode;
        ranked: RotationMode;
        ltm: RotationMode & { current: MapData & { eventName?: string } };
    };
}

export default function MapRotation() {
    const [data, setData] = useState<ALSSnapshot | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch('/data/meta/als_snapshot.json')
            .then(res => {
                if (!res.ok) throw new Error('Failed to load rotation data');
                return res.json();
            })
            .then(setData)
            .catch(err => setError(err.message));
    }, []);

    if (error) {
        return (
            <div className="card">
                <div className="card__title">🗺️ Map Rotation</div>
                <p className="error-text">Error: {error}</p>
            </div>
        );
    }

    if (!data) {
        return (
            <div className="card">
                <div className="card__title">🗺️ Map Rotation</div>
                <p className="muted-text">Loading...</p>
            </div>
        );
    }

    const { battle_royale, ranked, ltm } = data.mapRotation;

    return (
        <div className="card">
            <div className="card__title">🗺️ Map Rotation</div>
            <div className="map-rotation">
                {/* Battle Royale */}
                <div className="card__section">
                    <div className="card__label">Battle Royale</div>
                    <div className="map-card map-card--current">
                        <img
                            className="map-card__image"
                            src={battle_royale.current.asset}
                            alt={battle_royale.current.map}
                        />
                        <div className="map-card__info">
                            <div className="map-card__mode">Current</div>
                            <div className="map-card__name">{battle_royale.current.map}</div>
                            {battle_royale.current.remainingTimer && (
                                <div className="map-card__timer">{battle_royale.current.remainingTimer} remaining</div>
                            )}
                        </div>
                    </div>
                    <div className="map-card map-card--next map-card--spaced">
                        <img
                            className="map-card__image"
                            src={battle_royale.next.asset}
                            alt={battle_royale.next.map}
                        />
                        <div className="map-card__info">
                            <div className="map-card__mode">Next</div>
                            <div className="map-card__name">{battle_royale.next.map}</div>
                        </div>
                    </div>
                </div>

                {/* Ranked */}
                <div className="card__section">
                    <div className="card__label">Ranked</div>
                    <div className="map-card map-card--current">
                        <img
                            className="map-card__image"
                            src={ranked.current.asset}
                            alt={ranked.current.map}
                        />
                        <div className="map-card__info">
                            <div className="map-card__mode">Current</div>
                            <div className="map-card__name">{ranked.current.map}</div>
                            {ranked.current.remainingTimer && (
                                <div className="map-card__timer">{ranked.current.remainingTimer} remaining</div>
                            )}
                        </div>
                    </div>
                </div>

                {/* LTM */}
                {ltm?.current?.map && (
                    <div className="card__section">
                        <div className="card__label">{ltm.current.eventName || 'Limited Time Mode'}</div>
                        <div className="map-card map-card--current">
                            <img
                                className="map-card__image"
                                src={ltm.current.asset}
                                alt={ltm.current.map}
                            />
                            <div className="map-card__info">
                                <div className="map-card__mode">{ltm.current.eventName}</div>
                                <div className="map-card__name">{ltm.current.map}</div>
                                {ltm.current.remainingTimer && (
                                    <div className="map-card__timer">{ltm.current.remainingTimer} remaining</div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
