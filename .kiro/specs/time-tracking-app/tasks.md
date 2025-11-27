# Implementation Plan

- [x] 1. Set up project structure and initialize both frontend and backend



  - Create monorepo structure with `frontend/` and `backend/` directories
  - Initialize frontend with Vite + React + TypeScript
  - Initialize backend with Node.js + Express + TypeScript
  - Configure ESLint and Prettier for both projects
  - Set up basic folder structure (components, services, types, etc.)
  - _Requirements: All requirements depend on proper project setup_

- [x] 2. Implement backend database schema and ORM setup



  - Install and configure Prisma ORM
  - Define Task model in Prisma schema with all required fields (id, title, category, startTime, endTime, duration, status)
  - Add database indexes for startTime, category, and status fields
  - Generate Prisma client
  - Create initial database migration
  - _Requirements: 1.4, 1.5, 2.3_

- [x] 3. Create shared TypeScript types and interfaces


  - Define Category enum (work, study, entertainment, misc)
  - Define Task, RunningTask, TaskInput interfaces
  - Define DTO types (CreateTaskDto, ManualTaskDto, ListOptions)
  - Define statistics types (CategoryStats, DailyStats, WeeklyStats, TaskRanking)
  - Export all types for use in both frontend and backend
  - _Requirements: 2.2, 2.5_

- [x] 4. Implement backend validation utilities


  - Create validation functions for task title (required, max 200 characters)
  - Create validation functions for category (must be one of four options)
  - Create validation functions for duration (positive number, max 1440 minutes)
  - Implement input validation middleware using Zod or Joi
  - _Requirements: 2.4, 2.5, 3.4_






- [ ] 5. Implement TaskService business logic
- [ ] 5.1 Implement startTask method
  - Check if a task is already running (throw 409 Conflict if true)
  - Validate input data (title and category)
  - Create new task record with status 'running' and current timestamp as startTime

  - Return created task
  - _Requirements: 1.1, 1.4_

- [ ] 5.2 Implement stopTask method
  - Find task by ID
  - Record current timestamp as endTime
  - Calculate duration in minutes: (endTime - startTime) / 60000

  - Update task status to 'completed'
  - Save and return updated task
  - _Requirements: 1.2, 1.5_

- [ ] 5.3 Implement createManualTask method
  - Validate input data (title, category, duration)
  - Use current time as endTime

  - Calculate startTime by subtracting duration: endTime - (duration * 60000)
  - Create task record with status 'completed'
  - Return created task
  - _Requirements: 3.1, 3.2, 3.3, 3.5_

- [x] 5.4 Implement getTaskList method

  - Query tasks with pagination (page, limit)
  - Apply category filter if provided
  - Sort by startTime descending (newest first)
  - Return paginated results with total count and hasMore flag
  - _Requirements: 4.1, 4.3, 4.4, 4.5_

- [ ] 5.5 Implement getCurrentTask method
  - Query for task with status 'running'
  - Return task or null if none found




  - _Requirements: 6.1_

- [ ]* 5.6 Write unit tests for TaskService
  - Test startTask with valid input and concurrent task detection
  - Test stopTask duration calculation
  - Test createManualTask time calculation
  - Test getTaskList pagination and filtering

  - _Requirements: 1.1, 1.2, 3.5_

- [ ] 6. Implement StatisticsService business logic
- [ ] 6.1 Implement getDailyStats method
  - Query all completed tasks for the specified date
  - Calculate total duration by summing all task durations
  - Count total number of tasks

  - Group tasks by category and calculate duration per category
  - Calculate percentage for each category
  - Return DailyStats object
  - _Requirements: 5.1, 5.3_

- [ ] 6.2 Implement getWeeklyStats method
  - Query all completed tasks for the specified week (7 days)
  - Calculate total duration for the week
  - Group tasks by date and calculate daily duration
  - Group tasks by category and calculate category breakdown
  - Return WeeklyStats object
  - _Requirements: 5.2, 5.5_




- [ ] 6.3 Implement getTopTasks method
  - Query completed tasks for the specified period (day or week)
  - Group tasks by title and aggregate total duration
  - Count occurrences for each task title
  - Sort by total duration descending
  - Limit results to specified number (default 5)

  - Return TaskRanking array
  - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5_

- [ ]* 6.4 Write unit tests for StatisticsService
  - Test getDailyStats aggregation logic
  - Test getWeeklyStats date range filtering

  - Test getTopTasks grouping and sorting
  - _Requirements: 5.1, 5.2, 9.2, 9.3_

