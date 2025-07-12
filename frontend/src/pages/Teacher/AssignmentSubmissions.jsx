import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../api';

const AssignmentSubmissions = () => {
  const { assignmentId } = useParams();
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    api
      .get(`/assignments/${assignmentId}/submissions`)
      .then((res) => setSubmissions(res.data.submissions || []))
      .catch(() => setSubmissions([]));
  }, [assignmentId]);

  return (
    <div className="container py-4">
      <h4>Submissions</h4>
      <ul className="list-group">
        {submissions.map((s) => (
          <li key={s._id} className="list-group-item d-flex justify-content-between">
            <span>
              {s.studentId?.firstName} {s.studentId?.lastName}
            </span>
            <a className="btn btn-sm btn-outline-primary" href={s.fileUrl} download>
              Download
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AssignmentSubmissions;
