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
        {submissions.map((s) => {
          const ext = s.fileUrl.split('.').pop().split(/[#?]/)[0];
          const fileName = `${s.studentId?.firstName || 'student'}-${s.studentId?.lastName || ''}-${assignmentId}.${ext}`;
          const studentCode = s.studentId?._id?.slice(-5);
          return (
            <li key={s._id} className="list-group-item d-flex justify-content-between align-items-center">
              <span>
                {s.studentId?.firstName} {s.studentId?.lastName}
                {studentCode && <small className="text-muted ms-1">({studentCode})</small>} – {s.originalName}
              </span>
              <div className="d-flex">
                <a
                  className="btn btn-sm btn-outline-secondary me-2"
                  href={s.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View
                </a>
                <a className="btn btn-sm btn-primary" href={s.fileUrl} download={fileName}>
                  Download
                </a>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default AssignmentSubmissions;
