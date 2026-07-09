import { createContext } from "react";
import type { Basket } from "../models/basket";

type BasketContextType = {
    basket: Basket[];
    addToBasket: (car: Basket) => Promise<void>;
    removeFromBasket: (vin: string) => Promise<void>;
    isInBasket: (vin: string) => boolean;
    basketTotal: number;
    clearBasket: () => Promise<void>;
}

export const BasketContext = createContext<BasketContextType | undefined>(undefined);