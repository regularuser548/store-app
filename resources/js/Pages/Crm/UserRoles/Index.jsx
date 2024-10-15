import React from "react";
import {Head, Link} from "@inertiajs/react";
import CrmMenuLayout from "@/Pages/Crm/CrmMenuLayout.jsx";

export default function Index({ users }) {
    return (
        <CrmMenuLayout>
            <Head title="User Roles" />
            <h1>User Roles</h1>

            {users.length > 0 ? (
                <ul>
                    {users.map((user) => (
                        <li key={user.id}>
                            <strong>{user.name}</strong> - {user.email}
                            <h4>Roles:</h4>
                            {user.roles.length > 0 ? (
                                <ul>
                                    {user.roles.map((role, index) => (
                                        <li key={index}>{role}</li>
                                    ))}
                                </ul>
                            ) : (
                                <p>No roles assigned.</p>
                            )}
                            <Link href={route('user.edit',{user:user.id})}>Edit</Link>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No users found.</p>
            )}
        </CrmMenuLayout>
    );
}


