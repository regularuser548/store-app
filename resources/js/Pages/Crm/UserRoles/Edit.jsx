import React from "react";
import { Head, router, useForm } from "@inertiajs/react";
import CrmMenuLayout from "@/Pages/Crm/CrmMenuLayout.jsx";

export default function Edit({ user, roles, userRoles, permissions, userPermissions }) {
    const { data, setData, post, progress } = useForm({
        role: '',
        _method: 'put'
    });

    function handleSubmit(e) {
        e.preventDefault();
        router.post(route('user.update', { user: user.id }), data);
    }

    function handleChange(e) {
        setData('role', e.target.value);
        console.log(e.target.value);
    }

    function handleBlock(e) {
        e.preventDefault();
        router.post(route('user.block', { user: user.id }));
    }

    function handleUnblock(e) {
        e.preventDefault();
        router.post(route('user.unblock', { user: user.id }));
    }

    return (
        <CrmMenuLayout>
            <Head title={`Edit User: ${user.name}`} />

            <div>
                <h1>Edit User: {user.name}</h1>

                <h2>Assign Roles</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="role">Roles</label>
                        <select name="role" id="role" onChange={handleChange} value={data.role}>
                            {roles.map((role) => (
                                <option
                                    key={role.id}
                                    value={role.name}
                                    selected={userRoles.includes(role.name)}
                                >
                                    {role.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        {user.isBlocked ? (
                            <button onClick={handleUnblock}>
                                Unblock User
                            </button>
                        ) : (
                            <button onClick={handleBlock}>
                                Block User
                            </button>
                        )}
                    </div>

                    <button type="submit">Save Changes</button>
                </form>
            </div>
        </CrmMenuLayout>
    );
}



{/*<h2>Assign Permissions</h2>*/}
{/*<div>*/}
{/*    {permissions.map((permission) => (*/}
{/*        <label key={permission.id}>*/}
{/*            <input*/}
{/*                type="checkbox"*/}
{/*                name="permissions[]"*/}
{/*                value={permission.name}*/}
{/*                defaultChecked={userPermissions.some(*/}
{/*                    (userPermission) => userPermission.name === permission.name*/}
{/*                )}*/}
{/*            />*/}
{/*            {permission.name}*/}
{/*        </label>*/}
{/*    ))}*/}
{/*</div>*/}
