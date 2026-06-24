import { useState, useEffect, useCallback } from "react";
import type { PropsWithChildren } from "react";
import type { Car } from "../models/car";
import { FavoritesContext } from "./FavoritesContext";

export function FavoritesProvider({ children }: PropsWithChildren) {
    // Initialize state from localStorage if available, otherwise start empty
    const [favorites, setFavorites] = useState<Car[]>(() => {
        const saved = localStorage.getItem("carpark_favorites");
        return saved ? JSON.parse(saved) : [];
    });

    // Save to localStorage whenever favorites change
    useEffect(() => {
        localStorage.setItem("carpark_favorites", JSON.stringify(favorites));
    }, [favorites]);

    const toggleFavorite = useCallback((car: Car) => {
        setFavorites((prevFavorites) => {
            // Check if the car is already in the list using its VIN
            const isAlreadyFavorite = prevFavorites.some((fav) => fav.vin === car.vin);
            
            if (isAlreadyFavorite) {
                // If it is, remove it
                return prevFavorites.filter((fav) => fav.vin !== car.vin);
            } else {
                // If it's not, add it
                return [...prevFavorites, car];
            }
        });
    }, []);

    const isFavorite = useCallback((car: Car) => {
        return favorites.some((fav) => fav.vin === car.vin);
    }, [favorites]);

    const contextValue = {
        favorites,
        toggleFavorite,
        isFavorite
    };

    return (
        <FavoritesContext.Provider value={contextValue}>
            {children}
        </FavoritesContext.Provider>
    );
}