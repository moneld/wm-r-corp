const TaskManager = require('../TaskManager');
const fs = require('fs');

jest.mock('fs');

describe('TaskManager', () => {
  let manager;

  beforeEach(() => {
    fs.readFileSync.mockReturnValue(JSON.stringify([]));
    manager = new TaskManager('tasks.json');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should add a task', () => {
    manager.addTask('Test task');
    expect(manager.tasks.length).toBe(1);
    expect(manager.tasks[0].description).toBe('Test task');
  });

  it('should mark a task as done', () => {
    manager.addTask('Test task');
    manager.markTaskAsDone(1);
    expect(manager.tasks[0].done).toBe(true);
  });

  it('should list tasks ordered by date descending', () => {
    manager.addTask('Old task', new Date('2023-01-01'));
    manager.addTask('New task', new Date('2023-01-02'));
    const tasks = manager.listTasks(new Date('2023-01-03'));
    expect(tasks[0]).toContain('New task');
    expect(tasks[1]).toContain('Old task');
  });

  it('should generate report', () => {
    manager.addTask('Done task', new Date('2023-01-01'));
    manager.markTaskAsDone(1);
    const report = manager.generateReport(new Date('2023-01-03'));
    expect(report).toContain('- Done task (2023-01-01)');
  });
});
