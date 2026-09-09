import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import { login } from "./features/login";

const App = () => {
  const handleLogin = async () => {
    const data = await signInWithPopup(auth, googleProvider)
    const token = await data.user.getIdToken();
    const result = await login(token)
    console.log(result)
  }
  return (
    <div>
      <button className="bg-amber-600" onClick={handleLogin} >
        Continue with Google
      </button>
    </div>
  )
}

export default App