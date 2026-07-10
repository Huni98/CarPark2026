import { useState } from "react";
import type { PropsWithChildren } from "react";
import type { Filters } from "./FiltersContext";
import { FiltersContext } from "./FiltersContext";
import type { Car } from "../models/car";

const defaultFilters: Filters = {
    manufacturer: "",
    model: "",
    constructionYear: "",
    mileage_lte: "",
    fuelType: "",
    gearbox: "",
    power_gte: "",
    price_lte: "",
}

export function FiltersProvider({ children }: PropsWithChildren) {
    const [filters, setFilters] = useState<Filters>(defaultFilters)
    const [showFavoritesOnly, setShowFavoritesOnly] = useState(false)

    // NEW: Add actual state for sorting and pagination
    const [sort, setSort] = useState<keyof Car | undefined>("manufacturer")
    const [order, setOrder] = useState<"asc" | "desc">("asc")
    const [limit, setLimit] = useState<number>(5)
    const [page, setPage] = useState<number>(1)

    const updateFilter = (field: keyof Filters, value: string) => {
        setFilters(prev => ({ ...prev, [field]: value }))
        setPage(1) // Good UX: Reset to page 1 when typing a new filter
    }

    const resetFilters = () => {
        setFilters(defaultFilters)
        setShowFavoritesOnly(false)
        setSort("manufacturer")
        setOrder("asc")
        setPage(1)
    }

    const context = {
        filters,
        setFilters,
        updateFilter,
        resetFilters,
        showFavoritesOnly,
        handleFavoritesToggle: (checked: boolean) => {
            setShowFavoritesOnly(checked)
            setPage(1) // Good UX: Reset to page 1 when toggling favorites
        },

        // NEW: Export the state and setters to the context
        sort,
        setSort,
        order,
        setOrder,
        limit,
        setLimit: (newLimit: number) => {
            setLimit(newLimit)
            setPage(1) // Good UX: Reset to page 1 when changing page size
        },
        page,
        setPage
    }

    return (
        <FiltersContext.Provider value={context}>
            {children}
        </FiltersContext.Provider>
    )
}