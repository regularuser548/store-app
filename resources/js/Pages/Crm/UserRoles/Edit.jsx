import React from "react";
import { Head, router, useForm } from "@inertiajs/react";
import CrmMenuLayout from "@/Pages/Crm/CrmMenuLayout.jsx";
import {Button, Select} from "antd";

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

                      <Select
                        defaultValue="lucy"
                        style={{
                          width: 120,
                        }}
                        onChange={handleChange}
                        options={[
                          {
                            value: 'jack',
                            label: 'Jack',
                          },
                          {
                            value: 'lucy',
                            label: 'Lucy',
                          },
                          {
                            value: 'Yiminghe',
                            label: 'yiminghe',
                          },
                          {
                            value: 'disabled',
                            label: 'Disabled',
                            disabled: true,
                          },
                        ]}
                      />

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
                            <Button onClick={handleUnblock}>
                                Unblock User
                            </Button>
                        ) : (
                            <Button onClick={handleBlock}>
                                Block User
                            </Button>
                        )}
                    </div>

                    <Button type="primary" onClick={handleSubmit}>Save Changes</Button>
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
