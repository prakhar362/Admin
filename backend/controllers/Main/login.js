const MainAdmin = require('../../models/MainAdmin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register Main Admin
const registerMainAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if email already exists
    const existingAdmin = await MainAdmin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({
        success: false,
        message: 'Email already exists',
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new MainAdmin
    const newMainAdmin = new MainAdmin({
      name,
      email,
      password: hashedPassword,
    });

    // Save to the database
    await newMainAdmin.save();

    res.status(201).json({
      success: true,
      message: 'Main admin registered successfully',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while registering',
    });
  }
};

// Login Main Admin
const loginMainAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if main admin exists
    const existingAdmin = await MainAdmin.findOne({ email });
    if (!existingAdmin) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    // Compare the provided password with the hashed password
    const isPasswordCorrect = await bcrypt.compare(password, existingAdmin.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    // Generate a JWT token
    const token = jwt.sign(
      {
        _id: existingAdmin._id,
        name: existingAdmin.name,
        email: existingAdmin.email,
        role: existingAdmin.role,
      },
      process.env.JWT_SECRET || 'JWT_SECRET', // Use an environment variable or default fallback
      { expiresIn: '2h' }
    );

    res.status(200).json({
      success: true,
      message: 'Logged in successfully',
      data: {
        token,
        user: {
          _id: existingAdmin._id,
          name: existingAdmin.name,
          email: existingAdmin.email,
          role: existingAdmin.role,
        },
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while logging in',
    });
  }
};

module.exports = { registerMainAdmin, loginMainAdmin };
