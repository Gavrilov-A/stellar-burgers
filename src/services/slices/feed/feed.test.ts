import feedsSlice, { fetchFeeds, TFeedState } from './feedsSlice';

describe('Тест асинхронных экшенов feedsSlice', () => {
  const initialState: TFeedState = {
    orders: [],
    total: 0,
    totalToday: 0,
    isLoading: false,
    error: null
  };
  const mokFeeds = {
    orders: [
      {
        _id: '6900de6d74993f001b5bbb65',
        ingredients: ['643d69a5c3f7b9001cfa093e', '643d69a5c3f7b9001cfa0941'],
        status: 'done',
        name: 'Био-марсианский люминесцентный бургер',
        createdAt: '2025-10-28T15:17:01.813Z',
        updatedAt: '2025-10-28T15:17:02.925Z',
        number: 92504
      },
      {
        _id: '6900dc2b74993f001b5bbb60',
        ingredients: [
          '643d69a5c3f7b9001cfa093d',
          '643d69a5c3f7b9001cfa0946',
          '643d69a5c3f7b9001cfa094a',
          '643d69a5c3f7b9001cfa0945',
          '643d69a5c3f7b9001cfa0945',
          '643d69a5c3f7b9001cfa093d'
        ],
        status: 'done',
        name: 'Астероидный флюоресцентный минеральный антарианский бургер',
        createdAt: '2025-10-28T15:07:23.901Z',
        updatedAt: '2025-10-28T15:07:25.190Z',
        number: 92503
      }
    ],
    total: 16,
    totalToday: 3
  };

  it('Pending', () => {
    const state = feedsSlice.reducer(initialState, {
      type: fetchFeeds.pending.type
    });

    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
    expect(state.orders).toEqual([]);
  });

  it('Fulfilled', () => {
    const state = feedsSlice.reducer(initialState, {
      type: fetchFeeds.fulfilled.type,
      payload: mokFeeds
    });
    expect(state.isLoading).toBe(false);
    expect(state.error).toBeNull();
    expect(state.orders).toEqual(mokFeeds.orders);
    expect(state.total).toEqual(mokFeeds.total);
    expect(state.totalToday).toEqual(mokFeeds.totalToday);
  });

  it('Rejected', () => {
    const state = feedsSlice.reducer(initialState, {
      type: fetchFeeds.rejected.type
    });

    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Error feeds not found');
    expect(state.orders).toEqual([]);
  });
});
