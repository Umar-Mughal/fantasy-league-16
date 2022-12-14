import {
  SIGNUP_FAILED,
  SIGNUP_SUCCESS,
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  ME_SUCCESS,
  ME_FAILED,
  CONFIRMATION_FAILED,
  CONFIRMATION_SUCCESS,
  RESET_PASSWORD_REQUEST_FAILED,
  RESET_PASSWORD_REQUEST_SUCCESS,
  RESET_PASSWORD_FAILED,
  RESET_PASSWORD_SUCCESS,
} from "./actionCreators";

// // Chip Booster States
// const benchBoosterState = (state, action) => {
//   switch (action.type) {
//     // Chip Booster
//     case BENCH_BOOST_APPLIED_SUCCESS:
//       return {
//         ...state,
//         user: { ...state.user, benchBoostApplied: true, ...action.payload },
//       };
//     case BENCH_BOOST_APPLIED_FAILED:
//       return {
//         ...state,
//         user: { ...state.user, benchBoostApplied: false, ...action.payload },
//       };
//     case TRIPLE_CAPTAIN_BOOST_APPLIED_SUCCESS:
//       return {
//         ...state,
//         user: { ...state.user, tripleCaptainApplied: true, ...action.payload },
//       };
//     case TRIPLE_CAPTAIN_BOOST_APPLIED_FAILED:
//       return {
//         ...state,
//         user: { ...state.user, tripleCaptainApplied: false, ...action.payload },
//       };
//   }
// };

function authReducer(
  state = {
    signUpSuccess: "",
    signUpError: "",
    confirmationError: "",
    confirmationSuccess: "",
    resetRequestSuccess: "",
    resetRequestError: "",
    resetPasswordSuccess: "",
    resetPasswordError: "",
    user: {},
  },
  action
) {
  switch (action.type) {
    // ME
    case ME_SUCCESS:
      return {
        ...state,
        user: { ...state.user, ...action.payload },
      };
    case ME_FAILED:
      return {
        ...state,
        user: { ...state.user, ...action.payload },
      };

    // signup
    case SIGNUP_SUCCESS:
      return {
        ...state,
        signUpSuccess: action.payload,
      };
    case SIGNUP_FAILED:
      return {
        ...state,
        signUpError: action.payload,
      };

    //email confirmation
    case CONFIRMATION_SUCCESS:
      return {
        ...state,
        confirmationSuccess: action.payload,
      };
    case CONFIRMATION_FAILED:
      return {
        ...state,
        confirmationError: action.payload,
      };

    // reset password
    case RESET_PASSWORD_REQUEST_SUCCESS:
      return {
        ...state,
        resetRequestSuccess: action.payload,
      };
    case RESET_PASSWORD_REQUEST_FAILED:
      return {
        ...state,
        resetRequestError: action.payload,
      };
    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        resetPasswordSuccess: action.payload,
      };
    case RESET_PASSWORD_FAILED:
      return {
        ...state,
        resetPasswordError: action.payload,
      };

    default:
      return state;
  }
}

export default authReducer;
