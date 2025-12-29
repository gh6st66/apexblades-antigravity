import React, { useState, useEffect } from 'react';
import { loadWikiData, MovementWikiData } from '../utils/MovementWikiDataLoader';
import { loadMasterMovementData, MovementTech } from '../utils/MovementTechLoader';
import HlsPlayer from './HlsPlayer';

export default function MovementWikiViewer() {
    const [wikiData, setWikiData] = useState<MovementWikiData | null>(null);
    const [techData, setTechData] = useState<MovementTech[]>([]);
    const [activeVideo, setActiveVideo] = useState<string | null>(null);
    const [isVertical, setIsVertical] = useState(false);

    useEffect(() => {
        setWikiData(loadWikiData());
        const allTech = loadMasterMovementData();
        // Filter for items with videos and limited to a subset for better UI
        const withVideos = allTech.filter(t => t.video_available).slice(0, 12);
        setTechData(withVideos);
    }, []);

    if (!wikiData) return <div>Loading Wiki Data...</div>;

    const resolveUrl = (href: string) => {
        if (href.startsWith('http')) return href;
        return `https://apexmovement.tech${href}`;
    };

    return (
        <div className="wiki-viewer">
            <header className="wiki-header">
                <h2 className="wiki-title">Technique Library</h2>
                <p className="wiki-subtitle">Master the art of momentum and spatial dominance.</p>
            </header>

            <div className="movement-grid">
                {techData.map((tech, i) => {
                    const diffLabel = tech.difficulty === 1 ? 'easy' : tech.difficulty <= 3 ? 'medium' : 'hard';
                    return (
                        <div
                            key={i}
                            className="move-card card"
                            onClick={() => tech.original_video_url && setActiveVideo(tech.original_video_url)}
                        >
                            <div className="move-card__header">
                                <span className={`difficulty diff-${diffLabel}`}>{diffLabel}</span>
                                <span role="img" aria-label="play" className="play-icon">▶</span>
                            </div>
                            <h3 className="move-card__title">{tech.title}</h3>
                            <p className="move-card__desc">
                                {tech.primary_category} {tech.secondary_category ? `> ${tech.secondary_category}` : ''}
                            </p>
                            <div className="wiki-tags">
                                {tech.tags.split(',').filter(t => t.trim()).slice(0, 3).map((tag, j) => (
                                    <span key={j} className="wiki-tag">#{tag.trim()}</span>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>

            {activeVideo && (
                <div className="video-modal-overlay" onClick={() => setActiveVideo(null)}>
                    <div className={`video-modal-content ${isVertical ? 'vertical-mode' : ''}`} onClick={e => e.stopPropagation()}>
                        <button className="video-modal-close" onClick={() => setActiveVideo(null)}>&times;</button>
                        <button className="video-mode-toggle" onClick={() => setIsVertical(!isVertical)}>
                            {isVertical ? 'Cinema View' : 'Mobile View'}
                        </button>
                        <HlsPlayer src={activeVideo} autoPlay={true} className={isVertical ? 'vertical-player' : ''} />
                        <div className="video-modal-footer">
                            <p>Streaming directly from ApexMovement.tech</p>
                        </div>
                    </div>
                </div>
            )}

            <div className="wiki-section" style={{ marginTop: 'var(--space-xl)' }}>
                <h3 className="wiki-section-title">Guides & Resources</h3>
                <div className="wiki-tags">
                    {wikiData.featuredArticles.map((article, i) => (
                        <a
                            key={i}
                            href={resolveUrl(article.href)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="wiki-tag wiki-tag--large"
                        >
                            {article.title}
                        </a>
                    ))}
                    {wikiData.sidebarLinks.slice(1, 5).map((link, i) => (
                        <a
                            key={`link-${i}`}
                            href={resolveUrl(link.href)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="wiki-tag wiki-tag--large"
                        >
                            {link.text}
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
}
