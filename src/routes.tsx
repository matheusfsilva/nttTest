import React from 'react';
import {
    Routes,
    Route
} from 'react-router-dom';
import ProducerPage from './pages/Producer';
import ListProducer from './pages/ListProducer';
import Home from './pages/Home';

export function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/listProducer" element={<ListProducer />} />
            <Route path="/Producer/:id" element={<ProducerPage />} />
        </Routes>
    )
}