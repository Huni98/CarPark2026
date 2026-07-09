import { useState, useEffect, useCallback } from "react";
import type { PropsWithChildren } from "react";
import type { Basket } from "../models/basket";
import { BasketContext } from "./BasketContext";
import { getBasket, createBasket, deleteBasket } from "../data/basket";

export function BasketProvider({ children }: PropsWithChildren) {
    const [basket, setBasket] = useState<Basket[]>(() => {
        const saved = localStorage.getItem("carpark_basket");
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        async function loadBasket() {
            try {
                const apiBasket = await getBasket();
                setBasket(apiBasket);
            } catch (error) {
                console.error("Failed to load basket from API", error);
            }
        }
        loadBasket();
    }, []);

    useEffect(() => {
        localStorage.setItem("carpark_basket", JSON.stringify(basket));
    }, [basket]);

    const addToBasket = useCallback(async (car: Basket) => {
        try {
            const addedCar = await createBasket(car);
            setBasket((prev) => [...prev, addedCar]);
        } catch (error) {
            console.error("Failed to add to basket", error);
        }
    }, []);

    const removeFromBasket = useCallback(async (vin: string) => {
        try {
            await deleteBasket(vin);
            setBasket((prev) => prev.filter((item) => item.vin !== vin));
        } catch (error) {
            console.error("Failed to remove from basket", error);
        }
    }, []);

    // NEW: Function to clear the entire basket on checkout
    const clearBasket = useCallback(async () => {
        try {
            // Delete all items from the API concurrently
            await Promise.all(basket.map((item) => deleteBasket(item.vin)));

            // Clear local state
            setBasket([]);
        } catch (error) {
            console.error("Failed to clear basket", error);
        }
    }, [basket]);

    const isInBasket = useCallback((vin: string) => {
        return basket.some((item) => item.vin === vin);
    }, [basket]);

    const basketTotal = basket.reduce((total, car) => total + car.price, 0);

    const contextValue = {
        basket,
        addToBasket,
        removeFromBasket,
        isInBasket,
        basketTotal,
        clearBasket // Export it here
    };

    return (
        <BasketContext.Provider value={contextValue}>
            {children}
        </BasketContext.Provider>
    );
}