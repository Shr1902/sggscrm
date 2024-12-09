import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "./components/ui/Card";
import { Button } from "./components/ui/Button";
import { Input } from "./components/ui/input";
import {
  Users,
  GraduationCap,
  Building2,
  LayoutDashboard,
  BookUser,
} from "lucide-react";

// Departments Short Forms
const DEPARTMENTS = {
  CSE: "Computer Science and Engineering",
  CHE: "Chemical Engineering",
  CIVIL: "Civil Engineering",
  EXTC: "Electronics & Telecommunication Engineering",
  ELE: "Electrical Engineering",
  IT: "Information Technology",
  INST: "Instrumentation Engineering",
  MPH: "Mathematics/Physics/Humanity Sciences",
  MECH: "Mechanical Engineering",
  PROD: "Production Engineering",
  TEXTILE: "Textile Technology",
};

// Initial State Configurations
const initialUserState = {
  id: null,
  name: "",
  email: "",
  department: "",
  type: "", // faculty, student, alumni
  registrationNumber: "",
  phoneNumber: "",
  dateOfJoining: "",
};

// Main CRM Component
const SGGSIETCrmApp = () => {
  const [currentSection, setCurrentSection] = useState("dashboard");
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(initialUserState);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // CRUD Operations
  const createUser = (newUser) => {
    const userWithId = { ...newUser, id: Date.now() };
    setUsers([...users, userWithId]);
  };

  const updateUser = (updatedUser) => {
    setUsers(
      users.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
  };

  const deleteUser = (userId) => {
    setUsers(users.filter((user) => user.id !== userId));
  };

  // Navbar Component
  const Navbar = () => (
    <div className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold">SGGS CRM</h1>
    </div>
  );

  // Footer Component
  const Footer = () => (
    <div className="bg-gray-200 p-4 text-center">
      <p className="text-sm text-gray-600">
        © {new Date().getFullYear()} Copyright Shraddha Lokhande 2021BIT041
      </p>
    </div>
  );

  // Render Functions
  const renderDashboard = () => (
    <Card>
      <CardHeader>
        <CardTitle>SGGSIE&T College CRM Dashboard</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-blue-100 p-4 rounded">
            <Users className="mx-auto mb-2" />
            <p>Total Users: {users.length}</p>
          </div>
          <div className="bg-green-100 p-4 rounded">
            <GraduationCap className="mx-auto mb-2" />
            <p>Students: {users.filter((u) => u.type === "student").length}</p>
          </div>
          <div className="bg-purple-100 p-4 rounded">
            <BookUser className="mx-auto mb-2" />
            <p>Alumni: {users.filter((u) => u.type === "alumni").length}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderUserManagement = (userType) => {
    const filteredUsers = users.filter((user) => user.type === userType);

    return (
      <Card>
        <CardHeader>
          <CardTitle>
            {userType.charAt(0).toUpperCase() + userType.slice(1)} Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Button
            onClick={() => {
              setCurrentUser({ ...initialUserState, type: userType });
              setIsModalOpen(true);
            }}
          >
            Add New {userType.charAt(0).toUpperCase() + userType.slice(1)}
          </Button>
          <table className="w-full mt-4">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Department</th>
                <th>Reg. Number</th>
                <th>Phone</th>
                <th>Date of Joining</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{DEPARTMENTS[user.department]}</td>
                  <td>{user.registrationNumber}</td>
                  <td>{user.phoneNumber}</td>
                  <td>{user.dateOfJoining}</td>
                  <td>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setCurrentUser(user);
                        setIsModalOpen(true);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => deleteUser(user.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    );
  };

  const renderUserModal = () => {
    if (!isModalOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <Card className="w-96">
          <CardHeader>
            <CardTitle>
              {currentUser.id ? "Edit" : "Add"}{" "}
              {currentUser.type.charAt(0).toUpperCase() +
                currentUser.type.slice(1)}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Input
              placeholder="Name"
              value={currentUser.name}
              onChange={(e) =>
                setCurrentUser({ ...currentUser, name: e.target.value })
              }
              className="mb-2"
            />
            <Input
              placeholder="Email"
              value={currentUser.email}
              onChange={(e) =>
                setCurrentUser({ ...currentUser, email: e.target.value })
              }
              className="mb-2"
            />
            <Input
              placeholder="Registration Number"
              value={currentUser.registrationNumber}
              onChange={(e) =>
                setCurrentUser({
                  ...currentUser,
                  registrationNumber: e.target.value,
                })
              }
              className="mb-2"
            />
            <Input
              placeholder="Phone Number"
              value={currentUser.phoneNumber}
              onChange={(e) =>
                setCurrentUser({ ...currentUser, phoneNumber: e.target.value })
              }
              className="mb-2"
            />
            <Input
              type="date"
              placeholder="Date of Joining"
              value={currentUser.dateOfJoining}
              onChange={(e) =>
                setCurrentUser({
                  ...currentUser,
                  dateOfJoining: e.target.value,
                })
              }
              className="mb-2"
            />
            <select
              value={currentUser.department}
              onChange={(e) =>
                setCurrentUser({ ...currentUser, department: e.target.value })
              }
              className="w-full p-2 border rounded mb-2"
            >
              <option value="">Select Department</option>
              {Object.keys(DEPARTMENTS).map((dept) => (
                <option key={dept} value={dept}>
                  {DEPARTMENTS[dept]}
                </option>
              ))}
            </select>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                if (currentUser.id) {
                  updateUser(currentUser);
                } else {
                  createUser(currentUser);
                }
                setIsModalOpen(false);
              }}
            >
              Save
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <div className="w-64 bg-gray-100 p-4">
          <div
            className={`flex items-center p-2 cursor-pointer ${
              currentSection === "dashboard" ? "bg-blue-200" : ""
            }`}
            onClick={() => setCurrentSection("dashboard")}
          >
            <LayoutDashboard className="mr-2" /> Dashboard
          </div>
          <div
            className={`flex items-center p-2 cursor-pointer ${
              currentSection === "faculty" ? "bg-blue-200" : ""
            }`}
            onClick={() => setCurrentSection("faculty")}
          >
            <Users className="mr-2" /> Faculty
          </div>
          <div
            className={`flex items-center p-2 cursor-pointer ${
              currentSection === "students" ? "bg-blue-200" : ""
            }`}
            onClick={() => setCurrentSection("students")}
          >
            <GraduationCap className="mr-2" /> Students
          </div>
          <div
            className={`flex items-center p-2 cursor-pointer ${
              currentSection === "alumni" ? "bg-blue-200" : ""
            }`}
            onClick={() => setCurrentSection("alumni")}
          >
            <BookUser className="mr-2" /> Alumni
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-8 overflow-y-auto">
          {currentSection === "dashboard" && renderDashboard()}
          {currentSection === "faculty" && renderUserManagement("faculty")}
          {currentSection === "students" && renderUserManagement("student")}
          {currentSection === "alumni" && renderUserManagement("alumni")}
        </div>
      </div>

      {/* Footer */}
      <Footer />

      {renderUserModal()}
    </div>
  );
};

export default SGGSIETCrmApp;
