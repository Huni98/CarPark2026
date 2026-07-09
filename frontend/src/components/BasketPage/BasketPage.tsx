import { useState } from "react"
import { useBasket } from "../../hooks/useBasket"
import { IMG_BASE_URL } from "../../data/constants"
import "./BasketPage.css"

export function BasketPage() {
    const { basket, removeFromBasket, basketTotal, clearBasket } = useBasket()

    const [isCheckingOut, setIsCheckingOut] = useState(false)
    const [orderSuccess, setOrderSuccess] = useState(false)

    const handleCheckout = async () => {
        setIsCheckingOut(true)
        await clearBasket()
        setOrderSuccess(true)
        setIsCheckingOut(false)
    }

    if (orderSuccess) {
        return (
            <div className="BasketPage empty">
                <h2 style={{ color: "#10b981" }}>🎉 Order Placed Successfully!</h2>
                <p>Thank you for your purchase. We will contact you shortly with delivery details.</p>
            </div>
        )
    }

    if (basket.length === 0) {
        return (
            <div className="BasketPage empty">
                <h2>Your basket is empty</h2>
                <p>Go back to the home page to find your perfect car!</p>
            </div>
        )
    }

    return (
        <div className="BasketPage">
            <h2>Your Basket</h2>
            
            <div className="BasketPage__list">
                {basket.map((car) => (
                    <div key={car.vin} className="BasketPage__item">
                        <img src={`${IMG_BASE_URL}/${car.image}`} alt={car.model} className="BasketPage__img" />
                        <div className="BasketPage__details">
                            <h3>{car.manufacturer} {car.model}</h3>
                            <p>{car.constructionYear} • {car.mileage} km</p>
                        </div>
                        <div className="BasketPage__price">
                            {car.price} EUR
                        </div>
                        <button 
                            className="BasketPage__remove"
                            onClick={() => removeFromBasket(car.vin)}
                            disabled={isCheckingOut}
                        >
                            &times;
                        </button>
                    </div>
                ))}
            </div>

            <div className="BasketPage__summary">
                <h3>Total Estimate: <span>{basketTotal} EUR</span></h3>
                <button 
                    className="BasketPage__checkout"
                    onClick={handleCheckout}
                    disabled={isCheckingOut}
                    style={{ opacity: isCheckingOut ? 0.7 : 1 }}
                >
                    {isCheckingOut ? "Processing..." : "Proceed to Checkout"}
                </button>
            </div>
        </div>
    )
}