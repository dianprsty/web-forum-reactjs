import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button';

export default function LogoutConfirmModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/20 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <h2 className="text-xl font-bold mb-4">Konfirmasi Logout</h2>
        <p className="mb-6">Apakah Anda yakin ingin keluar dari akun Anda?</p>
        <div className="flex justify-end gap-3">
          <Button 
            onClick={onClose} 
            className="bg-gray-200 hover:bg-gray-300 text-gray-800"
          >
            Batal
          </Button>
          <Button 
            onClick={onConfirm} 
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
}

LogoutConfirmModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};