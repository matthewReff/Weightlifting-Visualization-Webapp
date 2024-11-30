## Getting Started
This project's locks are in deno, so that's what I recommend for running

```bash
deno install && deno run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Description
Visualize weightlifting progress over time using data exported from the [Strong app](https://www.strong.app/). Recording actual max lifts and then using max estimate calculations to see if progress is being made over time by increasing reps at lower weights


## Tech
Fairly standard NextJS project using the /pages router to serve API endpoints and the webpage itself

Deploys automatically in Vercel, with some small auto-detection for the environment it is deploying on to make sure the endpoints are connected correctly