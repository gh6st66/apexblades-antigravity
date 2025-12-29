import React from 'react';
import './styles/index.css';
import MapRotation from './components/MapRotation';
import PredatorCap from './components/PredatorCap';
import AceCalculator from './components/AceCalculator';
import CheatCardViewer from './components/CheatCardViewer';
import PatchNotesViewer from './components/PatchNotesViewer';
import MovementWikiViewer from './components/MovementWikiViewer';
import UserStats from './components/UserStats';
import SynergyCalc from './components/SynergyCalc';
import MetaInfographic from './components/MetaInfographic';
import ApexCompanion from './components/ApexCompanion';

export default function App() {
    return (
        <div className="dashboard">
            <header className="dashboard__header">
                <h1 className="dashboard__title">ApexLegends.tech</h1>
                <p className="dashboard__subtitle">Season 27 Mastery Dashboard</p>
            </header>
            <main className="dashboard__grid">
                <div className="dashboard__column">
                    <UserStats />
                    <ApexCompanion />
                    <SynergyCalc />
                    <MetaInfographic />
                    <PatchNotesViewer />
                </div>
                <div className="dashboard__column">
                    <MapRotation />
                    <PredatorCap />
                    <AceCalculator />
                    <CheatCardViewer />
                    <MovementWikiViewer />
                </div>
            </main>
        </div>
    );
}