- [ ] 7. Implement backend API endpoints and controllers
- [ ] 7.1 Create POST /api/tasks/start endpoint
  - Parse request body (title, category)

  - Call TaskService.startTask
  - Handle validation errors (400) and conflict errors (409)
  - Return 201 Created with task data
  - _Requirements: 1.1, 1.4_


- [ ] 7.2 Create PUT /api/tasks/:id/stop endpoint
  - Extract task ID from URL params
  - Call TaskService.stopTask
  - Handle not found errors (404)

  - Return 200 OK with completed task data
  - _Requirements: 1.2, 1.5_

- [ ] 7.3 Create POST /api/tasks/manual endpoint
  - Parse request body (title, category, duration)

  - Call TaskService.createManualTask
  - Handle validation errors (400)
  - Return 201 Created with task data
  - _Requirements: 3.1, 3.2, 3.3_


- [ ] 7.4 Create GET /api/tasks endpoint
  - Parse query parameters (page, limit, category)
  - Call TaskService.getTaskList
  - Return 200 OK with paginated task list
  - _Requirements: 4.1, 4.4, 4.5_


- [ ] 7.5 Create GET /api/tasks/current endpoint
  - Call TaskService.getCurrentTask
  - Return 200 OK with task data or 204 No Content if none
  - _Requirements: 6.1_

- [ ] 7.6 Create GET /api/stats/daily endpoint
  - Parse query parameter (date, default to today)
  - Call StatisticsService.getDailyStats
  - Return 200 OK with daily statistics
  - _Requirements: 5.1_


- [ ] 7.7 Create GET /api/stats/weekly endpoint
  - Parse query parameter (weekStart, default to this week)
  - Call StatisticsService.getWeeklyStats
  - Return 200 OK with weekly statistics
  - _Requirements: 5.2_

- [ ] 7.8 Create GET /api/stats/top-tasks endpoint
  - Parse query parameters (period, limit)
  - Call StatisticsService.getTopTasks
  - Return 200 OK with task rankings
  - _Requirements: 9.1, 9.5_

- [ ] 7.9 Implement global error handling middleware
  - Catch all errors and format consistent error responses
  - Map error types to appropriate HTTP status codes
  - Log errors for debugging
  - Filter sensitive information in production
  - _Requirements: Error handling for all endpoints_

- [ ]* 7.10 Write API integration tests
  - Test all endpoints with valid and invalid inputs
  - Test error responses and status codes
  - Test pagination and filtering
  - _Requirements: All API requirements_

- [x] 8. Set up backend server configuration

  - Configure Express app with middleware (CORS, body-parser, helmet)
  - Set up environment variables (PORT, DATABASE_URL, CORS_ORIGIN)
  - Configure CORS with appropriate origins
  - Add request logging middleware
  - Create server entry point and start script
  - _Requirements: All backend requirements_



- [ ] 9. Implement frontend API client
  - Create Axios instance with base URL configuration
  - Implement API methods for all backend endpoints (startTask, stopTask, createManualTask, getTasks, getCurrentTask, getDailyStats, getWeeklyStats, getTopTasks)
  - Add request/response interceptors for error handling
  - Implement retry logic with exponential backoff (max 3 retries)
  - Add timeout configuration (30 seconds)

  - _Requirements: 8.5, all API communication_

- [ ] 10. Implement frontend state management
  - Create AppContext with React Context API
  - Define AppState interface with currentTask, tasks, stats, loading, error, pendingSaves
  - Implement reducer function with all action types (START_TASK, STOP_TASK, LOAD_TASKS, LOAD_STATS, SET_ERROR, CLEAR_ERROR, ADD_PENDING_SAVE, CLEAR_PENDING_SAVES)
  - Create AppProvider component wrapping the reducer



  - Export custom hooks (useAppState, useAppDispatch)
  - _Requirements: All state management needs_

- [ ] 11. Implement shared UI components
- [x] 11.1 Create CategoryBadge component

  - Accept category prop
  - Render badge with category-specific color (work: blue, study: green, entertainment: purple, misc: gray)
  - Include icon and text label
  - _Requirements: 10.5_

- [x] 11.2 Create DurationDisplay component

  - Accept minutes prop
  - Format duration as "Xh Ym" for >= 60 minutes or "Ym" for < 60 minutes
  - Handle edge cases (0 minutes, null values)
  - _Requirements: 1.3, 4.2_

