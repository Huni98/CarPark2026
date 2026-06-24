import "./Content.css"
import { CarItem } from "../CarItem/CarItem"
import { useFilters } from "../../hooks/useFilters"
import { FiltersPanel } from "../FiltersPanel/FiltersPanel"
import { SortingPanel } from "../SortingPanel/SortingPanel"
import { useCarsList } from "../../hooks/useCarsList"
import { Pagination } from "../Pagination/Pagination"

export function Content() {
    const { filters } = useFilters()
    const { carsList, isLoading, isError } = useCarsList()

    const filteredCarsList = carsList.filter((car) => {
        const filteredManufacturer = filters.manufacturer === "" ||
            car.manufacturer.toLowerCase().includes(filters.manufacturer.toLowerCase())

        return filteredManufacturer
    })

    return (
        <div className="Content">
            <FiltersPanel />

            <SortingPanel />

            {isLoading && <p>Data is loading...</p>}
            {isError && <p>Something went wrong</p>}

            {!isLoading && !isError && (
                <div className="CarList">

                    <Pagination />

                    {filteredCarsList.map((car) => (
                        <CarItem key={car.vin} car={car} />
                    ))}

                    <Pagination />
                </div>
            )}
        </div>
    )
}