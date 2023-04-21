import { Job } from "./job";

export type MyJobsStore = {
  jobs: Job[];
  addNewJob(newJob: Job): void;
  setJobs(newjobs: Job[]): void;
  toggleStatus(id: string, checked: boolean): void;
  updateJob(id: string, data: any): void;
  deleteJob(id: string): void;
};