- [ ] 11.3 Create CategorySelect component
  - Accept value and onChange props
  - Render dropdown with four category options (work, study, entertainment, misc)
  - Display icons and labels for each option
  - Highlight selected option
  - _Requirements: 2.2, 2.5_

- [ ] 11.4 Write unit tests for shared components





  - Test CategoryBadge color rendering
  - Test DurationDisplay formatting logic
  - Test CategorySelect option rendering and selection
  - _Requirements: 2.2, 10.5_

- [x] 12. Implement TaskInputForm component



  - Create form with title input, category select, and optional duration input
  - Support two modes: 'timer' and 'manual'
  - Show duration field only in manual mode
  - Implement client-side validation (title required and max 200 chars, category required, duration 1-1440 minutes)
  - Display validation errors below fields
  - Handle form submission and call onSubmit callback
  - Preserve user input on validation errors
  - Add cancel button to call onCancel callback


  - _Requirements: 2.1, 2.4, 2.5, 3.1, 3.4, 8.3_

- [ ] 13. Implement CurrentTaskPanel component
  - Accept task and onStop props
  - Display task title, category badge, and elapsed time
  - Implement timer that updates every second using setInterval
  - Calculate elapsed minutes from task startTime
  - Use DurationDisplay to format elapsed time
  - Add stop button that calls onStop callback
  - Position panel at top of page

  - Conditionally render only when task is provided
  - Clean up timer on component unmount
  - _Requirements: 1.3, 6.1, 6.2, 6.3, 6.4, 6.5_

- [ ] 14. Implement TaskItem component
  - Accept task prop
  - Display task title, category badge, start time, end time, and duration

  - Format timestamps as readable date/time strings
  - Use DurationDisplay for duration
  - Apply responsive styling for mobile and desktop
  - _Requirements: 4.2_

- [ ] 15. Implement TaskList component
  - Accept tasks, onLoadMore, hasMore, and filterCategory props
  - Render list of TaskItem components
  - Implement infinite scroll using Intersection Observer API


  - Trigger onLoadMore when user scrolls near bottom
  - Show loading indicator while loading more tasks
  - Display empty state when no tasks exist
  - Apply category filter if provided
  - _Requirements: 4.1, 4.3, 4.4, 4.5_

- [ ] 16. Implement statistics visualization components
- [ ] 16.1 Create DailySummary component
  - Accept date prop
  - Fetch daily stats from API
  - Display total duration, task count, and category breakdown
  - Show loading state while fetching
  - Handle errors gracefully
  - _Requirements: 5.1_


- [ ] 16.2 Create WeeklySummary component
  - Accept weekStart prop
  - Fetch weekly stats from API
  - Display total duration for the week
  - Render bar chart showing daily duration distribution using Chart.js
  - Configure chart with responsive options
  - _Requirements: 5.2, 5.5_

- [x] 16.3 Create CategoryPieChart component

  - Accept data and period props
  - Render pie chart using Chart.js
  - Display category percentages
  - Use category-specific colors matching CategoryBadge
  - Add legend and tooltips
  - Make chart responsive
  - _Requirements: 5.3, 5.4_

- [ ] 16.4 Create TopTasksRanking component
  - Accept tasks, period, and limit props (default limit 5)




  - Fetch top tasks from API based on period
  - Display ranked list with task title, category, total duration, and occurrences
  - Allow switching between day and week periods
  - Show empty state if no tasks
  - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5_

- [ ] 17. Implement main page components
- [x] 17.1 Create HomePage component


  - Display large "Start Task" button as primary action
  - Show CurrentTaskPanel if a task is running
  - Display DailySummary for today
  - Add quick link to manual task entry
  - Implement start task flow: show TaskInputForm modal on button click
  - Call API to start task and update state


  - Handle errors and display error messages
  - _Requirements: 1.1, 6.1, 10.1, 10.4_

- [ ] 17.2 Create TasksPage component
  - Display TaskList with all tasks
  - Add category filter dropdown at top



  - Implement pagination by calling API with page parameter
  - Update URL query params when filter changes
  - Show loading state on initial load
  - _Requirements: 4.1, 4.4, 4.5_

- [x] 17.3 Create StatisticsPage component

  - Add tab switcher for "Today" and "This Week"
  - Display DailySummary or WeeklySummary based on selected tab
  - Show CategoryPieChart for selected period
  - Display TopTasksRanking with period toggle
  - Implement data fetching for selected period


  - Cache statistics data for 5 minutes
  - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 9.1, 9.5_

