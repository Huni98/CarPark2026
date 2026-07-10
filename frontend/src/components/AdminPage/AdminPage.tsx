import { useState, useEffect } from "react";
import { createCar, replaceCar, getAllCars } from "../../data/car"; 
import { uploadImage } from "../../data/images";
import type { Car } from "../../models/car";
import "./AdminPage.css";

export function AdminPage() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState("");
    const [imageFile, setImageFile] = useState<File | null>(null);

    // Mode state
    const [isEditMode, setIsEditMode] = useState(false);
    const [selectedVin, setSelectedVin] = useState<string>("");
    
    // Create a local state to hold ALL cars for the dropdown
    const [allCars, setAllCars] = useState<Car[]>([]);

    // Base empty form
    const emptyForm = {
        vin: "", manufacturer: "", model: "", constructionYear: "",
        mileage: "", fuelType: "PETROL", gearbox: "MANUAL", engineSize: "",
        power: "", condition: "USED", price: "", description: "", equipment: "",
        image: "default.png"
    };

    const [formData, setFormData] = useState(emptyForm);

    // Fetch the full list of cars ONLY when we switch to edit mode
    useEffect(() => {
        if (isEditMode) {
            getAllCars()
                .then(data => setAllCars(data))
                .catch(err => console.error("Failed to load cars for edit mode", err));
        }
    }, [isEditMode]);

    // Update the auto-populate effect to use `allCars`
    useEffect(() => {
        if (isEditMode && selectedVin) {
            const carToEdit = allCars.find(c => c.vin === selectedVin);
            if (carToEdit) {
                setFormData({
                    ...carToEdit,
                    constructionYear: String(carToEdit.constructionYear),
                    mileage: String(carToEdit.mileage),
                    engineSize: String(carToEdit.engineSize),
                    power: String(carToEdit.power),
                    price: String(carToEdit.price),
                    condition: "USED" // Matches emptyForm to satisfy TypeScript
                });
            }
        } else {
            setFormData(emptyForm);
            setImageFile(null);
        }
    }, [isEditMode, selectedVin, allCars]);

    const handleModeSwitch = (edit: boolean) => {
        setIsEditMode(edit);
        setMessage("");
        setFormData(emptyForm);
        setSelectedVin("");
        setImageFile(null);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setImageFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setMessage("");

        try {
            let uploadedFileName = formData.image; 

            if (imageFile) {
                const imgData = await uploadImage(imageFile);
                uploadedFileName = imgData.fileName;
            }

            const finalCar: Car = {
                ...formData,
                constructionYear: Number(formData.constructionYear),
                mileage: Number(formData.mileage),
                engineSize: Number(formData.engineSize),
                power: Number(formData.power),
                price: Number(formData.price),
                image: uploadedFileName
            };

            if (isEditMode) {
                await replaceCar(finalCar);
                setMessage("Car updated successfully!");
                // Refresh the local list so the dropdown reflects any new names/data
                const refreshedCars = await getAllCars();
                setAllCars(refreshedCars);
            } else {
                await createCar(finalCar);
                setMessage("Car added successfully!");
                setFormData(emptyForm);
                setImageFile(null);
            }

        } catch (error) {
            console.error(error);
            setMessage("Failed to save vehicle. Please check the console.");
        } finally {
            setIsSubmitting(false);
        }
    };

    // Sort cars alphabetically for the dropdown
    const sortedAllCars = [...allCars].sort((a, b) => {
        if (a.manufacturer.toLowerCase() === b.manufacturer.toLowerCase()) {
            return a.model.toLowerCase().localeCompare(b.model.toLowerCase());
        }
        return a.manufacturer.toLowerCase().localeCompare(b.manufacturer.toLowerCase());
    });

    // Helper to completely block the minus sign and 'e' from numeric inputs
    const handleNumberKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === '-' || e.key === 'e') {
            e.preventDefault();
        }
    };

    return (
        <div className="AdminPage">
            <div className="AdminPage__header">
                <h2>Manage Inventory</h2>
                <p>Add new vehicles or update existing ones.</p>
            </div>

            <div className="AdminPage__modeToggle">
                <button 
                    type="button"
                    className={!isEditMode ? "active" : ""} 
                    onClick={() => handleModeSwitch(false)}
                >
                    Add New Car
                </button>
                <button 
                    type="button"
                    className={isEditMode ? "active" : ""} 
                    onClick={() => handleModeSwitch(true)}
                >
                    Edit Existing Car
                </button>
            </div>

            {isEditMode && (
                <div className="AdminPage__selector">
                    <label><span>Select Vehicle to Edit</span>
                        <select 
                            value={selectedVin} 
                            onChange={(e) => setSelectedVin(e.target.value)}
                        >
                            <option value="">-- Choose a car --</option>
                            {sortedAllCars.map(car => (
                                <option key={car.vin} value={car.vin}>
                                    {car.manufacturer} {car.model} ({car.vin})
                                </option>
                            ))}
                        </select>
                    </label>
                </div>
            )}

            {message && (
                <div className={`AdminPage__message ${message.includes("success") ? "success" : "error"}`}>
                    {message}
                </div>
            )}

            {(!isEditMode || (isEditMode && selectedVin)) && (
                <form className="AdminPage__form" onSubmit={handleSubmit}>
                    <div className="AdminPage__grid">
                        
                        <label><span>VIN (Unique ID)</span>
                            <input required type="text" name="vin" value={formData.vin} onChange={handleChange} disabled={isEditMode} />
                        </label>
                        <label><span>Manufacturer</span>
                            <input required type="text" name="manufacturer" value={formData.manufacturer} onChange={handleChange} />
                        </label>
                        <label><span>Model</span>
                            <input required type="text" name="model" value={formData.model} onChange={handleChange} />
                        </label>

                        {/* Bulletproof Number Inputs */}
                        <label><span>Construction Year</span>
                            <input 
                                required type="number" min="1900" onKeyDown={handleNumberKeyDown} 
                                name="constructionYear" value={formData.constructionYear} onChange={handleChange} 
                            />
                        </label>
                        <label><span>Mileage (km)</span>
                            <input 
                                required type="number" min="0" onKeyDown={handleNumberKeyDown} 
                                name="mileage" value={formData.mileage} onChange={handleChange} 
                            />
                        </label>
                        <label><span>Price (EUR)</span>
                            <input 
                                required type="number" min="0" onKeyDown={handleNumberKeyDown} 
                                name="price" value={formData.price} onChange={handleChange} 
                            />
                        </label>
                        
                        <label><span>Fuel Type</span>
                            <select name="fuelType" value={formData.fuelType} onChange={handleChange}>
                                <option value="PETROL">Petrol</option>
                                <option value="DIESEL">Diesel</option>
                                <option value="ELECTRIC">Electric</option>
                                <option value="HYBRID">Hybrid</option>
                            </select>
                        </label>
                        <label><span>Gearbox</span>
                            <select name="gearbox" value={formData.gearbox} onChange={handleChange}>
                                <option value="MANUAL">Manual</option>
                                <option value="AUTOMATIC">Automatic</option>
                            </select>
                        </label>

                        <label><span>Engine Size (cm³)</span>
                            <input 
                                required type="number" min="0" onKeyDown={handleNumberKeyDown} 
                                name="engineSize" value={formData.engineSize} onChange={handleChange} 
                            />
                        </label>
                        <label><span>Power (HP)</span>
                            <input 
                                required type="number" min="0" onKeyDown={handleNumberKeyDown} 
                                name="power" value={formData.power} onChange={handleChange} 
                            />
                        </label>

                    </div>

                    <div className="AdminPage__fullWidth">
                        <label><span>Equipment (Comma separated)</span>
                            <input type="text" name="equipment" placeholder="e.g. Navigation, Bluetooth, Sunroof" value={formData.equipment} onChange={handleChange} />
                        </label>
                        
                        <label><span>Description</span>
                            <textarea required name="description" rows={4} value={formData.description} onChange={handleChange} />
                        </label>

                        <label className="AdminPage__fileUpload">
                            <span>Car Image {isEditMode && "(Leave empty to keep current image)"}</span>
                            <input type="file" accept="image/*" onChange={handleImageChange} />
                        </label>
                    </div>

                    <button type="submit" className="AdminPage__submitBtn" disabled={isSubmitting}>
                        {isSubmitting ? "Saving..." : (isEditMode ? "Update Vehicle" : "Save New Vehicle")}
                    </button>
                </form>
            )}
        </div>
    )
}