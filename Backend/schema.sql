-- Schema for civil-guide backend (MySQL, XAMPP-friendly)
CREATE DATABASE IF NOT EXISTS civil_guide;
USE civil_guide;

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role ENUM('admin', 'seeker') DEFAULT 'seeker',
  avatar_url VARCHAR(500) DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

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
);

INSERT INTO jobs (title, company, location, type, category, salary, description) VALUES
  ('Junior Web Developer', 'Beirut Digital Agency', 'Beirut', 'Full Time', 'IT / Development', '$800 - $1,200', 'Assist in building and maintaining web pages and small web apps using HTML, CSS, JavaScript, and React.'),
  ('Administrative Assistant', 'Municipality of Saida', 'Saida', 'Full Time', 'Administration', '$600 - $900', 'Support daily office tasks, data entry, and communication with citizens and departments.'),
  ('Customer Service Officer', 'Public Services Center', 'Tripoli', 'Part Time', 'Customer Service', '$400 - $600', 'Help citizens by answering questions about services, appointments, and required documents.'),
  ('IT Support Intern', 'Civil Registry Office', 'Beirut', 'Internship', 'IT / Support', '$300 - $500', 'Provide technical support for computers and network, ideal for students starting in IT.'),
  ('Social Media Coordinator', 'Youth & Sports Ministry', 'Online / Remote', 'Contract', 'Media / Communication', '$500 - $800', 'Prepare simple posts and announcements about youth activities and public events.'),
  ('Data Entry Clerk', 'Civil Status Department', 'Zahle', 'Full Time', 'Data / Administration', '$550 - $750', 'Enter and check citizen information in the internal system with good attention to detail.')
ON DUPLICATE KEY UPDATE
  title = VALUES(title),
  company = VALUES(company),
  location = VALUES(location),
  type = VALUES(type),
  category = VALUES(category),
  salary = VALUES(salary),
  description = VALUES(description);

-- Sample users (password is 'password123' - in production, hash these!)
INSERT INTO users (name, email, password, role) VALUES
  ('Admin User', 'admin@civilguide.com', 'password123', 'admin'),
  ('John Seeker', 'john@example.com', 'password123', 'seeker'),
  ('Jane Seeker', 'jane@example.com', 'password123', 'seeker')
ON DUPLICATE KEY UPDATE name = VALUES(name);
