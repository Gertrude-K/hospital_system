
import { useState,useEffect } from 'react';

import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import StatCard from './components/StatCard';
import PatientProfile from './components/PatientProfile';
import PatientTable from './components/PatientTable';
import PatientForm from './components/PatientForm';
import Footer from './components/Footer';
import api from './services/api';

function App() {

    // Initial patient records
    const [patients, setPatients] = useState([
        
    ]);

    useEffect(()=>{
        api.get('patients/')
            .then(response => {
                setPatients(response.data);
            })
             .catch(error => {
                console.error('Error fetching patients:',error);
                
             });
    },[]);

    // Form visibility
    const [showForm, setShowForm] = useState(false);

    // Patient currently being edited
    const [editingPatient, setEditingPatient] = useState(null);

    // Search text
    const [searchTerm, setSearchTerm] = useState('');

    // Open form for adding a new patient
    const handleShowForm = () => {
        setEditingPatient(null);
        setShowForm(true);
    };

    // Close form
    const handleCloseForm = () => {
        setShowForm(false);
        setEditingPatient(null);
    };

    // Open form for editing
    const handleEditPatient = (patient) => {
        setEditingPatient(patient);
        setShowForm(true);
    };

    // Save a new patient or update an existing patient


    

const handleSavePatient = async (patientData) => {

    try {

        if (editingPatient) {

            // UPDATE EXISTING PATIENT
            const response = await api.put(
                `patients/${editingPatient.id}/`,
                patientData
            );

            // Update React state
            setPatients((previousPatients) =>
                previousPatients.map((patient) =>
                    patient.id === editingPatient.id
                        ? response.data
                        : patient
                )
            );

            alert('Patient updated successfully!');

        } else {

            // CREATE NEW PATIENT
            const response = await api.post(
                'patients/',
                patientData
            );

            // Update React state
            setPatients((previousPatients) => [
                ...previousPatients,
                response.data
            ]);

            alert('Patient registered successfully!');

        }

        // Close form
        setShowForm(false);
        setEditingPatient(null);

    } catch (error) {

        console.error('Error saving patient:', error);

        console.error('Server response:', error.response?.data);

        alert('Unable to save patient. Please check the details.');

    }

};


    // Delete a patient
   
const handleDeletePatient = async (patientId) => {

    const confirmDelete = window.confirm(
        'Are you sure you want to delete this patient?'
    );

    if (confirmDelete) {

        try {

            // Send DELETE request to Django
            await api.delete(`patients/${patientId}/`);

            // Update React state after successful deletion
            setPatients((previousPatients) =>
                previousPatients.filter(
                    (patient) => patient.id !== patientId
                )
            );

            alert('Patient deleted successfully!');

        } catch (error) {

            console.error('Error deleting patient:', error);

            console.error('Server response:', error.response?.data);

            alert('Failed to delete patient.');

        }

    }

};


    // Search and filter patients
    const filteredPatients = patients.filter((patient) => {

        const search = searchTerm.toLowerCase();

        return (
            patient.name.toLowerCase().includes(search) ||
            patient.email.toLowerCase().includes(search) ||
            patient.contact_number.toLowerCase().includes(search) ||
            patient.patient_id.toLowerCase().includes(search)
        );

    });


    return (

        <div className="container-fluid">

            <div className="row">

                {/* SIDEBAR */}
                <div className="col-md-2 p-0">
                    <Sidebar />
                </div>

                {/* MAIN CONTENT */}
                <div className="col-md-10 main-content">

                    <Topbar />

                    {/* STATISTICS */}
                     <div className="row g-3 mb-4">

                        <StatCard
                            title="Appointments"
                            count="04"
                            icon="bi-calendar-check"
                            color="primary"
                        />

                        <StatCard
                            title="Medical Records"
                            count="08"
                            icon="bi-file-medical"
                            color="success"
                        />

                        <StatCard
                            title="Prescriptions"
                            count="03"
                            icon="bi-capsule"
                            color="warning"
                        />

                        <StatCard
                            title="Pending Bills"
                            count="02"
                            icon="bi-wallet2"
                            color="danger"
                        />

                    </div>

                    {/* PATIENT PROFILE */}
                    <PatientProfile />

                    {/* PATIENT FORM */}
                    {showForm && (
                        <PatientForm
                            key={editingPatient?.id || 'new-patient'}
                            initialData={editingPatient}
                            onSavePatient={handleSavePatient}
                            onCancel={handleCloseForm}
                        />
                    )}

                    {/* PATIENT TABLE */}
                    <PatientTable
                        patients={filteredPatients}
                        onAddClick={handleShowForm}
                        onEdit={handleEditPatient}
                        onDelete={handleDeletePatient}
                        searchTerm={searchTerm}
                        onSearchChange={setSearchTerm}
                    />

                    <Footer />

                </div>

            </div>

        </div>
    );

}

export default App;