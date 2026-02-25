import React, { useState, useEffect } from 'react';
import { Actor, HttpAgent } from "@dfinity/agent";
import { example_backend } from 'declarations/example_backend';
import './index.scss';

function App() {
  const [students, setStudents] = useState([]);
  const [showAddStudentForm, setShowAddStudentForm] = useState(false);
  const [newStudent, setNewStudent] = useState({ firstName: '', lastName: '', school: '' });

  const fetchStudents = async () => {
    try {
      const studentsList = await example_backend.getStudents();
      console.log("Fetched students:", studentsList);
      setStudents(studentsList);
    } catch (error) {
      console.error("Failed to fetch students:", error);
    }
  };

  const handleAddStudent = async (event) => {
    event.preventDefault();
    console.log("Submitting student:", newStudent);

    try {
      await example_backend.addStudent(newStudent.firstName, newStudent.lastName, newStudent.school);
      console.log("Student added successfully");
      setNewStudent({ firstName: '', lastName: '', school: '' });
      setShowAddStudentForm(false);
      fetchStudents(); // Fetch students after adding a new student
    } catch (error) {
      console.error("Failed to add student:", error);
    }
  };

  const handleFetchStudents = () => {
    fetchStudents();
    setShowAddStudentForm(false); // Close the add student form when fetching students
  };

  return (
    <main>
      <h1>Internet Identity Example</h1>
        <>
          <p>Welcome back !</p>
          <button onClick={() => setShowAddStudentForm(true)}>Add New Student</button>
          <button onClick={handleFetchStudents}>Fetch Students</button>
          <h2>Student List</h2>
          <ul>
            {students.map((student, index) => (
              <li key={index}>
                {student.firstName} {student.lastName} - {student.school}
              </li>
            ))}
          </ul>
          {showAddStudentForm && (
            <form onSubmit={handleAddStudent}>
              <label>
                First Name:
                <input
                  type="text"
                  value={newStudent.firstName}
                  onChange={(e) => setNewStudent({ ...newStudent, firstName: e.target.value })}
                  required
                />
              </label>
              <label>
                Last Name:
                <input
                  type="text"
                  value={newStudent.lastName}
                  onChange={(e) => setNewStudent({ ...newStudent, lastName: e.target.value })}
                  required
                />
              </label>
              <label>
                School:
                <input
                  type="text"
                  value={newStudent.school}
                  onChange={(e) => setNewStudent({ ...newStudent, school: e.target.value })}
                  required
                />
              </label>
              <button type="submit">Save Student</button>
            </form>
          )}
        </>
    </main>
  );
}

export default App;
