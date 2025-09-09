/*
You are building a simple in-memory “database” for a classroom. Each student is represented as an object literal, and you will maintain a registry (an array) of students.

Part 1: Create & Add Students
    - write a function createStudent(name, age, subjects) that returns a new student object.
    - subjects will be an array of strings
    - then write addStudent(registry, student) that pushes a student into registry

Part 2: Find & Update
    - findStudentsById(registry, id) -> returns the student object with that id.
    - updateStudentName(registry, id, newName) -> changes the student's name in place.

Part 3: Cloning
    - write a function cloneStudent(student) that returns a shallow clone of student object
        - prove by test: if you change clone.name, does the original change?
        - prove by test: if you change clone.subjects.push("Math"), does the original's subjects also change? 

Part 4: Deep Clone
    - write deepCloneStudent(student) so that nested arrays (subjects) are cloned too.

Part 5: Merge Extras
    - Sometimes students get extra metadata (e.g. {GPA: 3.5, club: "chess"})
    - Write mergeStudentData(student, extraData) that merges the new properties into a new object, leaving the original unlocked.

Part 6: Bonus
    - write two functions:
        - clearingRegistryInPlace(registry) -> empties the registry array but keeps same reference.
        - dropRegistryReference(registry) -> sets the registry to null (simulating dropping the whole database)
*/
let _nextId = 1; 

function createStudent(name, age, subjects){ 
    let student = {
        id: _nextId++,
        name,
        age,
        subjects: [...subjects],
    }
    return student
}

function addStudent(registry, student){
    registry.push(student);
}

function findStudentById(registry, id){
    for (index in registry){
        if (registry[index].id === id){
            return registry[index]
        }
    }
}

function updateStudentName(registry, id, newName){
    let student = findStudentById(registry, id);
    student.name = newName;
}


function cloneStudent(student){
    let clonedStudent = {...student}
    return clonedStudent
}

function deepCloneStudent(student){
    let clonedStudent = structuredClone(student)
    return clonedStudent
}

function mergeStudentData(student, extraData){
    let mergedStudent = deepCloneStudent(student);
    Object.assign(mergedStudent, extraData);
    return mergedStudent
}

function clearRegistryInPlace(registry){
    registry.length = 0;
}

function dropRegistryReference(registry){
    return null;
}

module.exports = {
    createStudent, 
    addStudent,
    findStudentById,
    updateStudentName,
    cloneStudent,
    deepCloneStudent,
    mergeStudentData,
    clearRegistryInPlace,
    dropRegistryReference
}