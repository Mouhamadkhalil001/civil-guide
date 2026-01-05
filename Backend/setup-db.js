const mysql = require('mysql2/promise');
require('dotenv').config();

async function setupDatabase() {
  console.log('🔧 Setting up database...\n');

  // Create connection
  const connection = await mysql.createConnection({
    host: process.env.MYSQLHOST || process.env.DB_HOST || 'localhost',
    user: process.env.MYSQLUSER || process.env.DB_USER || 'root',
    password: process.env.MYSQLPASSWORD || process.env.DB_PASSWORD || '',
    database: process.env.MYSQLDATABASE || process.env.DB_NAME || 'railway',
    port: process.env.MYSQLPORT || 3306,
  });

  console.log('✓ Connected to MySQL');

  try {
    // Create users table
    console.log('Creating users table...');
    await connection.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(120) NOT NULL,
        email VARCHAR(150) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        role ENUM('admin', 'seeker') DEFAULT 'seeker',
        avatar_url VARCHAR(500) DEFAULT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✓ Users table created');

    // Create jobs table
    console.log('Creating jobs table...');
    await connection.query(`
      CREATE TABLE IF NOT EXISTS jobs (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(150) NOT NULL,
        company VARCHAR(150) NOT NULL,
        location VARCHAR(150) NOT NULL,
        type VARCHAR(50) NOT NULL,
        category VARCHAR(120) NOT NULL,
        salary VARCHAR(120) DEFAULT '',
        description TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✓ Jobs table created');

    // Insert sample jobs
    console.log('Adding sample jobs...');
    await connection.query(`
      INSERT IGNORE INTO jobs (id, title, company, location, type, category, salary, description) VALUES
        (1, 'Junior Web Developer', 'Beirut Digital Agency', 'Beirut', 'Full Time', 'IT / Development', '$800 - $1,200', 'Assist in building and maintaining web pages and small web apps using HTML, CSS, JavaScript, and React.'),
        (2, 'Administrative Assistant', 'Municipality of Saida', 'Saida', 'Full Time', 'Administration', '$600 - $900', 'Support daily office tasks, data entry, and communication with citizens and departments.'),
        (3, 'Customer Service Officer', 'Public Services Center', 'Tripoli', 'Part Time', 'Customer Service', '$400 - $600', 'Help citizens by answering questions about services, appointments, and required documents.'),
        (4, 'IT Support Intern', 'Civil Registry Office', 'Beirut', 'Internship', 'IT / Support', '$300 - $500', 'Provide technical support for computers and network, ideal for students starting in IT.'),
        (5, 'Social Media Coordinator', 'Youth & Sports Ministry', 'Online / Remote', 'Contract', 'Media / Communication', '$500 - $800', 'Prepare simple posts and announcements about youth activities and public events.'),
        (6, 'Data Entry Clerk', 'Civil Status Department', 'Zahle', 'Full Time', 'Data / Administration', '$550 - $750', 'Enter and check citizen information in the internal system with good attention to detail.')
    `);
    console.log('✓ Sample jobs added');

    // Insert sample users (Note: In production, these passwords should be hashed!)
    console.log('Adding sample users...');
    await connection.query(`
      INSERT IGNORE INTO users (id, name, email, password, role) VALUES
        (1, 'Admin User', 'admin@civilguide.com', 'password123', 'admin'),
        (2, 'John Seeker', 'john@example.com', 'password123', 'seeker'),
        (3, 'Jane Seeker', 'jane@example.com', 'password123', 'seeker')
    `);
    console.log('✓ Sample users added');

    console.log('\n✅ Database setup complete!\n');
    console.log('You can now start your server with: npm start');
    
  } catch (error) {
    console.error('❌ Error setting up database:', error.message);
    process.exit(1);
  } finally {
    await connection.end();
  }
}

setupDatabase();
