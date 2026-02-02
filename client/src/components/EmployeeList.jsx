import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaEdit, FaTrash } from 'react-icons/fa';
import api from '../api/axiosConfig';

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        try {
            const response = await api.get('/employees');
            setEmployees(response.data.data.employees);
        } catch (error) {
            toast.error('Failed to load employees');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this employee?')) {
            try {
                await api.delete(`/employees/${id}`);
                setEmployees(employees.filter((emp) => emp.id !== id));
                toast.success('Employee deleted successfully');
            } catch (error) {
                toast.error('Failed to delete employee');
            }
        }
    };

    if (loading) {
        return <div className="text-center mt-20 text-xl text-gray-600">Loading...</div>;
    }

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-800">Employee List</h2>
                <span className="bg-indigo-100 text-indigo-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                    Total: {employees.length}
                </span>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50 text-gray-600 text-sm uppercase tracking-wider">
                            <th className="px-6 py-4 font-medium border-b">Name</th>
                            <th className="px-6 py-4 font-medium border-b">Email</th>
                            <th className="px-6 py-4 font-medium border-b">Position</th>
                            <th className="px-6 py-4 font-medium border-b text-right">Salary</th>
                            <th className="px-6 py-4 font-medium border-b text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {employees.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                                    No employees found. Add one to get started!
                                </td>
                            </tr>
                        ) : (
                            employees.map((emp) => (
                                <tr key={emp.id} className="hover:bg-gray-50 transition">
                                    <td className="px-6 py-4 font-medium text-gray-900">
                                        {emp.first_name} {emp.last_name}
                                    </td>
                                    <td className="px-6 py-4 text-gray-600">{emp.email}</td>
                                    <td className="px-6 py-4 text-gray-600">
                                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                            {emp.position}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-gray-600 text-right">
                                        ${Number(emp.salary).toLocaleString()}
                                    </td>
                                    <td className="px-6 py-4 text-center space-x-4">
                                        <Link
                                            to={`/edit/${emp.id}`}
                                            className="text-indigo-600 hover:text-indigo-900 inline-block"
                                            title="Edit"
                                        >
                                            <FaEdit size={18} />
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(emp.id)}
                                            className="text-red-600 hover:text-red-900 inline-block"
                                            title="Delete"
                                        >
                                            <FaTrash size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default EmployeeList;
