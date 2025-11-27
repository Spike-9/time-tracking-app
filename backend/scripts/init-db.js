const { execSync } = require('child_process');

console.log('Initializing database...');

try {
  // Push the schema to the database
  console.log('Pushing schema to database...');
  execSync('npx prisma db push', { stdio: 'inherit' });
  
  console.log('Database initialized successfully!');
} catch (error) {
  console.error('Failed to initialize database:', error.message);
  process.exit(1);
}
