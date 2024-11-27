export const initialState = {
  student: {
    first_name: "",
    last_name: "",
    email: "",
    date_of_birth: "",
  },
  error: "",
};

export const studentReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_STUDENT":
      console.log(state);

      return {
        ...state,
        student: action.payload,
      };
    case "UPDATE_STUDENT_FIELD":
      return {
        ...state,
        student: {
          ...state.student,
          [action.payload.name]: action.payload.value,
        },
      };
    case "SET_ERROR":
      return {
        ...state,
        error: action.payload,
      };
    case "CLEAR_ERROR":
      return {
        ...state,
        error: "",
      };
    default:
      return state;
  }
};

export default studentReducer;
export const setStudent = (student) => ({
  type: "SET_STUDENT",
  payload: student,
});

export const updateStudentField = (name, value) => ({
  type: "UPDATE_STUDENT_FIELD",
  payload: { name, value },
});

export const setError = (error) => ({
  type: "SET_ERROR",
  payload: error,
});

export const clearError = () => ({
  type: "CLEAR_ERROR",
});
