// // src/redux/slices/caseSlice.ts
// import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// interface CaseState {
//   cases: any[]; // Define a more specific type for cases
// }

// const initialState: CaseState = {
//   cases: [],
// };

// const caseSlice = createSlice({
//   name: 'cases',
//   initialState,
//   reducers: {
//     setCases(state, action: PayloadAction<any[]>) {
//       state.cases = action.payload;
//     },
//     addCase(state, action: PayloadAction<any>) {
//       state.cases.push(action.payload);
//     },
//     updateCase(state, action: PayloadAction<any>) {
//       const caseIndex = state.cases.findIndex(c => c.id === action.payload.id);
//       if (caseIndex !== -1) {
//         state.cases[caseIndex] = action.payload;
//       }
//     },
//   },
// });

// export const { setCases, addCase, updateCase } = caseSlice.actions;
// export default caseSlice.reducer;
