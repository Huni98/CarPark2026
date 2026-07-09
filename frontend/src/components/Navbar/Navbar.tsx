import { useBasket } from "../../hooks/useBasket"
import "./Navbar.css"

type Props = {
    currentView: "home" | "basket" | "admin";
    setCurrentView: (view: "home" | "basket" | "admin") => void;
}

export function Navbar({ currentView, setCurrentView }: Props) {
    const { basket } = useBasket();

    return (
        <nav className="Navbar">
            <div className="Navbar__logo" onClick={() => setCurrentView("home")}>
                CarPark
            </div>
            <div className="Navbar__links">
                <button 
                    className={`Navbar__btn ${currentView === "home" ? "active" : ""}`}
                    onClick={() => setCurrentView("home")}
                >
                    Home
                </button>
                <button 
                    className={`Navbar__btn ${currentView === "basket" ? "active" : ""}`}
                    onClick={() => setCurrentView("basket")}
                >
                    Basket ({basket.length})
                </button>
                <button 
                    className={`Navbar__btn ${currentView === "admin" ? "active" : ""}`}
                    onClick={() => setCurrentView("admin")}
                >
                    Admin
                </button>
            </div>
        </nav>
    )
}