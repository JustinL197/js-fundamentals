// /src/objects/classroom-exercise.test.js

const {
  createStudent,
  addStudent,
  findStudentById,
  updateStudentName,
  cloneStudent,
  deepCloneStudent,
  mergeStudentData,
  clearRegistryInPlace,
  dropRegistryReference,
} = require('./classroom-exercise');

function makeRegistry() {
  return [];
}

describe('Part 1: Create & Add Students', () => {
  test('createStudent returns a new student with unique id, name, age, subjects', () => {
    const s1 = createStudent('Alice', 20, ['Math', 'CS']);
    const s2 = createStudent('Bob', 21, ['History']);

    expect(typeof s1.id).toBe('number');
    expect(s1).toEqual({ id: s1.id, name: 'Alice', age: 20, subjects: ['Math', 'CS'] });
    expect(s2.id).not.toBe(s1.id);
  });

  test('addStudent pushes student into registry', () => {
    const registry = makeRegistry();
    const s1 = createStudent('Alice', 20, ['Math']);
    addStudent(registry, s1);

    expect(registry.length).toBe(1);
    expect(registry[0]).toBe(s1); // same reference
  });
});

describe('Part 2: Find & Update', () => {
  test('findStudentById returns the exact object from the registry (identity)', () => {
    const registry = makeRegistry();
    const s1 = createStudent('Alice', 20, ['Math']);
    const s2 = createStudent('Bob', 21, ['History']);
    addStudent(registry, s1);
    addStudent(registry, s2);

    const found = findStudentById(registry, s2.id);
    expect(found).toBe(s2);
  });

  test('updateStudentName mutates the student in the registry (reference semantics)', () => {
    const registry = makeRegistry();
    const s1 = createStudent('Alice', 20, ['Math']);
    addStudent(registry, s1);

    updateStudentName(registry, s1.id, 'Alicia');

    expect(s1.name).toBe('Alicia');
    expect(registry[0].name).toBe('Alicia');
  });
});

describe('Part 3: Shallow Clone', () => {
  test('cloneStudent returns a shallow copy (top-level props independent)', () => {
    const original = createStudent('Alice', 20, ['Math', 'CS']);
    const clone = cloneStudent(original);

    expect(clone).not.toBe(original);
    expect(clone.id).toBe(original.id);
    expect(clone.name).toBe('Alice');

    clone.name = 'Alicia';
    expect(original.name).toBe('Alice');
  });

  test('shallow copy shares nested references (subjects array is shared)', () => {
    const original = createStudent('Alice', 20, ['Math']);
    const clone = cloneStudent(original);

    expect(clone.subjects).toBe(original.subjects);

    clone.subjects.push('CS');
    expect(original.subjects).toEqual(['Math', 'CS']);
  });
});

describe('Part 4: Deep Clone', () => {
  test('deepCloneStudent clones nested arrays so modifications don’t leak back', () => {
    const original = createStudent('Alice', 20, ['Math']);
    const deep = deepCloneStudent(original);

    expect(deep).not.toBe(original);
    expect(deep.subjects).not.toBe(original.subjects);

    deep.subjects.push('CS');
    expect(original.subjects).toEqual(['Math']);
    expect(deep.subjects).toEqual(['Math', 'CS']);
  });
});

describe('Part 5: Merge Extras (non-mutating)', () => {
  test('mergeStudentData returns a NEW object with extra fields, original untouched', () => {
    const s = createStudent('Charlie', 22, ['Physics']);
    const extra = { GPA: 3.7, club: 'chess' };

    const merged = mergeStudentData(s, extra);

    expect(merged).not.toBe(s);
    expect(merged).toEqual({
      id: s.id,
      name: 'Charlie',
      age: 22,
      subjects: ['Physics'],
      GPA: 3.7,
      club: 'chess',
    });

    // original not mutated
    expect(s.GPA).toBeUndefined();
    expect(s.club).toBeUndefined();
    expect(s.subjects).toEqual(['Physics']);
  });

  test('mergeStudentData does shallow merge; nested arrays/objects remain shared unless cloned', () => {
    const s = createStudent('Dana', 23, ['Bio']);
    const extra = { meta: { notes: ['good'] } };
    const merged = mergeStudentData(s, extra);

    expect(merged.meta.notes).toBe(extra.meta.notes); // shared (shallow)
    extra.meta.notes.push('punctual');
    expect(merged.meta.notes).toEqual(['good', 'punctual']);
  });
});

describe('Part 6: Clearing the registry', () => {
  test('clearRegistryInPlace empties the array but preserves identity', () => {
    const registry = makeRegistry();
    addStudent(registry, createStudent('A', 18, ['X']));
    addStudent(registry, createStudent('B', 19, ['Y']));

    const sameRef = registry;
    clearRegistryInPlace(registry);

    expect(registry).toBe(sameRef);
    expect(registry.length).toBe(0);
  });

  test('dropRegistryReference returns null – simulate dropping DB', () => {
    let registry = makeRegistry();
    addStudent(registry, createStudent('A', 18, ['X']));

    registry = dropRegistryReference(registry);
    expect(registry).toBeNull();
  });
});
