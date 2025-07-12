import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import api from '../../api';

const Assignments = () => {
  const { classId } = useParams();
  const [file, setFile] = useState(null);
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    api
      .get(`/assignments/course/${classId}`)
      .then(res => setAssignments(res.data.assignments || []))
      .catch(() => setAssignments([]));
  }, [classId]);

  const handleUpload = async (e, assignmentId) => {
    e.preventDefault();
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);
    await api.post(`/assignments/${assignmentId}/submissions`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    alert('Answer uploaded.');
  };

  return (
    <div className="container py-4">
      <h4>Assignments – {classId}</h4>
      <ul className="list-group mb-4">
        {assignments.map(a => (
          <li key={a._id} className="list-group-item">
            <strong>{a.title}</strong>
            {a.description && <p className="mb-1">{a.description}</p>}
            {a.fileUrl && (
              <a href={a.fileUrl} className="d-block" download>
                Download File
              </a>
            )}
            <form onSubmit={(e) => handleUpload(e, a._id)} className="mt-2">
              <input type="file" className="form-control mb-2" onChange={(e) => setFile(e.target.files[0])} />
              <button className="btn btn-warning btn-sm">Upload Answer</button>
            </form>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Assignments;
