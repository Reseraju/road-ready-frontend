import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Input, Form, Space, message } from 'antd';
import axios from 'axios';

export default function Booking() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchUserId, setSearchUserId] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editingReservation, setEditingReservation] = useState(null);
  const token = localStorage.getItem('token');

  // Fetch all reservations
  const fetchReservations = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:8081/api/reservations/getAllReservations', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setReservations(response.data);
    } catch (error) {
      message.error('Failed to fetch reservations!');
    } finally {
      setLoading(false);
    }
  };

  // Search reservations by user ID
  const searchReservations = async () => {
    try {
      if (!searchUserId) {
        message.warning('Please enter a User ID');
        return;
      }

      setLoading(true);
      const response = await axios.get(
        `http://localhost:8081/api/reservations/getReservationsByUserId/${searchUserId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setReservations(response.data);
      message.success('Reservations fetched successfully!');
    } catch (error) {
      message.error('Failed to search reservations!');
    } finally {
      setLoading(false);
    }
  };

  // Update a reservation
  const updateReservation = async () => {
    try {
      await axios.put(
        `http://localhost:8081/api/reservations/updateReservation/${editingReservation.reservationId}`,
        editingReservation,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      message.success('Reservation updated successfully!');
      setIsEditing(false);
      fetchReservations();
    } catch (error) {
      message.error('Failed to update reservation!');
    }
  };

  // Delete a reservation
  const deleteReservation = async (reservationId) => {
    try {
      await axios.delete(`http://localhost:8081/api/reservations/deleteReservation/${reservationId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      message.success('Reservation deleted successfully!');
      fetchReservations();
    } catch (error) {
      message.error('Failed to delete reservation!');
    }
  };

  // Open edit modal
  const openEditModal = (reservation) => {
    setEditingReservation(reservation);
    setIsEditing(true);
  };

  // Handle changes in the edit form
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditingReservation({ ...editingReservation, [name]: value });
  };

  useEffect(() => {
    fetchReservations();
  }, [searchUserId]);

  // Table columns
  const columns = [
    {
      title: 'Reservation ID',
      dataIndex: 'reservationId',
      key: 'reservationId',
    },
    {
      title: 'User ID',
      dataIndex: 'userId',
      key: 'userId',
      // render: (user) => user?.userId || 'N/A',
    },
    {
      title: 'Car',
      dataIndex: 'carId',
      key: 'carId',
      // render: (car) => car?.make + ' ' + car?.model || 'N/A',
    },
    {
      title: 'Pickup Date',
      dataIndex: 'pickupDate',
      key: 'pickupDate',
    },
    {
      title: 'Dropoff Date',
      dataIndex: 'dropoffDate',
      key: 'dropoffDate',
    },
    {
      title: 'Pickup Time',
      dataIndex: 'pickupTime',
      key: 'pickupTime',
    },
    {
      title: 'Dropoff Time',
      dataIndex: 'dropoffTime',
      key: 'dropoffTime',
    },
    {
      title: 'Extra Charge',
      dataIndex: 'extraCharge',
      key: 'extraCharge',
      render: (charge) => `$${charge.toFixed(2)}`,
    },
    {
      title: 'Status',
      dataIndex: 'reservationStatus',
      key: 'reservationStatus',
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date) => new Date(date).toLocaleString(),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button type="primary" onClick={() => openEditModal(record)}>
            Edit
          </Button>
          <Button type="danger" onClick={() => deleteReservation(record.reservationId)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2
          style={{
            color: '#333',
            fontSize: '2rem',
            fontWeight: 'bold',
            backgroundColor: '#f0f0f0',
            padding: '10px',
            marginTop: '20px',
          }}
        >
          Reservations Management
        </h2>
        <div>
          <Input
            placeholder="Search by User ID"
            value={searchUserId}
            onChange={(e) => setSearchUserId(e.target.value)}
            style={{ width: '200px', marginRight: '10px' }}
          />
          <Button type="primary" onClick={searchReservations}>
            Search
          </Button>
        </div>
      </div>

      <Table
        dataSource={reservations}
        columns={columns}
        rowKey="reservationId"
        loading={loading}
        pagination={{ pageSize: 5 }}
        rowClassName="reservation-list-row"
      />

      {/* Modal for Editing Reservation */}
      <Modal
        title="Edit Reservation"
        visible={isEditing}
        onCancel={() => setIsEditing(false)}
        onOk={updateReservation}
        okText="Save"
      >
        {editingReservation && (
          <Form layout="vertical">
            <Form.Item label="Pickup Date">
              <Input
                placeholder="Pickup Date"
                name="pickupDate"
                value={editingReservation.pickupDate || ''}
                onChange={handleEditChange}
              />
            </Form.Item>
            <Form.Item label="Dropoff Date">
              <Input
                placeholder="Dropoff Date"
                name="dropoffDate"
                value={editingReservation.dropoffDate || ''}
                onChange={handleEditChange}
              />
            </Form.Item>
            <Form.Item label="Pickup Time">
              <Input
                placeholder="Pickup Time"
                name="pickupTime"
                value={editingReservation.pickupTime || ''}
                onChange={handleEditChange}
              />
            </Form.Item>
            <Form.Item label="Dropoff Time">
              <Input
                placeholder="Dropoff Time"
                name="dropoffTime"
                value={editingReservation.dropoffTime || ''}
                onChange={handleEditChange}
              />
            </Form.Item>
            <Form.Item label="Extra Charge">
              <Input
                placeholder="Extra Charge"
                name="extraCharge"
                value={editingReservation.extraCharge || ''}
                onChange={handleEditChange}
              />
            </Form.Item>
            <Form.Item label="Status">
              <Input
                placeholder="Status"
                name="reservationStatus"
                value={editingReservation.reservationStatus || ''}
                onChange={handleEditChange}
              />
            </Form.Item>
          </Form>
        )}
      </Modal>
    </div>
  );
}
