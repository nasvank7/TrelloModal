import React from 'react';
interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
  }
  
const ProfileModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex justify-end items-start pt-16 z-50">
            <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
            <div className="bg-coloumnBackgroundColor rounded-lg p-6 shadow-lg z-10 w-64">
                <h2 className="text-xl mb-4">Profile Settings</h2>
                <ul className=''>
                    <li className="py-2 ">Profile</li>
                    <li className="py-2">Settings</li>
                    <li className="py-2 text-red-500 cursor-pointer" >Logout</li>
                </ul>
            </div>
        </div>
    );
};

export default ProfileModal;
