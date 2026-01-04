import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { updateProfile, uploadAvatar } from '../api';
import FormInput from '../components/FormInput';
import '../styles/Auth.css';

const Profile = () => {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState(user?.avatar_url || null);
  const [avatarFile, setAvatarFile] = useState(null);
  
  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || ''
  });

  if (!user) {
    navigate('/signin');
    return null;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.match(/^image\/(jpeg|jpg|png|webp)$/)) {
      alert('Please select a valid image file (JPG, PNG, WEBP)');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB');
      return;
    }

    setAvatarFile(file);
    
    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatarPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Update profile data
      let updatedData = await updateProfile(form);
      
      // Upload avatar if changed
      if (avatarFile) {
        const formData = new FormData();
        formData.append('avatar', avatarFile);
        // Avatar upload returns the full user object now
        updatedData = await uploadAvatar(formData);
      }

      // Update context and localStorage
      updateUser(updatedData);
      localStorage.setItem('user', JSON.stringify(updatedData));
      
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Profile update error:', error);
      alert(error.response?.data?.error || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const getInitials = () => {
    if (!user?.name) return '??';
    const names = user.name.trim().split(' ');
    if (names.length === 1) return names[0][0].toUpperCase();
    return (names[0][0] + names[names.length - 1][0]).toUpperCase();
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-header">
          <h1 className="auth-title">My Profile</h1>
          <p className="auth-subtitle">Update your profile information</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {/* Avatar Section */}
          <div className="profile-avatar-section">
            <div className="profile-avatar-preview">
              {avatarPreview ? (
                <img src={avatarPreview} alt="Avatar" className="profile-avatar-image" />
              ) : (
                <span className="profile-avatar-initials">{getInitials()}</span>
              )}
            </div>
            <label className="profile-avatar-upload">
              <input
                type="file"
                accept="image/jpeg,image/jpg,image/png,image/webp"
                onChange={handleAvatarChange}
                style={{ display: 'none' }}
              />
              <span className="profile-upload-button">Change Avatar</span>
            </label>
            <p className="profile-avatar-hint">JPG, PNG or WEBP (max 5MB)</p>
          </div>

          <FormInput
            id="name"
            name="name"
            type="text"
            label="Full Name"
            icon="👤"
            placeholder="Enter your full name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <FormInput
            id="email"
            name="email"
            type="email"
            label="Email"
            icon="✉️"
            placeholder="Enter your email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <button type="submit" className="auth-button" disabled={loading}>
            <span>{loading ? 'Saving...' : 'Save Changes'}</span>
            <span className="submit-icon">✓</span>
          </button>

          <button
            type="button"
            className="auth-button secondary-button"
            onClick={() => navigate(-1)}
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
