import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { isOwner as checkIsOwner } from '../utils/auth';
import { addVisitor } from '../utils/db';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { toast } from 'sonner@2.0.3';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'owner' | 'visitor' | null;
}

export function LoginModal({ isOpen, onClose, mode }: LoginModalProps) {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    password: '',
    relation: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (mode === 'owner') {
        if (checkIsOwner(formData.name, formData.password)) {
          login(formData.name, true);
          toast.success('Welcome back, Om!');
          onClose();
          navigate('/');
        } else {
          toast.error('Invalid credentials');
        }
      } else if (mode === 'visitor') {
        if (!formData.name || !formData.relation) {
          toast.error('Please fill in all fields');
          return;
        }
        
        await addVisitor(formData.name, formData.relation);
        login(formData.name, false);
        toast.success(`Welcome, ${formData.name}!`);
        onClose();
        navigate('/');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({ name: '', password: '', relation: '' });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {mode === 'owner' ? 'Owner Login' : 'Visitor Access'}
          </DialogTitle>
          <DialogDescription>
            {mode === 'owner' 
              ? 'Enter your credentials to access owner features'
              : 'Please introduce yourself to continue'}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder={mode === 'owner' ? 'Om Maurya' : 'Your name'}
              required
            />
          </div>
          
          {mode === 'owner' ? (
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="Enter password"
                required
              />
            </div>
          ) : (
            <div>
              <Label htmlFor="relation">Occupation / Relation</Label>
              <Input
                id="relation"
                value={formData.relation}
                onChange={(e) => setFormData({ ...formData, relation: e.target.value })}
                placeholder="Recruiter / Visitor / Friend"
                required
              />
            </div>
          )}
          
          <div className="flex gap-2 pt-4">
            <Button type="submit" disabled={loading} className="flex-1">
              {loading ? 'Please wait...' : 'Continue'}
            </Button>
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
