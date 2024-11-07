import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const masterKey = "4VGP2DN-6EWM4SJ-N6FGRHV-Z3PR3TT";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let students = [
  { id: 1, name: "Alice Johnson", age: 20, major: "Computer Science", gpa: 3.8, email: "alice.johnson@example.com" },
  { id: 2, name: "Bob Smith", age: 22, major: "Mechanical Engineering", gpa: 3.5, email: "bob.smith@example.com" },
  { id: 3, name: "Carol Davis", age: 21, major: "Electrical Engineering", gpa: 3.6, email: "carol.davis@example.com" },
  { id: 4, name: "Alice Johnson", age: 20, major: "Computer Science", gpa: 3.8, email: "alice.johnson@example.com" },
  { id: 5, name: "Bob Smith", age: 22, major: "Mechanical Engineering", gpa: 3.5, email: "bob.smith@example.com" },
  { id: 6, name: "Carol Davis", age: 21, major: "Electrical Engineering", gpa: 3.6, email: "carol.davis@example.com" },
  { id: 7, name: "Alice Johnson", age: 20, major: "Computer Science", gpa: 3.8, email: "alice.johnson@example.com" },
  { id: 8, name: "Bob Smith", age: 22, major: "Mechanical Engineering", gpa: 3.5, email: "bob.smith@example.com" },
  { id: 9, name: "Carol Davis", age: 21, major: "Electrical Engineering", gpa: 3.6, email: "carol.davis@example.com" },
  { id: 10, name: "Alice Johnson", age: 20, major: "Computer Science", gpa: 3.8, email: "alice.johnson@example.com" },
  { id: 11, name: "Bob Smith", age: 22, major: "Mechanical Engineering", gpa: 3.5, email: "bob.smith@example.com" },
  { id: 12, name: "Carol Davis", age: 21, major: "Electrical Engineering", gpa: 3.6, email: "carol.davis@example.com" },
  { id: 13, name: "Alice Johnson", age: 20, major: "Computer Science", gpa: 3.8, email: "alice.johnson@example.com" },
  { id: 14, name: "Bob Smith", age: 22, major: "Mechanical Engineering", gpa: 3.5, email: "bob.smith@example.com" },
  { id: 15, name: "Carol Davis", age: 21, major: "Electrical Engineering", gpa: 3.6, email: "carol.davis@example.com" },
  // Add more students here until you have 20-30 entries
];

// Get a random student
app.get("/random", (req, res) => {
  const randomIndex = Math.floor(Math.random() * students.length);
  res.json(students[randomIndex]);
});

// Get a specific student by ID
app.get("/students/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const foundStudent = students.find((student) => student.id === id);
  res.json(foundStudent);
});

// Filter students by major
app.get("/filter", (req, res) => {
  const major = req.query.major;
  const filteredStudents = students.filter((student) => student.major === major);
  res.json(filteredStudents);
});

// Add a new student
app.post("/students", (req, res) => {
  const newStudent = {
    id: students.length + 1,
    name: req.body.name,
    age: req.body.age,
    major: req.body.major,
    gpa: req.body.gpa,
    email: req.body.email,
  };
  students.push(newStudent);
  res.json(newStudent);
});

// Update a student (PUT)
app.put("/students/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const replacementStudent = {
    id: id,
    name: req.body.name,
    age: req.body.age,
    major: req.body.major,
    gpa: req.body.gpa,
    email: req.body.email,
  };
  const searchIndex = students.findIndex((student) => student.id === id);
  students[searchIndex] = replacementStudent;
  res.json(replacementStudent);
});

// Partially update a student (PATCH)
app.patch("/students/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const existingStudent = students.find((student) => student.id === id);
  const updatedStudent = {
    ...existingStudent,
    ...req.body,
  };
  const searchIndex = students.findIndex((student) => student.id === id);
  students[searchIndex] = updatedStudent;
  res.json(updatedStudent);
});

// Delete a specific student
app.delete("/students/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const searchIndex = students.findIndex((student) => student.id === id);
  if (searchIndex > -1) {
    students.splice(searchIndex, 1);
    res.sendStatus(200);
  } else {
    res.status(404).json({ error: `Student with id: ${id} not found. No students were deleted.` });
  }
});

// Delete all students (with master key check)
app.delete("/all", (req, res) => {
  const userKey = req.query.key;
  if (userKey === masterKey) {
    students = [];
    res.sendStatus(200);
  } else {
    res.status(404).json({ error: `You are not authorised to perform this action.` });
  }
});

app.listen(port, () => {
  console.log(`Successfully started server on port ${port}.`);
});
