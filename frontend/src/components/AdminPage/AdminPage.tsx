import { useState } from "react";
import { createCar } from "../../data/car";
import { uploadImage } from "../../data/images";
import type { Car } from "../../models/car";
import "./AdminPage.css";

export function AdminPage() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState("");
    const [imageFile, setImageFile] = useState<File | null>(null);

    // Basic form state
    const [formData, setFormData] = useState({
        vin: "", manufacturer: "", model: "", constructionYear: "",
        mileage: "", fuelType: "PETROL", gearbox: "MANUAL", engineSize: "",
        power: "", condition: "USED", price: "", description: "", equipment: ""
    });

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
            let uploadedFileName = "default.png"; // Fallback

            // 1. If an image is selected, upload it first using your images.ts API
            if (imageFile) {
                const imgData = await uploadImage(imageFile);
                uploadedFileName = imgData.fileName;
            }

            // 2. Assemble the full Car object, formatting numbers properly
            const newCar: Car = {
                ...formData,
                constructionYear: Number(formData.constructionYear),
                mileage: Number(formData.mileage),
                engineSize: Number(formData.engineSize),
                power: Number(formData.power),
                price: Number(formData.price),
                image: uploadedFileName
            };

            // 3. Save the car using your car.ts API
            await createCar(newCar);

            setMessage("Car added successfully!");
            // Reset form
            setFormData({
                vin: "", manufacturer: "", model: "", constructionYear: "",
                mileage: "", fuelType: "PETROL", gearbox: "MANUAL", engineSize: "",
                power: "", condition: "USED", price: "", description: "", equipment: ""
            });
            setImageFile(null);

        } catch (error) {
            console.error(error);
            setMessage("Failed to add car. Please check the console.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="AdminPage">
            <div className="AdminPage__header">
                <h2>Manage Inventory</h2>
                <p>Add a new vehicle to the catalog.</p>
            </div>

            {message && (
                <div className={`AdminPage__message ${message.includes("success") ? "success" : "error"}`}>
                    {message}
                </div>
            )}

            <form className="AdminPage__form" onSubmit={handleSubmit}>
                <div className="AdminPage__grid">

                    <label><span>VIN (Unique ID)</span>
                        <input required type="text" name="vin" value={formData.vin} onChange={handleChange} />
                    </label>
                    <label><span>Manufacturer</span>
                        <input required type="text" name="manufacturer" value={formData.manufacturer} onChange={handleChange} />
                    </label>
                    <label><span>Model</span>
                        <input required type="text" name="model" value={formData.model} onChange={handleChange} />
                    </label>
                    <label><span>Construction Year</span>
                        <input required type="number" name="constructionYear" value={formData.constructionYear} onChange={handleChange} />
                    </label>
                    <label><span>Mileage (km)</span>
                        <input required type="number" name="mileage" value={formData.mileage} onChange={handleChange} />
                    </label>
                    <label><span>Price (EUR)</span>
                        <input required type="number" name="price" value={formData.price} onChange={handleChange} />
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
                        <input required type="number" name="engineSize" value={formData.engineSize} onChange={handleChange} />
                    </label>
                    <label><span>Power (HP)</span>
                        <input required type="number" name="power" value={formData.power} onChange={handleChange} />
                    </label>

                </div>

                <div className="AdminPage__fullWidth">
                    <label><span>Equipment (Comma separated)</span>
                        <input type="text" name="equipment" placeholder="e.g. Navigation, Bluetooth, Sunroof" value={formData.equipment} onChange={handleChange} />
                    </label>

                    <label><span>Description</span>
                        <textarea required name="description" rows={4} value={formData.description} onChange={handleChange} />
                    </label>

                    <label className="AdminPage__fileUpload"><span>Car Image</span>
                        <input type="file" accept="image/*" onChange={handleImageChange} />
                    </label>
                </div>

                <button type="submit" className="AdminPage__submitBtn" disabled={isSubmitting}>
                    {isSubmitting ? "Uploading..." : "Save Vehicle"}
                </button>
            </form>
        </div>
    )
}