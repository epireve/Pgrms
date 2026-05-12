import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Role } from '../types';
import StudentDashboard from './dashboards/StudentDashboard';
import SupervisorDashboard from './dashboards/SupervisorDashboard';
import AdminDashboard from './dashboards/AdminDashboard';
import HODDashboard from './dashboards/HODDashboard';
import Card from '../components/shared/Card';

const DashboardPage: React.FC = () => {
    const { user } = useAuth();

    switch (user.role) {
        case Role.Student:
            return <StudentDashboard />;
        case Role.Supervisor:
            return <SupervisorDashboard />;
        case Role.Admin:
            return <AdminDashboard />;
        case Role.HOD:
            return <HODDashboard />;
        case Role.Examiner:
            return (
                <Card title="Examiner Dashboard">
                    <p>The Examiner Dashboard is currently under development. Examiners will be able to manage thesis reviews, submit reports, and view viva schedules here.</p>
                </Card>
            );
        default:
            return (
                 <Card title="Error">
                    <p>A dashboard is not available for your user role.</p>
                </Card>
            );
    }
};

export default DashboardPage;
