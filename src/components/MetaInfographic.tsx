import React from 'react';
import metaDataRaw from '../../data/meta/s27_meta_stats.json';

const data = metaDataRaw;

export default function MetaInfographic() {
    const maxRate = Math.max(...data.pick_rates.map(p => p.rate));

    return (
        <div className="meta-infographic card">
            <header className="meta-header">
                <div className="meta-title-group">
                    <h2 className="meta-title">SEASON 27 META REPORT</h2>
                    <span className="meta-subtitle">Amped // {data.updated_at}</span>
                </div>
                <div className="meta-badge">S27</div>
            </header>

            <section className="meta-section">
                <h3 className="meta-section-title">Top 5 Pick Rates (Predator)</h3>
                <div className="pick-rate-chart">
                    {data.pick_rates.map((item, i) => (
                        <div key={item.legend} className="pick-rate-row">
                            <span className="pick-rank">#{item.rank}</span>
                            <span className="pick-name">{item.legend}</span>
                            <div className="pick-bar-container">
                                <div
                                    className="pick-bar"
                                    style={{ width: `${(item.rate / maxRate) * 100}%` }}
                                ></div>
                            </div>
                            <span className="pick-percent">{item.rate}%</span>
                        </div>
                    ))}
                </div>
            </section>

            <section className="meta-section">
                <h3 className="meta-section-title">Tier Hierarchy</h3>
                <div className="tier-list">
                    <div className="tier-row s-tier">
                        <div className="tier-label">S</div>
                        <div className="tier-content">{data.tier_list.S_Tier.join(' • ')}</div>
                    </div>
                    <div className="tier-row a-tier">
                        <div className="tier-label">A</div>
                        <div className="tier-content">{data.tier_list.A_Tier.join(' • ')}</div>
                    </div>
                    <div className="tier-row b-tier">
                        <div className="tier-label">B</div>
                        <div className="tier-content">{data.tier_list.B_Tier.join(' • ')}</div>
                    </div>
                    <div className="tier-row c-tier">
                        <div className="tier-label">C</div>
                        <div className="tier-content">{data.tier_list.C_Tier.join(' • ')}</div>
                    </div>
                    <div className="tier-row d-tier">
                        <div className="tier-label">D</div>
                        <div className="tier-content">{data.tier_list.D_Tier.join(' • ')}</div>
                    </div>
                </div>
            </section>

            <footer className="meta-footer">
                <p className="meta-notes">"{data.meta_notes}"</p>
                <div className="meta-sources">
                    Sources: {data.sources.join(', ')}
                </div>
            </footer>
        </div>
    );
}