- [ ] 18. Implement layout and navigation components
- [ ] 18.1 Create Navigation component
  - Display navigation links for Home, Tasks, and Statistics pages
  - Highlight current page based on route
  - Use icons with text labels for each link
  - Implement responsive design: sidebar for desktop, bottom bar for mobile
  - _Requirements: 10.5_

- [ ] 18.2 Create AppLayout component
  - Wrap all pages with consistent layout
  - Include Navigation component
  - Add responsive container with proper breakpoints
  - Apply global styles and theme
  - _Requirements: 7.1, 7.2, 7.3_

- [ ] 19. Implement routing and app initialization
  - Set up React Router with routes for /, /tasks, /stats
  - Wrap app with AppProvider for state management
  - Fetch current task on app initialization
  - Set up network status listener for online/offline events
  - Implement auto-retry logic for pending saves when network recovers
  - _Requirements: 8.5_

- [ ] 20. Implement auto-save and error recovery mechanism
  - Add save logic to stop task action: call API and handle success/failure
  - Add save logic to manual task creation: call API and handle success/failure
  - On save failure, add task to pendingSaves state and show error toast
  - Preserve user input data on errors
  - Implement retry function that processes pendingSaves queue
  - Use exponential backoff for retries (1s, 2s, 4s, max 3 attempts)
  - Clear pendingSaves on successful save
  - Show offline indicator when network is unavailable
  - Display count of pending saves in UI
  - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5_

- [ ] 21. Implement responsive design and styling
  - Configure Tailwind CSS with custom breakpoints (mobile < 768px, tablet 768-1024px, desktop > 1024px)
  - Apply mobile-first responsive classes to all components
  - Ensure minimum touch target size of 44x44px for all interactive elements
  - Set minimum font size to 14px across the app
  - Implement single-column layout for mobile, multi-column for desktop
  - Test responsive behavior at all breakpoints
  - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5_

- [ ] 22. Implement UI design system and theming
  - Define color palette with max 3 primary colors (blue, green, gray)
  - Create consistent spacing scale
  - Define typography hierarchy (font sizes, weights)
  - Ensure clear visual hierarchy with size, weight, and color
  - Limit primary actions to max 3 per page
  - Add icons to all action buttons with text labels
  - Apply consistent styling across all components
  - _Requirements: 10.1, 10.2, 10.3, 10.4, 10.5_

- [ ] 23. Implement error handling and user feedback
  - Create Toast notification component for displaying messages
  - Show success toast on task save
  - Show error toast on save failure with retry option
  - Display loading indicators during API calls
  - Show validation errors inline on form fields
  - Implement error boundary for catching React errors
  - Add empty states for lists with no data
  - _Requirements: 8.3, 8.4_

- [ ]* 24. Write end-to-end tests
  - Test complete task flow: start task → stop task → view in history
  - Test manual task creation flow
  - Test statistics page data display
  - Test responsive layout on different viewport sizes
  - Test network error recovery flow
  - _Requirements: 1.1, 1.2, 3.1, 4.1, 5.1, 8.5_

- [ ] 25. Set up development and build configuration
  - Configure Vite build settings for production
  - Set up environment variables for frontend (VITE_API_URL)
  - Configure backend build with TypeScript compiler
  - Create npm scripts for dev, build, and start
  - Set up concurrent dev script to run frontend and backend together
  - Add README with setup and run instructions
  - _Requirements: All requirements depend on proper build setup_

- [ ] 26. Optimize performance
  - Implement code splitting for routes using React.lazy
  - Lazy load Chart.js library on statistics page
  - Add React.memo to prevent unnecessary re-renders
  - Use useMemo and useCallback for expensive computations
  - Implement virtual scrolling for task list if > 100 items
  - Configure API response caching with 5-minute TTL for statistics
  - Optimize Tailwind CSS build to purge unused styles
  - Enable gzip compression on backend
  - _Requirements: Performance considerations for all features_

- [ ] 27. Final integration and testing
  - Test all user flows end-to-end in development environment
  - Verify all requirements are met
  - Test error scenarios  and edge cases
  - Verify responsive design on multiple devices
  - Check accessibility (keyboard navigation, screen reader support)
  - Perform manual testing of auto-save and retry logic
  - Verify data persistence across page refreshes
  - _Requirements: All requirements_
