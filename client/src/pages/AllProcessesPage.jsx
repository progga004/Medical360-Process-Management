import React, { useEffect } from 'react';
import ProcessCard from "../components/ProcessCard";
import { Grid, Container, Typography } from '@mui/material';
import Banner from '../components/Banner';
import { useProcessContext } from '../hooks/useProcessContext';
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../hooks/useGlobalContext';

// const processes = [
//   { id: 1, patientName: 'John Doe', startDate: '2024-05-12' },
//   { id: 2, patientName: 'Jane Smith', startDate: '2024-05-10' },
//   { id: 3, patientName: 'Alice Johnson', startDate: '2024-05-08' },
//   // Add more process objects as needed
// ];

const AllProcessesPage = () => {

    const { processes, getAllProcesses } = useProcessContext();
    const { getPatient } = useGlobalContext();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProcesses = async () => {
            await getAllProcesses();
        }

        if (!processes)
            fetchProcesses();
    }, [processes]);

    const handleClick = patientId => {
        getPatient(patientId);
        navigate(`/patient-info/${patientId}`)
    }

    return (
    <>
        <Banner goBackPath={"/apppage"}/>
        <Container maxWidth="lg" className="mx-auto mt-8">
        <Typography variant="h3" className="text-3xl font-semibold mb-8 text-blue-600">All Processes</Typography>
        <Grid container spacing={3}>
            {processes && processes.map(process => (
            <Grid item key={process._id} xs={12} sm={6} md={4} lg={3}>
                <div className="bg-blue-100 border border-blue-400 text-blue-900 p-4 rounded-lg hover:bg-blue-500" onClick={() => handleClick(process.patient)}>
                <ProcessCard process={process}/>
                </div>
            </Grid>
            ))}
        </Grid>
        </Container>
    </>
    );
};

export default AllProcessesPage;