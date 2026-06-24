import type { Car } from "../../models/car";
import { IMG_BASE_URL } from "../../data/constants";
import "./CarModal.css";

type Props = {
    car: Car;
    onClose: () => void;
}

export function CarModal({ car, onClose }: Props) {
    // Split the equipment string into a clean array
    const equipments = car.equipment.split(",").filter(eq => eq.trim() !== "");

    return (
        <div className="CarModal__overlay" onClick={onClose}>
            {/* Prevent clicks inside the modal from closing it */}
            <div className="CarModal__content" onClick={(e) => e.stopPropagation()}>
                <button className="CarModal__close" onClick={onClose}>&times;</button>
                
                <div className="CarModal__header">
                    <img src={`${IMG_BASE_URL}/${car.image}`} alt={`${car.manufacturer} ${car.model}`} className="CarModal__image" />
                    
                    <div className="CarModal__titleBox">
                        <h2>{car.manufacturer} {car.model}</h2>
                        <div className="CarModal__price">{car.price} EUR</div>
                    </div>
                </div>

                <div className="CarModal__statsGrid">
                    <div className="CarModal__stat"><span>Year:</span> {car.constructionYear}</div>
                    <div className="CarModal__stat"><span>Mileage:</span> {car.mileage} km</div>
                    <div className="CarModal__stat"><span>Fuel:</span> {car.fuelType}</div>
                    <div className="CarModal__stat"><span>Gearbox:</span> {car.gearbox}</div>
                    <div className="CarModal__stat"><span>Engine:</span> {car.engineSize} cm³</div>
                    <div className="CarModal__stat"><span>Power:</span> {car.power} HP</div>
                </div>

                <div className="CarModal__section">
                    <h3>Description</h3>
                    <p>{car.description}</p>
                </div>
                
                <div className="CarModal__section">
                    <h3>Equipment</h3>
                    <ul className="CarModal__equipmentList">
                        {equipments.map((eq, index) => (
                            <li key={index}>{eq.trim()}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}