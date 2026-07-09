import { useState } from 'react'
import './App.css'
import { Content } from './components/Content/Content'
import { Navbar } from './components/Navbar/Navbar'
import { BasketPage } from './components/BasketPage/BasketPage'
import { AdminPage } from './components/AdminPage/AdminPage' // 1. Import AdminPage
import { FiltersProvider } from './contexts/FiltersProvider'
import { CarListProvider } from './contexts/CarListProvider'
import { FavoritesProvider } from "./contexts/FavoritesProvider"
import { BasketProvider } from "./contexts/BasketProvider"

export function App() {
    // 2. Add "admin" back to the state type
    const [currentView, setCurrentView] = useState<"home" | "basket" | "admin">("home")

    return (
        <div className="App">

            <BasketProvider>
                <FavoritesProvider>
                    <FiltersProvider>
                        <CarListProvider>

                            <Navbar currentView={currentView} setCurrentView={setCurrentView} />

                            {currentView === "home" && (
                                <div className="App__hero">
                                    <div>
                                        <p className="App__eyebrow">CarPark</p>
                                        <h1>Hunors CarPark</h1>
                                        <p className="App__description">Browse all your favourite cars in one place.</p>
                                    </div>
                                </div>
                            )}

                            {/* 3. Add the route for the admin page */}
                            {currentView === "home" && <Content />}
                            {currentView === "basket" && <BasketPage />}
                            {currentView === "admin" && <AdminPage />}

                        </CarListProvider>
                    </FiltersProvider>
                </FavoritesProvider>
            </BasketProvider>

        </div>
    )
}