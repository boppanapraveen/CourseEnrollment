import { BrowserRouter,Route,Switch,Routes} from 'react-router-dom';
import HomePage from "./home";
import AdminLogin from './home/adminLogin';
import StudentLogin from './home/studentLogin';
import InstructorLogin from './home/instructorLogin';
import InstructorRegistration from './home/instructorRegistration';
import StudentRegistration from './home/studentRegistration';
import AdminHome from './admin/adminHome';
import Logout from './logout';
import InstructorHome from './instructor/instructorHome';
import StudentHome from './student/studentHome';
import AddCategories from './admin/addCategories';
import SubCategory from './admin/subCategories';
import AddCourse from './instructor/addCourse';
import viewCourses from './instructor/viewCourses';
import Addsection from './instructor/addsection';
import AddVideos from './instructor/addVideos';
import ViewCoursesRequest from './admin/viewCoursesRequest';
import Message from './admin/Message';
import AvailableCourses from './student/AvailableCourses';
import GetCourseDetails from './student/getCourseDetails';
import PayAmount from './student/PayAmount';
import Enrolls from './student/enrolls';
import GetPayments from './student/getPayments';
import GiveRating from './student/giveRating';
import GetCourseEnrolls from './instructor/getCourseEnrolls';
import GetCourseDetails2 from './instructor/getCourseDetails2';
import ViewSections from './student/ViewSections';
import ViewVideos from './student/ViewVideos';
import UpdateStudent from './student/updateStudent';
import ViewInstructors from './admin/viewInstructors';
import ViewStudents from './admin/viewStudents';
import AddQuestions from './instructor/AddQuestions';
import ViewQuestions from './instructor/ViewQuestions';
import WriteQuestions from './student/WriteQuestions';
import viewQuizResults from './student/viewQuizResults';
import ViewQuizResults from './student/viewQuizResults';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
      
         <Routes>
          <Route path='/'  Component={HomePage} />
          <Route path='/adminLogin'  Component={AdminLogin} />
          <Route path='/studentLogin'  Component={StudentLogin} />
          <Route path='/instructorLogin'  Component={InstructorLogin} />
          <Route path='/instructorRegistration'  Component={InstructorRegistration} />
          <Route path='/studentRegistration'  Component={StudentRegistration} />
          <Route path='/adminHome'  Component={AdminHome} />
          <Route path='/logout' Component={Logout}/>
          <Route path='/instructorHome' Component={InstructorHome}/>
          <Route path='/studentHome' Component={StudentHome}/>
          <Route path='/addCategories' Component={AddCategories}/>
          <Route path='/subCategories' Component={SubCategory}/>
          <Route path='/addCourse' Component={AddCourse}/>
          <Route path='/viewCourses' Component={viewCourses}/>
          <Route path='/addsection' Component={Addsection}/>
          <Route path='/addVideos' Component={AddVideos}/>
          <Route path='/viewCoursesRequest' Component={ViewCoursesRequest}/>
          <Route path='/Message' Component={Message}/>
          <Route path='/AvailableCourses' Component={AvailableCourses}/>
          <Route path='/getCourseDetails' Component={GetCourseDetails}/>
          <Route path='/PayAmount' Component={PayAmount}/>
          <Route path='/enrolls' Component={Enrolls}/>
          <Route path='/getPayments' Component={GetPayments}/>
          <Route path='/giveRating' Component={GiveRating}/>
          <Route path='/getCourseEnrolls' Component={GetCourseEnrolls}/>
          <Route path='/getCourseDetails2' Component={GetCourseDetails2}/>
          <Route path='/ViewSections' Component={ViewSections}/>
          <Route path='/ViewVideos' Component={ViewVideos}/>
          <Route path='/updateStudent' Component={UpdateStudent}/>
          <Route path='/viewInstructors' Component={ViewInstructors}/>
          <Route path='/viewStudents' Component={ViewStudents}/>
          <Route path='/AddQuestions' Component={AddQuestions}/>
          <Route path='/ViewQuestions' Component={ViewQuestions}/>
          <Route path='/WriteQuestions' Component={WriteQuestions}/>
          <Route path='/viewQuizResults' Component={ViewQuizResults}/>

          
         </Routes>
        </div>
        </BrowserRouter>
  );
}

export default App;
