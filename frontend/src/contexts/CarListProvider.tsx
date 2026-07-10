
import { useCallback, useEffect, useState } from "react";
import type { PropsWithChildren } from "react";
import { getCars, type GetCarsParams } from "../data/car";
import type { Car } from "../models/car";
import { CarListContext, type CarListContextType } from "./CarListContext";
import { useFilters } from "../hooks/useFilters";


export function CarListProvider({ children }: PropsWithChildren) {

    const [carsList, setCarsList] = useState<Car[]>([])
    const [totalPages, setTotalPages] = useState<number>(1)
    const [total, setTotal] = useState<number>(0)

    const [isError, setIsError] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    const { filters, page, limit, sort, order } = useFilters()

    const getCarList = useCallback(async () => {
        setIsLoading(true)
        setIsError(false)
        try {

            const params: GetCarsParams = {
                filters: filters,
                page: page,
                limit: limit,
                sort: sort,
                order: order
            }

            const { items, total, totalPages } = await getCars(params)

            setCarsList(items)
            setTotalPages(totalPages)
            setTotal(total)

        } catch {
            setIsError(true)
        } finally {
            setIsLoading(false)
        }
    }, [filters, page, limit, sort, order])

    useEffect(() => {
        const delayTimer = setTimeout(() => {
        getCarList()
        }, 500)
        return () => clearTimeout(delayTimer)
    }, [filters, page, limit, sort, order])

    const context: CarListContextType = {
        carsList,
        isError,
        isLoading,
        totalPages,
        total
    }

    return (
        <CarListContext.Provider value={context}>
            {children}
        </CarListContext.Provider>
    )
}