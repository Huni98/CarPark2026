import { createContext } from "react";
import type { Car } from "../models/car";

// 1. Updated Filters Type to exactly match the DB and API requirements
export type Filters = {
    manufacturer: string;
    model: string;
    constructionYear: string;
    mileage_lte: string; // Appended _lte for max range
    fuelType: string;
    gearbox: string;     // Renamed to match DB
    power_gte: string;   // Appended _gte for min range
    price_lte: string;   // Appended _lte for max range
}

type FiltersContextType = {
    filters: Filters;
    setFilters: React.Dispatch<React.SetStateAction<Filters>>;
    updateFilter: (field: keyof Filters, value: string) => void;
    resetFilters: () => void;
    showFavoritesOnly: boolean;
    handleFavoritesToggle: (checked: boolean) => void;
    
    sort: keyof Car | undefined;
    setSort: React.Dispatch<React.SetStateAction<keyof Car | undefined>>;
    order: "asc" | "desc";
    setOrder: React.Dispatch<React.SetStateAction<"asc" | "desc">>;
    limit: number;
    setLimit: (limit: number) => void; 
    page: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
}

export const FiltersContext = createContext<FiltersContextType | undefined>(undefined)