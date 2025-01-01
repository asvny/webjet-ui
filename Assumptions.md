## Requirements

- Ensure Node.js is installed locally, with a minimum version of v22 or higher.

## Running locally

- Clone this repository.
- Navigate to the project directory: `cd solution`
- Install dependencies: `npm install`
- Start the development server: `npm run dev`

## Tests

To run the test suite:

```bash
npm run test
```

## Tech stack

- **React.js**: For building the dynamic user interface.
- **TypeScript**: Enhances code quality and ensures a better developer experience with type safety.
- **History API**: Used for managing URL updates to reflect search queries by hotel name or rating.
- **Vitest**: For running unit tests.

## Assumptions

#### Mock Data Navigation

All hotel listings and ads are designed to open the Webjet homepage in a new tab. As this project uses mock data, redirecting to specific pages for each listing is outside the scope of this implementation.

#### Rating Filter Behavior

- Ratings are between 1-5 and are whole numbers only.
- Fractional ratings (e.g., 2.5 stars) are not supported.
- Filters work by matching exact ratings. For example:
- I wasn't really sure how listings with fractional ratings will work with rating filters.

#### Search and URL Updates

- Search functionality for hotel names or ratings updates the URL dynamically.
- This provides several advantages:
  - Makes the search results shareable via URL.
  - Enables easier navigation, bookmarking, or testing for specific search filters.
