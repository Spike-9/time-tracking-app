import React, { createContext, useContext, useReducer, ReactNode } from 'react'
import { AppState, AppAction, Task, RunningTask, DailyStats, WeeklyStats } from '../types'

const initialState: AppState = {
  currentTask: null,
  tasks: [],
  stats: null,
  loading: false,
  error: null,
  pendingSaves: [],
}

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'START_TASK':
      return {
        ...state,
        currentTask: action.payload,
        error: null,
      }

    case 'STOP_TASK':
      return {
        ...state,
        currentTask: null,
        tasks: [action.payload, ...state.tasks],
        error: null,
      }

    case 'LOAD_TASKS':
      return {
        ...state,
        tasks: action.payload,
        error: null,
      }

    case 'LOAD_STATS':
      return {
        ...state,
        stats: action.payload,
        error: null,
      }

    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
      }

    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null,
      }

    case 'ADD_PENDING_SAVE':
      return {
        ...state,
        pendingSaves: [...state.pendingSaves, action.payload],
      }

    case 'CLEAR_PENDING_SAVES':
      return {
        ...state,
        pendingSaves: [],
      }

    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload,
      }

    default:
      return state
  }
}

const AppStateContext = createContext<AppState | undefined>(undefined)
const AppDispatchContext = createContext<React.Dispatch<AppAction> | undefined>(undefined)

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState)

  return (
    <AppStateContext.Provider value={state}>
      <AppDispatchContext.Provider value={dispatch}>{children}</AppDispatchContext.Provider>
    </AppStateContext.Provider>
  )
}

export function useAppState() {
  const context = useContext(AppStateContext)
  if (context === undefined) {
    throw new Error('useAppState must be used within an AppProvider')
  }
  return context
}

export function useAppDispatch() {
  const context = useContext(AppDispatchContext)
  if (context === undefined) {
    throw new Error('useAppDispatch must be used within an AppProvider')
  }
  return context
}
