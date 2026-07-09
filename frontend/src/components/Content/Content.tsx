import "./Content.css"
import { CarItem } from "../CarItem/CarItem"
import { useFilters } from "../../hooks/useFilters"
import { FiltersPanel } from "../FiltersPanel/FiltersPanel"
import { SortingPanel } from "../SortingPanel/SortingPanel"
import { useCarsList } from "../../hooks/useCarsList"
import { Pagination } from "../Pagination/Pagination"
import { useFavorites } from "../../hooks/useFavorites" // 1. Import the favorites hook

export function Content() {
    // 2. Destructure showFavoritesOnly
    const { filters, showFavoritesOnly } = useFilters() 
    const { carsList, isLoading, isError } = useCarsList()
    
    // 3. Get the favorites array from context
    const { favorites } = useFavorites() 

    // 4. If the toggle is checked, use the favorites list. Otherwise, use the API list.
    const baseCarsList = showFavoritesOnly ? favorites : carsList

    // 5. Apply the text filter to whichever list is currently active
    const filteredCarsList = baseCarsList.filter((car) => {
        const filteredManufacturer = filters.manufacturer === "" ||
            car.manufacturer.toLowerCase().includes(filters.manufacturer.toLowerCase())

        return filteredManufacturer
    })

    return (
        <div className="Content">
            <FiltersPanel />

            {/* Hide sorting panel if we are only viewing favorites */}
            {!showFavoritesOnly && <SortingPanel />}

            {isLoading && !showFavoritesOnly && <p>Data is loading...</p>}
            {isError && !showFavoritesOnly && <p>Something went wrong</p>}

            {(!isLoading && !isError) || showFavoritesOnly ? (
                <div className="CarList">

                    {/* Hide top pagination if we are only viewing favorites */}
                    {!showFavoritesOnly && <Pagination />}

                    {/* Show a friendly message if the list is empty */}
                    {filteredCarsList.length === 0 ? (
                        <p style={{ textAlign: "center", color: "var(--muted)", padding: "2rem" }}>
                            {showFavoritesOnly 
                                ? "You haven't added any favorites yet." 
                                : "No cars match your filters."}
                        </p>
                    ) : (
                        filteredCarsList.map((car) => (
                            <CarItem key={car.vin} car={car} />
                        ))
                    )}

                    {/* Hide bottom pagination if we are only viewing favorites */}
                    {!showFavoritesOnly && <Pagination />}
                </div>
            ) : null}
        </div>
    )
}