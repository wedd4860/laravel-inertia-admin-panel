import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import NavigationHeader from "@/Components/Dashboard/NavigationHeader";
import StatisticDashboard from "@/Components/Dashboard/StatisticDashboard";
import { Head, Link } from "@inertiajs/react";

export default function Dashboard({ auth }) {
    return (
        <AuthenticatedLayout member={auth.member} header="">
            <Head title="Dashboard" />
            <div className="relative overflow-auto flex">
                {auth.member.member_t_permission_group &&
                    <NavigationHeader/>
                }
                <StatisticDashboard />
            </div>
        </AuthenticatedLayout>
    );
}
