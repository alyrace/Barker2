import { useOvermind } from "./store";
import Auth from "./containers/auth/Auth";
import ProtectedRoutes from "./containers/ProtectedRoutes";
//import './assets/styles/main.scss';

function App() {
  const { state } = useOvermind();
  return <>{state.user.user ? <ProtectedRoutes /> : <Auth />}</>;
}

export default App;
