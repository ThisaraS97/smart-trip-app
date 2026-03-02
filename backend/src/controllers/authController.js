import bcrypt from 'bcryptjs';
import User from '../models/User.js'; // Assuming you have a User model
import generateToken from '../utils/generateToken.js';

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
export const registerUser = async (req, res) => {
    const { name, email, password, phone, dateOfBirth, location, preferredLanguage, bio, travelInterests } = req.body;

    try {
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role: 'user', // role is always set server-side; never trusted from client
            phone: phone || '',
            dateOfBirth: dateOfBirth || '',
            location: location || '',
            preferredLanguage: preferredLanguage || 'English',
            bio: bio || '',
            travelInterests: travelInterests || [],
        });

        if (user) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                phone: user.phone,
                dateOfBirth: user.dateOfBirth,
                location: user.location,
                preferredLanguage: user.preferredLanguage,
                bio: user.bio,
                photo: user.photo,
                travelInterests: user.travelInterests,
                travelPreferences: user.travelPreferences,
                token: generateToken(user._id),
            });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (user && (await bcrypt.compare(password, user.password))) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                phone: user.phone,
                dateOfBirth: user.dateOfBirth,
                location: user.location,
                preferredLanguage: user.preferredLanguage,
                bio: user.bio,
                photo: user.photo,
                travelInterests: user.travelInterests,
                travelPreferences: user.travelPreferences,
                token: generateToken(user._id),
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Forgot password
// @route   POST /api/auth/forgot-password
// @access  Public
export const forgotPassword = async (req, res) => {
    // Placeholder function
    res.status(200).json({ message: "Password reset email sent (placeholder)" });
};

// @desc    Reset password
// @route   PUT /api/auth/reset-password/:resettoken
// @access  Public
export const resetPassword = async (req, res) => {
    // Placeholder function
    res.status(200).json({ message: "Password reset successful (placeholder)" });
};

// @desc    Get current user profile
// @route   GET /api/auth/profile
// @access  Private
export const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select('-password');
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Update current user profile
// @route   PUT /api/auth/profile
// @access  Private
export const updateUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        const { name, phone, dateOfBirth, location, preferredLanguage, bio, photo, travelInterests, travelPreferences, password } = req.body;

        if (name) user.name = name;
        if (phone !== undefined) user.phone = phone;
        if (dateOfBirth !== undefined) user.dateOfBirth = dateOfBirth;
        if (location !== undefined) user.location = location;
        if (preferredLanguage !== undefined) user.preferredLanguage = preferredLanguage;
        if (bio !== undefined) user.bio = bio;
        if (photo !== undefined) user.photo = photo;
        if (travelInterests !== undefined) user.travelInterests = travelInterests;
        if (travelPreferences !== undefined) user.travelPreferences = { ...user.travelPreferences.toObject(), ...travelPreferences };

        if (password) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
        }

        const updated = await user.save();
        res.json({
            _id: updated._id,
            name: updated.name,
            email: updated.email,
            role: updated.role,
            phone: updated.phone,
            dateOfBirth: updated.dateOfBirth,
            location: updated.location,
            preferredLanguage: updated.preferredLanguage,
            bio: updated.bio,
            photo: updated.photo,
            travelInterests: updated.travelInterests,
            travelPreferences: updated.travelPreferences,
            token: generateToken(updated._id),
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
