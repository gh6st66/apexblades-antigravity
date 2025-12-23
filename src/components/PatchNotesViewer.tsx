import React, { useState, useEffect } from 'react';

interface PatchNote {
    title: string;
    date: string;
    href: string;
    img: string;
}

export default function PatchNotesViewer() {
    const [notes, setNotes] = useState<PatchNote[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/data/patch_notes.json')
            .then(res => res.json())
            .then(data => {
                setNotes(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to load patch notes", err);
                setLoading(false);
            });
    }, []);

    if (loading) return (
        <div className="card">
            <div className="card__title">📰 Latest News</div>
            <p className="muted-text">Loading News...</p>
        </div>
    );

    return (
        <div className="card news-viewer">
            <div className="card__title">📰 Latest News</div>

            <div className="news-list">
                {notes.slice(0, 5).map((note, index) => (
                    <a key={index} href={note.href} target="_blank" rel="noopener noreferrer" className="news-item">
                        <div className="news-item__img-container">
                            <img src={note.img} alt={note.title} className="news-item__img" />
                        </div>
                        <div className="news-item__content">
                            <div className="news-item__date">{note.date}</div>
                            <div className="news-item__title">{note.title}</div>
                        </div>
                    </a>
                ))}
            </div>

            <div className="text-center">
                <a href="https://www.ea.com/games/apex-legends/news" target="_blank" rel="noopener noreferrer" className="ace-btn news-view-all">
                    View All News →
                </a>
            </div>
        </div>
    );
}
