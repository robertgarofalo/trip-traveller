import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import destinationService from '../destinations/destinationService'

const initialState = {
    destinations: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

// Create new destination
export const createDestination = createAsyncThunk(
    'destinations/create',
    async (destinationData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await destinationService.createDestination(destinationData, token)
        } catch (error) {
            const message =
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const getDestinations = createAsyncThunk(
    'destinations/getAll',
    async (_, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await destinationService.getDestinations(token)
          } catch (error) {
            const message =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString()
            return thunkAPI.rejectWithValue(message)
          }
    }
)

// Delete user destination
export const deleteDestination = createAsyncThunk(
  'destination/delete',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await destinationService.deleteDestination(id, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const destinationSlice = createSlice({
    name: 'destination',
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
        .addCase(createDestination.pending, (state) => {
            state.isLoading = true
        })
        .addCase(createDestination.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.destinations.push(action.payload)
        })
        .addCase(createDestination.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        .addCase(getDestinations.pending, (state) => {
            state.isLoading = true
          })
          .addCase(getDestinations.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.destinations = action.payload
          })
          .addCase(getDestinations.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
          })
          .addCase(deleteDestination.pending, (state) => {
            state.isLoading = true
          })
          .addCase(deleteDestination.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.destinations = state.destinations.filter(
              (destination) => destination._id !== action.payload.id
            )
          })
          .addCase(deleteDestination.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
          })
    }
})

export const { reset } = destinationSlice.actions
export default destinationSlice.reducer