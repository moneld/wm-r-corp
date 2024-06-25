const fs = require('fs');
const Task = require('./Task');

class TaskManager {
  constructor(storageFile) {
    this.storageFile = storageFile;
    this.tasks = [];
    this.loadTasks();
  }

  loadTasks() {
    if (fs.existsSync(this.storageFile)) {
      const data = fs.readFileSync(this.storageFile);
      const tasks = JSON.parse(data);
      this.tasks = tasks.map(t => new Task(t.id, t.description, new Date(t.createdAt), t.done));
    }
  }

  saveTasks() {
    fs.writeFileSync(this.storageFile, JSON.stringify(this.tasks));
  }

  addTask(description, createdAt = new Date()) {
    const id = this.tasks.length + 1;
    const task = new Task(id, description, createdAt);
    this.tasks.push(task);
    this.saveTasks();
  }

  markTaskAsDone(id) {
    const task = this.tasks.find(t => t.id === id);
    if (task) {
      task.markAsDone();
      this.saveTasks();
    }
  }

  listTasks(referenceDate = new Date()) {
    return this.tasks
      .slice()
      .sort((a, b) => b.createdAt - a.createdAt)
      .map(task => `[${task.id}][${task.done ? 'X' : ' '}] ${task.description} (${task.getAge(referenceDate)})`);
  }

  generateReport(referenceDate = new Date()) {
    const doneTasks = this.tasks.filter(task => task.done);
    return [
      '# Report',
      '## Tasks done:\n',
      ...doneTasks.map(task => `- ${task.description} (${task.createdAt.toISOString().split('T')[0]})`)
    ].join('\n');
  }
}

module.exports = TaskManager;
