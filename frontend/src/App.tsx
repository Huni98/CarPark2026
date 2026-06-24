import './App.css'
import { Content } from './components/Content/Content'
import { FiltersProvider } from './contexts/FiltersProvider'
import { CarListProvider } from './contexts/CarListProvider'

export function App() {
    return (
        <div className="App">
            <div className="App__hero">
                <div>
                    <p className="App__eyebrow">CarPark</p>
                    <h1>Hunors CarPark</h1>
                    <p className="App__description">Browse all your favourite cars in one place.</p>
                </div>
            </div>
            <FiltersProvider>
                <CarListProvider>
                    <Content />
                </CarListProvider>
            </FiltersProvider>
        </div>
    )
}

