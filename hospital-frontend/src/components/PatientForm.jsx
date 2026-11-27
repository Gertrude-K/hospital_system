
import { useState } from 'react';

function PatientForm({
    onSavePatient,
    onCancel,
    initialData
}) {

    const [formData, setFormData] = useState(() => ({
        patient_id: initialData?.patient_id || '',
        name: initialData?.name || '',
        age: initialData?.age || '',
        gender: initialData?.gender || '',
        contact_number: initialData?.contact_number || '',
        email: initialData?.email || '',
        address: initialData?.address || ''
    }));

    // Capture input changes
    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData((previousData) => ({
            ...previousData,
            [name]: value
        }));

    };

    // Submit the form
    const handleSubmit = (e) => {

        e.preventDefault();

        onSavePatient(formData);

    };

    return (
        <div className="card shadow-sm mb-4">
            <div className="card-body">

                <h5 className="fw-bold mb-4">
                    {initialData ? 'Edit Patient' : 'Register New Patient'}
                </h5>

                <form onSubmit={handleSubmit}>

                    <div className="mb-3">
                        <label className="form-label">Patient ID</label>
                        <input
                            type="text"
                            name="patient_id"
                            className="form-control"
                            value={formData.patient_id}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Full Name</label>
                        <input
                            type="text"
                            name="name"
                            className="form-control"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Age</label>
                        <input
                            type="number"
                            name="age"
                            className="form-control"
                            value={formData.age}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Gender</label>
                        <select
                            name="gender"
                            className="form-select"
                            value={formData.gender}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Contact Number</label>
                        <input
                            type="tel"
                            name="contact_number"
                            className="form-control"
                            value={formData.contact_number}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            className="form-control"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Address</label>
                        <textarea
                            name="address"
                            className="form-control"
                            value={formData.address}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button type="submit" className="btn btn-primary">
                        {initialData ? 'Update Patient' : 'Save Patient'}
                    </button>

                    <button
                        type="button"
                        className="btn btn-secondary ms-2"
                        onClick={onCancel}
                    >
                        Cancel
                    </button>

                </form>
            </div>
        </div>
    );
}

export default PatientForm;