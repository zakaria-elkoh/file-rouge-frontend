import AppRoutes from "./AppRoutes";
import useWindowWidth from "./common/hooks/useWindowWidth";
import Notification from "./components/Notification";
import EditPostModal from './components/EditPostModal';
import VerificationRequestModal from './modules/verification/VerificationRequestModal';

function App() {
  useWindowWidth();
  return (
    <>
      <AppRoutes />
      <Notification />
      <EditPostModal />
      <VerificationRequestModal />
    </>
  );
}

export default App;
