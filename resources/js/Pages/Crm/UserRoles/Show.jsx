import React from "react";
import { Head } from "@inertiajs/react";
import CrmMenuLayout from "@/Layouts/CrmMenuLayout.jsx";

export default function Show({ user, roles, permissions }) {
    return (
        <>
            <Head title="User Details" />
            <h1>User Details</h1>
            <p>
                <strong>{user.name}</strong> - {user.email}
            </p>

            <h2>Roles:</h2>
            {roles.length > 0 ? (
                <ul>
                    {roles.map((role, index) => (
                        <li key={index}>{role}</li>
                    ))}
                </ul>
            ) : (
                <p>No roles assigned.</p>
            )}

        </>
    );
}


{/*<h2>Permissions:</h2>*/}
{/*{permissions.length > 0 ? (*/}
{/*    <ul>*/}
{/*        {permissions.map((permission, index) => (*/}
{/*            <li key={index}>{permission}</li>*/}
{/*        ))}*/}
{/*    </ul>*/}
{/*) : (*/}
{/*    <p>No permissions assigned.</p>*/}
{/*)}*/}

