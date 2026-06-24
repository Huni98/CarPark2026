import { createContext } from "react";
import type { Car } from "../models/car";

type FavoritesContextType = {
    favorites: Car[];
    toggleFavorite: (car: Car) => void;
    isFavorite: (car: Car) => boolean;
}

export const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);