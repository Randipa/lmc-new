import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';

// Public Pages
import Home from './pages/Home';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';

// Class Navigation
import GradeList from './pages/Classes/GradeList';
import SubjectList from './pages/Classes/SubjectList';
import TeacherList from './pages/Classes/TeacherList';
import TeacherCourses from './pages/Classes/TeacherCourses';
import ClassDetail from './pages/Classes/ClassDetail';
import AllClasses from './pages/Classes/AllClasses';

// Shop
import Shop from './pages/Shop/Shop';
import Cart from './pages/Shop/Cart';

// Student Dashboard
import StudentDashboard from './pages/Dashboard/StudentDashboard';
import MyClasses from './pages/Dashboard/MyClasses';
import LiveClasses from './pages/Dashboard/LiveClasses';
import Recordings from './pages/Dashboard/Recordings';
import Assignments from './pages/Dashboard/Assignments';
import MyRecordings from './pages/Dashboard/MyRecordings';
import MyAssignments from './pages/Dashboard/MyAssignments';
import Marks from './pages/Dashboard/Marks';
import Attendance from './pages/Dashboard/Attendance';
import PaymentHistory from './pages/Dashboard/PaymentHistory';
import Notices from './pages/Dashboard/Notices';
import ELibrary from './pages/ELibrary/ELibrary';
import PaymentSuccess from './pages/PaymentSuccess';

// Admin Pages
import CourseUploader from './pages/Admin/CourseUploader';
import CourseList from './pages/Admin/CourseList';
import CreateCourse from './pages/Admin/CreateCourse';
import PaymentList from './pages/Admin/PaymentList';
import BankPaymentRequests from './pages/Admin/BankPaymentRequests';
import BunnyVideoList from './pages/Admin/BunnyVideoList';
import TeacherListAdmin from './pages/Admin/TeacherList';
import CreateTeacher from './pages/Admin/CreateTeacher';
import EditTeacher from './pages/Admin/EditTeacher';
import NoticeList from './pages/Admin/NoticeList';
import CreateNotice from './pages/Admin/CreateNotice';
import CreateProduct from './pages/Admin/CreateProduct';
import ProductList from './pages/Admin/ProductList';
import EditProduct from './pages/Admin/EditProduct';
import RequireAdmin from './components/RequireAdmin';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Home */}
        <Route path="/" element={<Home />} />

        {/* Classes Flow */}
        <Route path="/classes" element={<GradeList />} />
        <Route path="/classes/all" element={<AllClasses />} />
        <Route path="/classes/:gradeId/subjects" element={<SubjectList />} />
        <Route path="/classes/:gradeId/subjects/:subjectName/teachers" element={<TeacherList />} />
        <Route path="/classes/:gradeId/subjects/:subjectName/teachers/:teacherId" element={<TeacherCourses />} />
        <Route path="/classes/:gradeId/teachers" element={<TeacherList />} />
        <Route path="/classes/:gradeId/teachers/:teacherId" element={<TeacherCourses />} />
        <Route path="/class/:classId" element={<ClassDetail />} />

        {/* Shop */}
        <Route path="/shop" element={<Shop />} />
        <Route path="/shop/cart" element={<Cart />} />

        {/* Payment return */}
        <Route path="/payment-success" element={<PaymentSuccess />} />

        {/* Dashboard */}
        <Route path="/dashboard" element={<StudentDashboard />} />
        <Route path="/dashboard/classes" element={<MyClasses />} />
        <Route path="/dashboard/recordings" element={<MyRecordings />} />
        <Route path="/dashboard/assignments" element={<MyAssignments />} />
        <Route path="/dashboard/notices" element={<Notices />} />
        <Route path="/dashboard/live/:classId" element={<LiveClasses />} />
        <Route path="/dashboard/recordings/:classId" element={<Recordings />} />
        <Route path="/dashboard/assignments/:classId" element={<Assignments />} />
        <Route path="/dashboard/marks/:classId" element={<Marks />} />
        <Route path="/dashboard/attendance" element={<Attendance />} />
        <Route path="/dashboard/payments" element={<PaymentHistory />} />

        {/* Library */}
        <Route path="/e-library" element={<ELibrary />} />

        {/* Admin */}
        <Route path="/admin/courses" element={<RequireAdmin><CourseList /></RequireAdmin>} />
        <Route path="/admin/courses/create" element={<RequireAdmin><CreateCourse /></RequireAdmin>} />
        <Route path="/admin/courses/:courseId/upload" element={<RequireAdmin><CourseUploader /></RequireAdmin>} />
        <Route path="/admin/payments" element={<RequireAdmin><PaymentList /></RequireAdmin>} />
        <Route path="/admin/bank-payments" element={<RequireAdmin><BankPaymentRequests /></RequireAdmin>} />
        <Route path="/admin/videos" element={<RequireAdmin><BunnyVideoList /></RequireAdmin>} />
        <Route path="/admin/teachers" element={<RequireAdmin><TeacherListAdmin /></RequireAdmin>} />
        <Route path="/admin/teachers/create" element={<RequireAdmin><CreateTeacher /></RequireAdmin>} />
        <Route path="/admin/teachers/:teacherId/edit" element={<RequireAdmin><EditTeacher /></RequireAdmin>} />
        <Route path="/admin/notices" element={<RequireAdmin><NoticeList /></RequireAdmin>} />
        <Route path="/admin/notices/create" element={<RequireAdmin><CreateNotice /></RequireAdmin>} />
        <Route path="/admin/products" element={<RequireAdmin><ProductList /></RequireAdmin>} />
        <Route path="/admin/products/create" element={<RequireAdmin><CreateProduct /></RequireAdmin>} />
        <Route path="/admin/products/:productId/edit" element={<RequireAdmin><EditProduct /></RequireAdmin>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
