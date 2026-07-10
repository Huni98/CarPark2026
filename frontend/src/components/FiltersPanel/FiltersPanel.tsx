import { useState, useEffect } from "react";
import { useFilters } from "../../hooks/useFilters";
import { getManufacturers, getModelsByManufacturer } from "../../data/car";
import './FiltersPanel.css';

export function FiltersPanel() {
    const {
        filters,
        updateFilter,
        showFavoritesOnly,
        handleFavoritesToggle,
        resetFilters
    } = useFilters();

    // 1. Create state to hold our dropdown options
    const [availableManufacturers, setAvailableManufacturers] = useState<string[]>([]);
    const [availableModels, setAvailableModels] = useState<string[]>([]);

    // 2. Fetch manufacturers exactly once when the component mounts
    useEffect(() => {
        async function loadManufacturers() {
            try {
                const data = await getManufacturers();
                setAvailableManufacturers(data);
            } catch (error) {
                console.error("Failed to load manufacturers", error);
            }
        }
        loadManufacturers();
    }, []);

    // 3. Fetch models whenever the selected manufacturer changes
    useEffect(() => {
        async function loadModels() {
            // If they clear the manufacturer, empty the models list
            if (!filters.manufacturer) {
                setAvailableModels([]);
                return;
            }

            try {
                const data = await getModelsByManufacturer(filters.manufacturer);
                setAvailableModels(data);
            } catch (error) {
                console.error("Failed to load models", error);
            }
        }

        loadModels();
    }, [filters.manufacturer]);

    // 4. Custom handler for manufacturer to ensure we reset the model
    const handleManufacturerChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newManufacturer = e.target.value;
        updateFilter("manufacturer", newManufacturer);

        // Immediately clear the model when the manufacturer changes
        updateFilter("model", "");
    };

    return (
        <div className="FiltersPanel">
            <div className="FiltersPanel__header">
                <h3>Find Your Perfect Car</h3>
            </div>

            <div className="FiltersPanel__grid">
                {/* Make & Model Dropdowns */}
                <label className="FiltersPanel__inputGroup">
                    <span>Manufacturer</span>
                    <select
                        value={filters.manufacturer}
                        onChange={handleManufacturerChange}
                    >
                        <option value="">All Manufacturers</option>
                        {availableManufacturers.map(manufacturer => (
                            <option key={manufacturer} value={manufacturer}>
                                {manufacturer}
                            </option>
                        ))}
                    </select>
                </label>

                <label className="FiltersPanel__inputGroup">
                    <span>Model</span>
                    <select
                        value={filters.model}
                        onChange={(e) => updateFilter("model", e.target.value)}
                        disabled={!filters.manufacturer}
                    >
                        <option value="">All Models</option>
                        {availableModels.map(model => (
                            <option key={model} value={model}>
                                {model}
                            </option>
                        ))}
                    </select>
                </label>
                
                <label className="FiltersPanel__inputGroup">
                    <span>Year</span>
                    <input 
                        type="number" 
                        min="1900"
                        onKeyDown={(e) => { if (e.key === '-' || e.key === 'e') e.preventDefault() }}
                        placeholder="e.g. 2021" 
                        value={filters.constructionYear} 
                        onChange={(e) => updateFilter("constructionYear", e.target.value)} 
                    />
                </label>

                {/* Technical Specs */}
                <label className="FiltersPanel__inputGroup">
                    <span>Fuel Type</span>
                    <select value={filters.fuelType} onChange={(e) => updateFilter("fuelType", e.target.value)}>
                        <option value="">Any Fuel</option>
                        <option value="DIESEL">Diesel</option>
                        <option value="PETROL">Petrol</option>
                        <option value="ELECTRIC">Electric</option>
                        <option value="HYBRID">Hybrid</option>
                    </select>
                </label>
                
                <label className="FiltersPanel__inputGroup">
                    <span>Gearbox</span>
                    <select value={filters.gearbox} onChange={(e) => updateFilter("gearbox", e.target.value)}>
                        <option value="">Any Trans.</option>
                        <option value="AUTOMATIC">Automatic</option>
                        <option value="MANUAL">Manual</option>
                    </select>
                </label>
                
                <label className="FiltersPanel__inputGroup">
                    <span>Min Power (HP)</span>
                    <input 
                        type="number" 
                        min="0"
                        onKeyDown={(e) => { if (e.key === '-' || e.key === 'e') e.preventDefault() }}
                        placeholder="e.g. 150" 
                        value={filters.power_gte} 
                        onChange={(e) => updateFilter("power_gte", e.target.value)} 
                    />
                </label>

                <label className="FiltersPanel__inputGroup">
                    <span>Max Mileage</span>
                    <input 
                        type="number" 
                        min="0"
                        onKeyDown={(e) => { if (e.key === '-' || e.key === 'e') e.preventDefault() }}
                        placeholder="e.g. 50000 km" 
                        value={filters.mileage_lte} 
                        onChange={(e) => updateFilter("mileage_lte", e.target.value)} 
                    />
                </label>
                
                <label className="FiltersPanel__inputGroup">
                    <span>Max Price (€)</span>
                    <input 
                        type="number" 
                        min="0"
                        onKeyDown={(e) => { if (e.key === '-' || e.key === 'e') e.preventDefault() }}
                        placeholder="e.g. 35000" 
                        value={filters.price_lte} 
                        onChange={(e) => updateFilter("price_lte", e.target.value)} 
                    />
                </label>
            </div>

            <div className="FiltersPanel__controls">
                <label className="FiltersPanel__favoritesToggle">
                    <input
                        type="checkbox"
                        checked={showFavoritesOnly}
                        onChange={(e) => handleFavoritesToggle(e.target.checked)}
                    />
                    Show only favorites
                </label>

                <button type="button" onClick={resetFilters} className="FiltersPanel__resetBtn">
                    Clear Filters
                </button>
            </div>
        </div>
    )
}