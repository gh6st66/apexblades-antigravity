import React, { useState, useEffect } from 'react';
import { loadWikiData, MovementWikiData } from '../utils/MovementWikiDataLoader';

export default function MovementWikiViewer() {
    const [data, setData] = useState<MovementWikiData | null>(null);

    useEffect(() => {
        const loadedData = loadWikiData();
        setData(loadedData);
    }, []);

    if (!data) return <div>Loading Wiki Data...</div>;

    const resolveUrl = (href: string) => {
        if (href.startsWith('http')) return href;
        return `https://apexmovement.tech${href}`;
    };

    return (
        <div className="wiki-viewer card">
            <h2 className="card__title gradient-text">
                <span role="img" aria-label="book">📚</span> Movement Wiki
            </h2>

            <div className="wiki-section">
                <h3 className="wiki-section-title">Official Resources</h3>
                <div className="wiki-tags">
                    {data.sidebarLinks.slice(0, 10).map((link, i) => ( // Limit to 10 to clear clutter
                        <a
                            key={i}
                            href={resolveUrl(link.href)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="wiki-tag"
                        >
                            {link.text}
                        </a>
                    ))}
                </div>
            </div>

            <div className="wiki-section">
                <h3 className="wiki-section-title">Featured Techniques</h3>
                <ul className="wiki-list">
                    {data.featuredArticles.map((article, i) => (
                        <li key={i}>
                            <a
                                href={resolveUrl(article.href)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="wiki-link-item"
                            >
                                {article.title}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
