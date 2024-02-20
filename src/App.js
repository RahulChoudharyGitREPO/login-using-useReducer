import { useState, useReducer } from "react";
import "./App.css";

const initialState = {
  email: "",
  password: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "email":
      return { ...state, email: action.payload };
    case "password":
      return { ...state, password: action.payload };
    case "reset":
      return initialState;
      default:
        throw new Error("Invalid action type");
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [submittedData, setSubmittedData] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: name, payload: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedData(state);
    dispatch({ type: "reset" });
  };

  return (
    <div className="App">
      <h2>useReducer Hook</h2>
      <form className="form-wrapper" data-testid="form-wrapper" onSubmit={handleSubmit}>
        <div className="useremail-wrapper">
          <label>User Email</label>
          <input
            type="email"
            name="email"
            value={state.email}
            onChange={handleInputChange}
            data-testid="user-email"
          />
        </div>
        <div className="userpassword-wrapper">
          <label>User Password</label>
          <input
            type="password"
            name="password"
            value={state.password}
            onChange={handleInputChange}
            data-testid="user-password"
          />
        </div>
        <button type="submit">Submit</button>
      </form>

      {Object.keys(submittedData).length > 0 ? (
        <div>
          <div data-testid="submitted-data-email">User Email: {submittedData.email}</div>
          <div data-testid="submitted-data-password">User Password: {submittedData.password}</div>
        </div>
      ) : (
        <div data-testid="no-details-container">No details found</div>
      )}
    </div>
  );
}

export default App;
export { reducer, initialState };
