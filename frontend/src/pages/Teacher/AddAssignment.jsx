import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../api';

const AddAssignment = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/assignments', { courseId, title, description });
      setMessage('Assignment created');
      navigate('/teacher/dashboard');
    } catch (err) {
      setMessage('Creation failed');
    }
  };

  return (
    <div className="container py-4">
      <h4>Add Assignment</h4>
      {message && <div className="alert alert-info">{message}</div>}
      <form onSubmit={submit}>
        <input
          className="form-control mb-2"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          className="form-control mb-2"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button className="btn btn-primary">Save</button>
      </form>
    </div>
  );
};

export default AddAssignment;
