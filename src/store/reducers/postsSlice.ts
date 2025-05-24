import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types';
import { fetchAllPosts } from '../api/postsAPI';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  return await fetchAllPosts();
});

// export const saveToStorage = (posts: Post[]) => {
//   localStorage.setItem('my-posts', JSON.stringify(posts));
// }

interface PostsState {
  items: Post[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: PostsState = {
  items: [],
  status: 'idle',
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addPost: (state, action: PayloadAction<Omit<Post, 'id'>>) => {
      const newId = Date.now();
      const newPost: Post = { id: newId, ...action.payload };
      state.items.push(newPost);
      // saveToStorage(state.items);
},
    updatePost: (state, action: PayloadAction<Post>) => {
      const idx = state.items.findIndex(p => p.id === action.payload.id);
      if (idx !== -1) state.items[idx] = action.payload;
      // saveToStorage(state.items);
    },
    deletePost: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(p => p.id !== action.payload);
      // saveToStorage(state.items);
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchPosts.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = 'succeeded';
      })
      .addCase(fetchPosts.rejected, state => {
        state.status = 'failed';
      });
  },
});

export const { addPost, updatePost, deletePost } = postsSlice.actions;
export default postsSlice.reducer;
