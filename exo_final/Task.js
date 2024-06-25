class Task {
    constructor(id, description, createdAt, done = false) {
      this.id = id;
      this.description = description;
      this.createdAt = createdAt;
      this.done = done;
    }
  
    markAsDone() {
      this.done = true;
    }
  
    getAge(referenceDate) {
      const diff = referenceDate - this.createdAt;
      const minutes = Math.floor(diff / 60000);
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);
      if (days > 0) return `${days} days`;
      if (hours > 0) return `${hours} hours`;
      return `${minutes} minutes`;
    }
  }
  
  module.exports = Task;
  