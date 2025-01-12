import React, { useState } from "react";
import { Head, router } from "@inertiajs/react";
import { Input, List, Button, Typography, Space } from "antd";

const { Title } = Typography;

export default function Index({ users }) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Head title="Користувачi" />
      <Space direction="vertical" style={{ width: "100%", marginTop: 20 }}>
        <Title level={3} style={{ textAlign: "center" }}>
          Користувачi
        </Title>
        <Input
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ maxWidth: 600, margin: "0 auto", padding: "8px" }}
        />
        <List
          bordered
          dataSource={filteredUsers}
          renderItem={(user) => (
            <List.Item
              actions={[
                <Button
                  type="link"
                  onClick={() => router.visit(route("user.edit", { user: user.id }))}
                >
                  Edit
                </Button>,
                <Button
                  type="link"
                  onClick={() => router.visit(route("user.orders", { user: user.id }))}
                >
                  View Orders
                </Button>,
              ]}
            >
              <List.Item.Meta
                title={user.name}
                description={`Email: ${user.email}`}
              />
            </List.Item>
          )}
        />
      </Space>
    </>
  );
}



// import React, { useState } from "react";
// import {Head, Link, router} from "@inertiajs/react";
// import CrmMenuLayout from "@/Layouts/CrmMenuLayout.jsx";
// import {Button, Input} from "antd";
//
// export default function Index({ users }) {
//     const [searchTerm, setSearchTerm] = useState("");
//
//     const filteredUsers = users.filter((user) =>
//         user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         user.email.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//
//     return (
//         <>
//             <Head title="User Roles" />
//             <h1>User Roles</h1>
//
//             <Input
//                 type="text"
//                 placeholder="Search users..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 style={{ marginBottom: "20px", padding: "8px", width: "100%" }}
//             />
//
//             {filteredUsers.length > 0 ? (
//                 <ul>
//                     {filteredUsers.map((user) => (
//                         <li key={user.id}>
//                             <strong>{user.name}</strong> - {user.email}
//                             <h4>Roles:</h4>
//                             {user.roles.length > 0 ? (
//                                 <ul>
//                                     {user.roles.map((role, index) => (
//                                         <li key={index}>{role}</li>
//                                     ))}
//                                 </ul>
//                             ) : (
//                                 <p>No roles assigned.</p>
//                             )}
//
//                             <Button onClick={() => router.visit(route('user.edit',{user:user.id}))}>Edit</Button>
//                             <Button onClick={() => router.visit(route('user.orders', { user: user.id }))}>View Orders</Button>
//                         </li>
//                     ))}
//                 </ul>
//             ) : (
//                 <p>No users found.</p>
//             )}
//         </>
//     );
// }


