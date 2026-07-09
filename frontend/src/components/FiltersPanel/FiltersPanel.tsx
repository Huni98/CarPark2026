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
                        disabled={!filters.manufacturer} // Disable if no manufacturer is selected
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
                    <input type="number" placeholder="e.g. 2021" value={filters.constructionYear} onChange={(e) => updateFilter("constructionYear", e.target.value)} />
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
                    <span>Transmission</span>
                    <select value={filters.transmissionType} onChange={(e) => updateFilter("transmissionType", e.target.value)}>
                        <option value="">Any Trans.</option>
                        <option value="AUTOMATIC">Automatic</option>
                        <option value="MANUAL">Manual</option>
                    </select>
                </label>
                <label className="FiltersPanel__inputGroup">
                    <span>Power (HP)</span>
                    <input type="number" placeholder="Min Power" value={filters.power} onChange={(e) => updateFilter("power", e.target.value)} />
                </label>

                {/* Details */}
                <label className="FiltersPanel__inputGroup">
                    <span>Max Mileage</span>
                    <input type="number" placeholder="e.g. 50000 km" value={filters.mileage} onChange={(e) => updateFilter("mileage", e.target.value)} />
                </label>
                <label className="FiltersPanel__inputGroup">
                    <span>Color</span>
                    <input type="text" placeholder="e.g. White" value={filters.color} onChange={(e) => updateFilter("color", e.target.value)} />
                </label>
                <label className="FiltersPanel__inputGroup">
                    <span>Doors</span>
                    <input type="number" placeholder="e.g. 5" value={filters.doorCount} onChange={(e) => updateFilter("doorCount", e.target.value)} />
                </label>

                {/* Sales */}
                <label className="FiltersPanel__inputGroup">
                    <span>Condition</span>
                    <select value={filters.condition} onChange={(e) => updateFilter("condition", e.target.value)}>
                        <option value="">Any Cond.</option>
                        <option value="NEW">New</option>
                        <option value="USED">Used</option>
                    </select>
                </label>
                <label className="FiltersPanel__inputGroup">
                    <span>Max Price (€)</span>
                    <input type="number" placeholder="e.g. 35000" value={filters.price} onChange={(e) => updateFilter("price", e.target.value)} />
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