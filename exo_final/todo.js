const TaskManager = require('./TaskManager');
const fs = require('fs');
const manager = new TaskManager('tasks.json');

const command = process.argv[2];
const args = process.argv.slice(3);

switch (command) {
  case 'add':
    manager.addTask(args[0]);
    console.log('Task added');
    break;
  case 'done':
    manager.markTaskAsDone(parseInt(args[0], 10));
    console.log('Task marked as done');
    break;
  case 'list':
    console.log(manager.listTasks().join('\n'));
    break;
  case 'report':
    fs.writeFileSync('report.md', manager.generateReport());
    console.log('Report generated');
    break;
  default:
    console.log('Unknown command');
}
