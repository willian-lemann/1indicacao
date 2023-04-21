import { api } from "@/utils/api";
import { create } from "@/lib/store";
import { MyJobsStore } from "../types/myjobs-store";

const myjobsStore = create<MyJobsStore>()((set, get) => ({
  jobs: [],
  setJobs: (newJobs) => set({ jobs: newJobs }),
  toggleStatus: (id, checked) => {
    const state = get();
    const newjobs = state.jobs.map((job) => {
      if (job.id === id) {
        return {
          ...job,
          isActive: checked,
        };
      }

      return job;
    });

    set({ jobs: newjobs });
  },

  addNewJob: (newJob) => {
    set((state) => ({ jobs: [...state.jobs, newJob] }));
  },

  updateJob: (id, data) => {
    const state = get();
    const newJobs = state.jobs.map((job) => {
      if (job.id === id) {
        return {
          ...job,
          ...data,
        };
      }

      return job;
    });

    set({ jobs: newJobs });
  },

  deleteJob: (id) => {
    set((state) => ({ jobs: state.jobs.filter((job) => job.id !== id) }));
  },
}));

export function useJobs() {
  const state = myjobsStore((state) => state);
  const { mutateAsync } = api.jobs.delete.useMutation();

  async function deleteJob(id: string) {
    const previousJobs = structuredClone(state.jobs);

    state.deleteJob(id);

    try {
      await mutateAsync({ id });
    } catch (error) {
      state.setJobs(previousJobs);
    }
  }

  return {
    ...state,
    deleteJob,
    jobs: !state.jobs ? [] : state.jobs,
    isEmpty: state.jobs?.length === 0,
  };
}
