import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const jobSlice = createSlice({
  name: "jobs",
  initialState: {
    jobs: [],
    loading: false,
    error: null,
    message: null,
    singleJob: {},
    myJobs: [],
  },
  reducers: {
    request(state) {
      state.loading = true;
      state.error = null;
    },
    success(state, action) {
      state.loading = false;
      state.error = null;
      state.jobs = action.payload;
    },
    failure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    successForSingleJob(state, action) {
      state.loading = false;
      state.error = null;
      state.singleJob = action.payload;
    },
    successForPostJob(state, action) {
      state.message = action.payload;
      state.error = null;
      state.loading = false;
    },
    successForMyJobs(state, action) {
      state.loading = false;
      state.error = null;
      state.myJobs = action.payload;
    },
    successForDeleteJob(state, action) {
      state.loading = false;
      state.error = null;
      state.message = action.payload;
    },
    clearErrors(state) {
      state.error = null;
    },
    resetState() {
      return {
        jobs: [],
        loading: false,
        error: null,
        message: null,
        singleJob: {},
        myJobs: [],
      };
    },
  },
});

export const fetchJobs =
  (city, niche, searchKeyword = "") =>
  async (dispatch) => {
    try {
      dispatch(jobSlice.actions.request());
      let link =
        "http://localhost:4000/api/v1/job/getall?";
      const queryParams = [];

      if (searchKeyword) queryParams.push(`searchKeyword=${searchKeyword}`);
      if (city && city !== "All") queryParams.push(`city=${city}`);
      if (niche && niche !== "All") queryParams.push(`niche=${niche}`);

      link += queryParams.join("&");
      const response = await axios.get(link, { withCredentials: true });

      if (response.data && response.data.jobs) {
        dispatch(jobSlice.actions.success(response.data.jobs));
      } else {
        dispatch(jobSlice.actions.failure("No jobs found in the response."));
      }
    } catch (error) {
      dispatch(
        jobSlice.actions.failure(
          error.response?.data?.message || "Something went wrong."
        )
      );
    }
  };

export const fetchSingleJob = (jobId) => async (dispatch) => {
  dispatch(jobSlice.actions.request());
  try {
    const response = await axios.get(
      `http://localhost:4000/api/v1/job/get/${jobId}`,
      { withCredentials: true }
    );
    dispatch(jobSlice.actions.successForSingleJob(response.data.job));
  } catch (error) {
    dispatch(
      jobSlice.actions.failure(
        error.response?.data?.message || "Failed to fetch job details."
      )
    );
  }
};

export const postJob = (data) => async (dispatch) => {
  dispatch(jobSlice.actions.request());
  try {
    const response = await axios.post(
      `http://localhost:4000/api/v1/job/post`,
      data,
      { withCredentials: true, headers: { "Content-Type": "application/json" } }
    );
    dispatch(jobSlice.actions.successForPostJob(response.data.message));
  } catch (error) {
    dispatch(
      jobSlice.actions.failure(
        error.response?.data?.message || "Failed to post job."
      )
    );
  }
};

export const getMyJobs = () => async (dispatch) => {
  dispatch(jobSlice.actions.request());
  try {
    const response = await axios.get(
      `http://localhost:4000/api/v1/job/getmyjobs`,
      { withCredentials: true }
    );
    dispatch(jobSlice.actions.successForMyJobs(response.data.myJobs));
  } catch (error) {
    dispatch(
      jobSlice.actions.failure(
        error.response?.data?.message || "Failed to fetch your jobs."
      )
    );
  }
};

export const deleteJob = (id) => async (dispatch) => {
  dispatch(jobSlice.actions.request());
  try {
    const response = await axios.delete(
      `http://localhost:4000/api/v1/job/delete/${id}`,
      { withCredentials: true }
    );
    dispatch(jobSlice.actions.successForDeleteJob(response.data.message));
  } catch (error) {
    dispatch(
      jobSlice.actions.failure(
        error.response?.data?.message || "Failed to delete job."
      )
    );
  }
};

export const clearAllJobErrors = () => (dispatch) => {
  dispatch(jobSlice.actions.clearErrors());
};

export const resetJobSlice = () => (dispatch) => {
  dispatch(jobSlice.actions.resetState());
};

export default jobSlice.reducer;
