import React from 'react';

export default function UserStats() {
    const masteryData = [
        { name: 'Wraith', level: 100, progress: 100, color: 'var(--accent-red)' },
        { name: 'Octane', level: 82, progress: 82, color: 'var(--accent-gold)' },
        { name: 'Horizon', level: 45, progress: 45, color: 'var(--accent-blue)' },
    ];

    return (
        <div className="sidebar-stats">
            <div className="profile-card card">
                <div className="profile-card__badge">Apex Predator</div>
                <div className="avatar-container">
                    <img src="https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop" alt="Profile" />
                </div>
                <h2 className="profile-card__name">ACE_WRAITH</h2>
                <p className="profile-card__title">Wraith Main | Movement Specialist</p>

                <div className="stat-grid">
                    <div className="stat-item">
                        <span className="stat-value">42.5k</span>
                        <span className="stat-label">Total Kills</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-value">4.2</span>
                        <span className="stat-label">K/D Ratio</span>
                    </div>
                </div>
            </div>

            <div className="mastery-card card">
                <h3 className="card__title">
                    <span role="img" aria-label="chart">📈</span> Legend Mastery
                </h3>
                <div className="mastery-list">
                    {masteryData.map((legend) => (
                        <div key={legend.name} className="mastery-item">
                            <div className="mastery-item__header">
                                <span>{legend.name}</span>
                                <span className="muted-text">Lv. {legend.level}</span>
                            </div>
                            <div className="progress-bar">
                                <div
                                    className="progress-bar__fill"
                                    style={{ width: `${legend.progress}%`, backgroundColor: legend.color }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
