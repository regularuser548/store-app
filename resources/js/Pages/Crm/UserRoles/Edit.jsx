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

    // function handleChange(e) {
    //     setData('role', e.target.value);
    //     console.log(e.target.value);
    // }
  function handleChange(value) {
    setData("role", value);
    console.log("Selected Role:", value);
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
                <div className="mb-4">
                  <label htmlFor="role" className="block text-sm font-medium">
                    Roles
                  </label>
                  <Select
                    placeholder="Select a role"
                    style={{width: 240}}
                    onChange={(value) => handleChange(value)} // Передаем значение напрямую
                    value={data.role || undefined} // Убедитесь, что не передаете null
                  >
                    {roles.map((role) => (
                      <Select.Option
                        key={role.id}
                        value={role.name}
                        disabled={userRoles.includes(role.name)}
                      >
                        {role.name}
                      </Select.Option>
                    ))}
                  </Select>
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
