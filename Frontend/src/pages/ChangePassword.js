import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { changePassword } from '../api';
import FormInput from '../components/FormInput';
import '../styles/Auth.css';

const ChangePassword = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  const [form, setForm] = useState({
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  });

  if (!user) {
    navigate('/signin');
    return null;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate new passwords match
    if (form.newPassword !== form.confirmNewPassword) {
      alert('New passwords do not match!');
      return;
    }

    // Validate password length
    if (form.newPassword.length < 6) {
      alert('New password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      await changePassword({
        oldPassword: form.oldPassword,
        newPassword: form.newPassword
      });

      alert('Password changed successfully!');
      
      // Clear form
      setForm({
        oldPassword: '',
        newPassword: '',
        confirmNewPassword: ''
      });

      // Redirect to profile
      navigate('/profile');
    } catch (error) {
      console.error('Password change error:', error);
      alert(error.response?.data?.error || 'Failed to change password. Please check your old password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-header">
          <h1 className="auth-title">Change Password</h1>
          <p className="auth-subtitle">Update your password</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <FormInput
            id="oldPassword"
            name="oldPassword"
            type="password"
            label="Current Password"
            icon="🔒"
            placeholder="Enter current password"
            value={form.oldPassword}
            onChange={handleChange}
            required
          />

          <FormInput
            id="newPassword"
            name="newPassword"
            type="password"
            label="New Password"
            icon="🔒"
            placeholder="Enter new password (min 6 chars)"
            value={form.newPassword}
            onChange={handleChange}
            required
          />

          <FormInput
            id="confirmNewPassword"
            name="confirmNewPassword"
            type="password"
            label="Confirm New Password"
            icon="🔒"
            placeholder="Confirm new password"
            value={form.confirmNewPassword}
            onChange={handleChange}
            required
          />

          <button type="submit" className="auth-button" disabled={loading}>
            <span>{loading ? 'Changing...' : 'Change Password'}</span>
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

export default ChangePassword;
