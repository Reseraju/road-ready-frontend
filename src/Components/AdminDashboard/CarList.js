import React, { useEffect, useState } from 'react';
import { Table, Button, Space, message, Modal, Input, Form } from 'antd';
import axios from 'axios';

export default function CarList() {
  const [cars, setCars] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingCar, setEditingCar] = useState(null);
  const [isAdding, setIsAdding] = useState(false); 
  const [newCar, setNewCar] = useState({ model: '', make: '', location:'', specifications: '', pricePerDay: '', imageURL: '', carType: '', availability:'' });
  const [loading, setLoading] = useState(false);
  const [specifications, setSpecifications] = useState({}); 
  const [newSpecifications, setNewSpecifications] = useState({
    Year: '',
    Transmission: '',
    'Fuel Type': '',
    'Seating Capacity': '',
    Color: '',
  });

  const token = localStorage.getItem("token");

  // Fetch cars from backend
  const fetchCars = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:8081/cars/getAllCars');
      setCars(response.data);
    } catch (error) {
      message.error('Failed to fetch cars!');
    } finally {
      setLoading(false);
    }
  };

  // Remove a car
  const removeCar = async (carId) => {
    try {
      await axios.delete(`http://localhost:8081/cars/deleteCarById/${carId}`, {
        headers: {
          Authorization: `Bearer ${token}` // Pass JWT token here
        }
      });
      message.success('Car removed successfully!');
      fetchCars(); 
    } catch (error) {
      message.error('Failed to remove car!');
    }
  };

  // Save edited car details
  const saveCar = async () => {
    try {
      const updatedSpecifications = Object.entries(specifications)
        .map(([key, value]) => `${key}: ${value}`)
        .join(', ');

      const updatedCar = { ...editingCar, specifications: updatedSpecifications };
      await axios.put(`http://localhost:8081/cars/updateCarDetailsById/${editingCar.carId}`, updatedCar, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
      });

      message.success('Car updated successfully!');
      setIsEditing(false);
      fetchCars(); 
    } catch (error) {
      message.error('Failed to update car!');
    }
  };


  // Parse specifications string into an object
  const parseSpecifications = (specString) => {
    const specObj = {};
    specString.split(', ').forEach((spec) => {
      const [key, value] = spec.split(': ');
      specObj[key] = value;
    });
    return specObj;
  };

  // Handle input changes for editing
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('spec-')) {
      const specKey = name.replace('spec-', '');
      setSpecifications({ ...specifications, [specKey]: value });
    } else {
      setEditingCar({ ...editingCar, [name]: value });
    }
  };

  // Open edit modal and parse specifications
  const openEditModal = (car) => {
    setEditingCar(car);
    setSpecifications(parseSpecifications(car.specifications));
    setIsEditing(true);
  };


  // Handle input changes for adding a car
  const handleAddChange = (e) => {
    const { name, value } = e.target;
    setNewCar({ ...newCar, [name]: value });
  };

  const handleSpecChange = (e) => {
    const { name, value } = e.target;
    setNewSpecifications({ ...newSpecifications, [name]: value });
  };

  // Save a new car
  const addCar = async () => {
    try {
      // Combine specifications into a single string
      const specificationsString = Object.entries(newSpecifications)
        .map(([key, value]) => `${key}: ${value}`)
        .join(', ');

      const carToAdd = { ...newCar, specifications: specificationsString };
      console.log('Payload:', carToAdd);
      await axios.post('http://localhost:8081/cars/saveNewCar', carToAdd, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      message.success('Car added successfully!');
      setIsAdding(false);
      setNewCar({
        make: '',
        model: '',
        location: '',
        specifications: '',
        pricePerDay: '',
        imageURL: '',
        availability: '',
        carType: '',
      });
      setNewSpecifications({
        Year: '',
        Transmission: '',
        'Fuel Type': '',
        'Seating Capacity': '',
        Color: '',
      });
      fetchCars();
    } catch (error) {
      message.error('Failed to add car!');
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  // Table columns
  const columns = [
    {
      title: 'Image',
      key: 'image',
      render: (_, record) => (
        <img
          src={record.imageURL}
          alt={record.model}
          style={{ width: '100px', height: 'auto', borderRadius: '8px' }}
        />
      ),
    },
    {
      title: 'Car ID',
      dataIndex: 'carId',
      key: 'carId',
    },
    {
      title: 'Model',
      dataIndex: 'model',
      key: 'model',
    },
    {
      title: 'Make',
      dataIndex: 'make',
      key: 'make',
    },
    {
      title: 'Location',
      dataIndex: 'location',
      key: 'location',
    },
    {
      title: 'Specifications',
      dataIndex: 'specifications',
      key: 'specifications',
    },
    {
      title: 'Daily Rate',
      dataIndex: 'pricePerDay',
      key: 'pricePerDay',
      render: (rate) => `$${rate}`,
    },
    {
      title: 'Car Type',
      dataIndex: 'carType',
      key: 'carType',
    },
    {
      title: 'Availability',
      dataIndex: 'availability',
      key: 'availability',
      render: (availability) => (
        <span style={{ color: availability === 'Available' || availability === true ? 'green' : 'red' }}>
          {availability === 'Available' || availability === true ? 'Available' : 'Not Available'}
        </span>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            onClick={() => openEditModal(record)}
          >
            Edit
          </Button>
          <Button
            type="danger"
            onClick={() => removeCar(record.carId)}
          >
            Remove
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
          Cars List
        </h2>
        <Button type="primary" onClick={() => setIsAdding(true)}>
          Add Car
        </Button>
      </div>
      <Table
        dataSource={cars}
        columns={columns}
        rowKey="carId"
        loading={loading}
        pagination={{ pageSize: 5 }}
        rowClassName="car-list-row"
      />

      {/* Modal for Editing Car */}
      <Modal
        title="Edit Car"
        visible={isEditing}
        onCancel={() => setIsEditing(false)}
        onOk={saveCar}
        okText="Save"
      >
        {editingCar && (
          <Form layout="vertical">
            <Form.Item label="Model">
              <Input
                placeholder="Model"
                name="model"
                value={editingCar.model || ''}
                onChange={handleEditChange}
              />
            </Form.Item>
            <Form.Item label="Make">
              <Input
                placeholder="Make"
                name="make"
                value={editingCar.make || ''}
                onChange={handleEditChange}
              />
            </Form.Item>
            <Form.Item label="Location">
              <Input
                placeholder="Location"
                name="location"
                value={editingCar.location || ''}
                onChange={handleEditChange}
              />
            </Form.Item>
            <Form.Item label="Specifications">
              {Object.entries(specifications).map(([key, value]) => (
                <Input
                  key={key}
                  placeholder={key}
                  name={`spec-${key}`}
                  value={value}
                  onChange={handleEditChange}
                  style={{ marginBottom: '10px' }}
                />
              ))}
            </Form.Item>
            <Form.Item label="Daily Rate">
              <Input
                placeholder="Daily Rate"
                name="pricePerDay"
                value={editingCar.pricePerDay || ''}
                onChange={handleEditChange}
                type="number"
              />
            </Form.Item>
            <Form.Item label="Image URL">
              <Input
                placeholder="Image URL"
                name="imageURL"
                value={editingCar.imageURL || ''}
                onChange={handleEditChange}
              />
            </Form.Item>
            <Form.Item label="Car Type">
              <Input
                placeholder="Car Type"
                name="carType"
                value={editingCar.carType || ''}
                onChange={handleEditChange}
              />
            </Form.Item>
          </Form>
        )}
      </Modal>

      {/* Modal for Adding new car */}
      <Modal
        title="Add Car"
        visible={isAdding}
        onCancel={() => setIsAdding(false)}
        onOk={addCar}
        okText="Add"
      >
        <Form layout="vertical">
          <Form.Item label="Make">
            <Input
              placeholder="Make"
              name="make"
              value={newCar.make}
              onChange={handleAddChange}
            />
          </Form.Item>
          <Form.Item label="Model">
            <Input
              placeholder="Model"
              name="model"
              value={newCar.model}
              onChange={handleAddChange}
            />
          </Form.Item>
          <Form.Item label="Location">
            <Input
              placeholder="Location"
              name="location"
              value={newCar.location}
              onChange={handleAddChange}
            />
          </Form.Item>
          <Form.Item label="Specifications">
            <Form.Item label="Year">
              <Input
                placeholder="Year"
                name="Year"
                value={newSpecifications.Year}
                onChange={handleSpecChange}
              />
            </Form.Item>
            <Form.Item label="Transmission">
              <Input
                placeholder="Transmission"
                name="Transmission"
                value={newSpecifications.Transmission}
                onChange={handleSpecChange}
              />
            </Form.Item>
            <Form.Item label="Fuel Type">
              <Input
                placeholder="Fuel Type"
                name="Fuel Type"
                value={newSpecifications['Fuel Type']}
                onChange={handleSpecChange}
              />
            </Form.Item>
            <Form.Item label="Seating Capacity">
              <Input
                placeholder="Seating Capacity"
                name="Seating Capacity"
                value={newSpecifications['Seating Capacity']}
                onChange={handleSpecChange}
              />
            </Form.Item>
            <Form.Item label="Color">
              <Input
                placeholder="Color"
                name="Color"
                value={newSpecifications.Color}
                onChange={handleSpecChange}
              />
            </Form.Item>
          </Form.Item>
          <Form.Item label="Daily Rate">
            <Input
              placeholder="Daily Rate"
              name="pricePerDay"
              value={newCar.pricePerDay}
              onChange={handleAddChange}
              type="number"
            />
          </Form.Item>
          <Form.Item label="Image URL">
            <Input
              placeholder="Image URL"
              name="imageURL"
              value={newCar.imageURL}
              onChange={handleAddChange}
            />
          </Form.Item>
          <Form.Item label="Car Type">
            <Input
              placeholder="Car Type"
              name="carType"
              value={newCar.carType}
              onChange={handleAddChange}
            />
          </Form.Item>
          <Form.Item label="Availability">
            <Input
              placeholder="Availability"
              name="availability"
              value={newCar.availability}
              onChange={handleAddChange}
            />
          </Form.Item>
          
        </Form>
      </Modal>
    </div>
  );
}
