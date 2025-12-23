import React from 'react';
import './styles/index.css';
import MapRotation from './components/MapRotation';
import AceCalculator from './components/AceCalculator';
import CheatCardViewer from './components/CheatCardViewer';
import PatchNotesViewer from './components/PatchNotesViewer';
import MovementWikiViewer from './components/MovementWikiViewer';

export default function App() {
    return (
        <div className="dashboard">
            <header className="dashboard__header">
                <h1 className="dashboard__title">Apex.tech</h1>
                <p className="dashboard__subtitle">Season 27 Mastery Dashboard</p>
            </header>
            <main className="dashboard__grid">
                <div className="dashboard__column">
                    <MapRotation />
                    <PatchNotesViewer />
                    <MovementWikiViewer />
                </div>
                <div className="dashboard__column">
                    <AceCalculator />
                    <CheatCardViewer />
                </div>
            </main>
        </div>
    );
}
