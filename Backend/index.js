const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Serve uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer for avatar uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'avatar-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (extname && mimetype) {
      cb(null, true);
    } else {
      cb(new Error('Only JPEG, PNG, and WEBP images are allowed'));
    }
  }
});

const db = mysql.createConnection({
	host: process.env.DB_HOST || 'localhost',
	user: process.env.DB_USER || 'root',
	password: process.env.DB_PASSWORD || '',
	database: process.env.DB_NAME || 'civil_guide',
});

// Uncomment if you want to log connection status
// db.connect((err) => {
//   if (err) console.error('MySQL Connection Error:', err);
//   else console.log('MySQL Connected!');
// });

// Health check
app.get('/health', (_req, res) => {
	db.query('SELECT 1', (err) => {
		if (err) return res.status(500).json({ status: 'error', error: err });
		res.json({ status: 'ok' });
	});
});

// Register new user
app.post('/register', (req, res) => {
  const { name, email, password, role = 'seeker' } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'name, email, and password are required' });
  }
  
  // Check if user already exists
  db.query('SELECT id FROM users WHERE email = ?', [email], (err, results) => {
    if (err) return res.status(500).json(err);
    if (results.length > 0) {
      return res.status(409).json({ error: 'Email already registered' });
    }
    
    // Insert new user (Note: In production, hash the password!)
    const sql = 'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)';
    db.query(sql, [name, email, password, role], (err, result) => {
      if (err) return res.status(500).json(err);
      res.status(201).json({ 
        id: result.insertId, 
        name, 
        email, 
        role,
        message: 'User registered successfully' 
      });
    });
  });
});

// Login user
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'email and password are required' });
  }
  
  db.query('SELECT id, name, email, role, password, avatar_url FROM users WHERE email = ?', 
    [email], 
    async (err, results) => {
      if (err) return res.status(500).json(err);
      if (results.length === 0) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }
      
      const user = results[0];
      
      // Check password (support both plain text and hashed)
      let passwordMatches = false;
      if (user.password.startsWith('$2b$')) {
        passwordMatches = await bcrypt.compare(password, user.password);
      } else {
        passwordMatches = password === user.password;
      }
      
      if (!passwordMatches) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }
      
      res.json({ 
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          avatar_url: user.avatar_url ? `http://localhost:${PORT}${user.avatar_url}` : null
        },
        message: 'Login successful' 
      });
    }
  );
});

// Get all users (admin only - add auth middleware in production)
app.get('/users', (_req, res) => {
  db.query('SELECT id, name, email, role, created_at FROM users ORDER BY id', (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

// Get current user profile (simplified - in production use JWT middleware)
app.get('/me', (req, res) => {
  // In production, get user ID from JWT token
  // For now, we'll require email in query
  const { email } = req.query;
  if (!email) {
    return res.status(400).json({ error: 'Email required' });
  }

  db.query('SELECT id, name, email, role, avatar_url FROM users WHERE email = ?', [email], (err, results) => {
    if (err) return res.status(500).json(err);
    if (results.length === 0) return res.status(404).json({ error: 'User not found' });
    res.json(results[0]);
  });
});

// Update user profile
app.put('/me', (req, res) => {
  const { email, name, newEmail } = req.body;
  if (!email || !name) {
    return res.status(400).json({ error: 'email and name are required' });
  }

  const updateEmail = newEmail || email;
  const sql = 'UPDATE users SET name = ?, email = ? WHERE email = ?';
  
  db.query(sql, [name, updateEmail, email], (err, result) => {
    if (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(409).json({ error: 'Email already in use' });
      }
      return res.status(500).json(err);
    }
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Return updated user
    db.query('SELECT id, name, email, role, avatar_url FROM users WHERE email = ?', [updateEmail], (err, results) => {
      if (err) return res.status(500).json(err);
      res.json(results[0]);
    });
  });
});

// Upload avatar
app.post('/me/avatar', upload.single('avatar'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ error: 'Email required' });
  }

  // Delete old avatar if exists
  db.query('SELECT avatar_url FROM users WHERE email = ?', [email], (err, results) => {
    if (err) return res.status(500).json(err);
    
    if (results.length > 0 && results[0].avatar_url) {
      const oldPath = path.join(__dirname, results[0].avatar_url.replace('/uploads/', 'uploads/'));
      if (fs.existsSync(oldPath)) {
        fs.unlinkSync(oldPath);
      }
    }

    // Update database with new avatar URL
    const avatarUrl = `/uploads/${req.file.filename}`;
    db.query('UPDATE users SET avatar_url = ? WHERE email = ?', [avatarUrl, email], (err, result) => {
      if (err) return res.status(500).json(err);
      
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Return full user object
      db.query('SELECT id, name, email, role, avatar_url FROM users WHERE email = ?', [email], (err, results) => {
        if (err) return res.status(500).json(err);
        const updatedUser = results[0];
        updatedUser.avatar_url = `http://localhost:${PORT}${updatedUser.avatar_url}`;
        res.json(updatedUser);
      });
    });
  });
});

