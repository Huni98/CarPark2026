import type { Car } from "../../models/car"
import "./CarItem.css"
import { useFavorites } from "../../hooks/useFavorites"
import { IMG_BASE_URL } from "../../data/constants"
import { useState } from "react"
import { CarModal } from "./CarModal"
import { useBasket } from "../../hooks/useBasket"

type Props = {
    car: Car
}

export function CarItem({ car }: Props) {
    const equipments = car.equipment.split(",")
    const { toggleFavorite, isFavorite } = useFavorites()
    //const [count, setCount] = useState(0)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const { addToBasket, removeFromBasket, isInBasket } = useBasket()

    return (
        <>
            <div className="carItem">
                <div className="imageContainer">
                    <img src={`${IMG_BASE_URL}/${car.image}`} className="carImage" alt={car.model} />
                </div>
                <div className="details">
                    <div className="row"><div className="label">Manufacturer: </div> {car.manufacturer}</div>
                    <div className="row"><div className="label">Model: </div>{car.model}</div>
                    <div className="row"><div className="label">Construction Year: </div>{car.constructionYear}</div>
                    <div className="row"><div className="label">Fuel type: </div>{car.fuelType}</div>
                    <div className="row"><div className="label">Mileage: </div>{car.mileage} km</div>
                    <div className="row"><div className="label">Engine size: </div>{car.engineSize} cm3</div>
                    <div className="row"><div className="label">Power: </div>{car.power} HP</div>
                    <br />
                    <div className="row">
                        <div className="label">Equipments (Preview):</div>
                    </div>
                    <div className="row">
                        <ul className="list">
                            {equipments.slice(0, 9).map((equipment, index) => {
                                return <li key={index}>{equipment.trim()}</li>
                            })}
                            {equipments.length > 9 && <li>...and more</li>}
                        </ul>
                    </div>
                </div>
                <div className="price">Price: {car.price} EUR</div>

                {/* Button Container */}
                <div className="row" style={{ display: 'flex', gap: '10px', marginTop: 'auto', flexWrap: 'wrap' }}>
                    <button className="button" onClick={() => setIsModalOpen(true)}>
                        Quick View
                    </button>
                    <button className="button" onClick={() => toggleFavorite(car)}>
                        {isFavorite(car) ? "★ Favorited" : "☆ Favorite"}
                    </button>
                    <button
                        className="button"
                        style={{ backgroundColor: isInBasket(car.vin) ? 'var(--muted)' : '#10b981' }}
                        onClick={() => isInBasket(car.vin) ? removeFromBasket(car.vin) : addToBasket(car)}
                    >
                        {isInBasket(car.vin) ? "Remove from Basket" : "Add to Basket"}
                    </button>
                </div>
            </div>

            {/* Render the modal if the state is true */}
            {isModalOpen && (
                <CarModal car={car} onClose={() => setIsModalOpen(false)} />
            )}
        </>
    )
}