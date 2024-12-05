import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Input, Space, message } from "antd";
import axios from "axios";

export default function Customers() {
  const [users, setUsers] = useState([]);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [addForm] = Form.useForm();
  const [editForm] = Form.useForm();

  const token = localStorage.getItem("token");

  // Fetch users from the server
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:8081/users/getAllUsers", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(response.data);
    } catch (error) {
      message.error("Failed to fetch users!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Handle Add User
  const handleAddUser = (values) => {
    axios
      .post("http://localhost:8081/api/auth/signup", values)
      .then((response) => {
        setUsers((prev) => [...prev, response.data]);
        message.success("User added successfully!");
        setIsAddModalVisible(false);
        addForm.resetFields();
      })
      .catch((error) => message.error("Error adding user: " + error.message));
  };

  // Handle Edit User
  const handleEditUser = (values) => {
    axios
      .put(`http://localhost:8081/users/updateUser/${currentUser.userId}`, values, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        setUsers((prev) =>
          prev.map((user) =>
            user.userId === currentUser.userId ? { ...user, ...values } : user
          )
        );
        message.success("User updated successfully!");
        setIsEditModalVisible(false);
        setCurrentUser(null);
        editForm.resetFields();
      })
      .catch((error) => message.error("Error updating user: " + error.message));
  };

  // Handle Delete User
  const handleDeleteUser = (userId) => {
    axios
      .delete(`http://localhost:8081/users/deleteUser/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        setUsers((prev) => prev.filter((user) => user.userId !== userId));
        message.success("User deleted successfully!");
      })
      .catch((error) => message.error("Error deleting user: " + error.message));
  };

  // Open Modals
  const openAddModal = () => {
    setIsAddModalVisible(true);
    addForm.resetFields();
  };

  const openEditModal = (user) => {
    setCurrentUser(user);
    editForm.setFieldsValue(user);
    setIsEditModalVisible(true);
  };

  // Close Modals
  const closeAddModal = () => {
    setIsAddModalVisible(false);
  };

  const closeEditModal = () => {
    setIsEditModalVisible(false);
    setCurrentUser(null);
    editForm.resetFields();
  };

  // Table columns
  const columns = [
    {
      title: "User ID",
      dataIndex: "userId",
      key: "userId",
    },
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone No",
      dataIndex: "phoneNo",
      key: "phoneNo",
    },
    {
      title: "License No",
      dataIndex: "licenseNo",
      key: "licenseNo",
    },
    {
      title: "User Type",
      dataIndex: "userType",
      key: "userType",
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button type="primary" onClick={() => openEditModal(record)}>
            Edit
          </Button>
          <Button type="danger" onClick={() => handleDeleteUser(record.userId)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2 style={{ color: "#333", fontSize: "2rem", fontWeight: "bold", backgroundColor: "#f0f0f0", padding: "10px", marginTop: "20px" }}>
          Users List
        </h2>
        <Button type="primary" onClick={openAddModal}>
          Add User
        </Button>
      </div>

      <Table dataSource={users} columns={columns} rowKey="userId" pagination={{ pageSize: 5 }} loading={loading} />

      {/* Add User Modal */}
      <Modal
        title="Add User"
        visible={isAddModalVisible}
        onCancel={closeAddModal}
        onOk={() => {
          addForm
            .validateFields()
            .then((values) => handleAddUser(values))
            .catch((errorInfo) => message.error("Validation failed!"));
        }}
        okText="Add"
      >
        <Form form={addForm} layout="vertical">
          <Form.Item label="First Name" name="firstName" rules={[{ required: true, message: "Please enter first name" }]}>
            <Input placeholder="First Name" />
          </Form.Item>
          <Form.Item label="Last Name" name="lastname" rules={[{ required: true, message: "Please enter last name" }]}>
            <Input placeholder="Last Name" />
          </Form.Item>
          {/* Common Fields */}
          {commonFields(addForm)}
          {/* Add Password */}
          <Form.Item label="Password" name="password" rules={[{ required: true, message: "Please enter password" }]}>
            <Input.Password placeholder="Password" />
          </Form.Item>
        </Form>
      </Modal>

      {/* Edit User Modal */}
      <Modal
        title="Edit User"
        visible={isEditModalVisible}
        onCancel={closeEditModal}
        onOk={() => {
          editForm
            .validateFields()
            .then((values) => handleEditUser(values))
            .catch((errorInfo) => message.error("Validation failed!"));
        }}
        okText="Update"
      >
        
        <Form form={editForm} layout="vertical">
          <Form.Item label="First Name" name="firstName" rules={[{ required: true, message: "Please enter first name" }]}>
            <Input placeholder="First Name" />
          </Form.Item>
          <Form.Item label="Last Name" name="lastName" rules={[{ required: true, message: "Please enter last name" }]}>
            <Input placeholder="Last Name" />
          </Form.Item>
          {commonFields(editForm)}
        </Form>
      </Modal>
    </div>
  );

  // Reusable fields for forms
  function commonFields(formInstance) {
    return (
      <>
        {/* <Form.Item label="First Name" name="firstName" rules={[{ required: true, message: "Please enter first name" }]}>
          <Input placeholder="First Name" />
        </Form.Item>
        <Form.Item label="Last Name" name="lastName" rules={[{ required: true, message: "Please enter last name" }]}>
          <Input placeholder="Last Name" />
        </Form.Item> */}
        <Form.Item label="Email" name="email" rules={[{ required: true, type: "email", message: "Please enter a valid email" }]}>
          <Input placeholder="Email" />
        </Form.Item>
        <Form.Item label="Phone No" name="phoneNo" rules={[{ required: true, message: "Please enter phone number" }]}>
          <Input placeholder="Phone No" />
        </Form.Item>
        <Form.Item label="License No" name="licenseNo" rules={[{ required: true, message: "Please enter license number" }]}>
          <Input placeholder="License No" />
        </Form.Item>
        <Form.Item label="User Type" name="userType" rules={[{ required: true, message: "Please enter user type" }]}>
          <Input placeholder="User Type" />
        </Form.Item>
        <Form.Item label="Username" name="username" rules={[{ required: true, message: "Please enter username" }]}>
          <Input placeholder="Username" />
        </Form.Item>
      </>
    );
  }
}
