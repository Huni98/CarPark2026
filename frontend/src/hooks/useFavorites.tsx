import { useContext } from "react";
import { FavoritesContext } from "../contexts/FavoritesContext"; // Adjust this path if needed

export function useFavorites() {
    const context = useContext(FavoritesContext);
    
    if (!context) {
        throw new Error("useFavorites must be used within a FavoritesProvider");
    }
    
    return context;
}