// Change password
app.put('/me/password', (req, res) => {
  const { email, oldPassword, newPassword } = req.body;
  
  if (!email || !oldPassword || !newPassword) {
    return res.status(400).json({ error: 'email, oldPassword, and newPassword are required' });
  }

  // Verify old password
  db.query('SELECT password FROM users WHERE email = ?', [email], async (err, results) => {
    if (err) return res.status(500).json(err);
    if (results.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const user = results[0];
    
    // Check if password is hashed (starts with $2b$) or plain text
    let passwordMatches = false;
    if (user.password.startsWith('$2b$')) {
      passwordMatches = await bcrypt.compare(oldPassword, user.password);
    } else {
      passwordMatches = oldPassword === user.password;
    }

    if (!passwordMatches) {
      return res.status(401).json({ error: 'Old password is incorrect' });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    
    // Update password
    db.query('UPDATE users SET password = ? WHERE email = ?', [hashedPassword, email], (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ message: 'Password changed successfully' });
    });
  });
});

// Get jobs with optional filters: search (title/company/category), location, type, category
app.get('/jobs', (req, res) => {
  const { search = '', location = '', type = '', category = '' } = req.query;

  const where = [];
  const params = [];

	if (search) {
		where.push('(title LIKE ? OR company LIKE ? OR category LIKE ? OR description LIKE ?)');
		const term = `%${search}%`;
		params.push(term, term, term, term);
	}
	if (location) {
		where.push('location = ?');
		params.push(location);
	}
	if (type) {
		where.push('type = ?');
		params.push(type);
	}
	if (category) {
		where.push('category = ?');
		params.push(category);
	}

	const sql = `SELECT id, title, company, location, type, category, salary, description
							 FROM jobs
							 ${where.length ? 'WHERE ' + where.join(' AND ') : ''}
							 ORDER BY id`;

	db.query(sql, params, (err, results) => {
		if (err) return res.status(500).json(err);
		res.json(results);
	});
});

// Get single job
app.get('/jobs/:id', (req, res) => {
	db.query('SELECT id, title, company, location, type, category, salary, description FROM jobs WHERE id = ?', [req.params.id], (err, results) => {
		if (err) return res.status(500).json(err);
		if (!results.length) return res.status(404).json({ error: 'Not found' });
		res.json(results[0]);
	});
});

// Create job
app.post('/jobs', (req, res) => {
	const { title, company, location, type, category, salary = '', description = '' } = req.body;
	if (!title || !company || !location || !type || !category) {
		return res.status(400).json({ error: 'title, company, location, type, and category are required' });
	}
	const sql = 'INSERT INTO jobs (title, company, location, type, category, salary, description) VALUES (?, ?, ?, ?, ?, ?, ?)';
	db.query(sql, [title, company, location, type, category, salary, description], (err, result) => {
		if (err) return res.status(500).json(err);
		res.status(201).json({ id: result.insertId, title, company, location, type, category, salary, description });
	});
});

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
