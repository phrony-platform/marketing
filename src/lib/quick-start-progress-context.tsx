'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

import {
  QUICK_START_STORAGE_KEY,
  QUICK_START_STEPS,
  countCompletedSteps,
  getAllQuickStartTaskIds,
  isStepComplete,
  type QuickStartStepId,
} from '@/lib/quick-start-data';

type ProgressState = {
  tasks: Record<string, boolean>;
};

function emptyProgress(): ProgressState {
  return { tasks: {} };
}

function readProgress(): ProgressState {
  if (typeof window === 'undefined') {
    return emptyProgress();
  }

  try {
    const raw = window.localStorage.getItem(QUICK_START_STORAGE_KEY);
    if (!raw) {
      return emptyProgress();
    }
    const parsed = JSON.parse(raw) as ProgressState;
    if (!parsed || typeof parsed.tasks !== 'object') {
      return emptyProgress();
    }
    return { tasks: parsed.tasks };
  } catch {
    return emptyProgress();
  }
}

function writeProgress(state: ProgressState) {
  window.localStorage.setItem(QUICK_START_STORAGE_KEY, JSON.stringify(state));
}

type QuickStartProgressValue = {
  hydrated: boolean;
  tasks: Record<string, boolean>;
  toggleTask: (taskId: string, done?: boolean) => void;
  setStepComplete: (stepId: QuickStartStepId, done: boolean) => void;
  resetProgress: () => void;
  completedSteps: number;
  totalSteps: number;
  completedTasks: number;
  totalTasks: number;
  isStepDone: (stepId: QuickStartStepId) => boolean;
  isTaskDone: (taskId: string) => boolean;
};

const QuickStartProgressContext = createContext<QuickStartProgressValue | null>(null);

function useQuickStartProgressState(): QuickStartProgressValue {
  const [tasks, setTasks] = useState<Record<string, boolean>>({});
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setTasks(readProgress().tasks);
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) {
      return;
    }
    writeProgress({ tasks });
  }, [tasks, hydrated]);

  const toggleTask = useCallback((taskId: string, done?: boolean) => {
    setTasks((current) => ({
      ...current,
      [taskId]: done ?? !current[taskId],
    }));
  }, []);

  const setStepComplete = useCallback((stepId: QuickStartStepId, done: boolean) => {
    const step = QUICK_START_STEPS.find((entry) => entry.id === stepId);
    if (!step) {
      return;
    }
    setTasks((current) => {
      const next = { ...current };
      for (const task of step.tasks) {
        next[task.id] = done;
      }
      return next;
    });
  }, []);

  const resetProgress = useCallback(() => {
    setTasks({});
  }, []);

  const completedSteps = useMemo(() => countCompletedSteps(tasks), [tasks]);
  const totalSteps = QUICK_START_STEPS.length;
  const totalTasks = getAllQuickStartTaskIds().length;
  const completedTasks = useMemo(
    () => getAllQuickStartTaskIds().filter((id) => tasks[id]).length,
    [tasks],
  );

  const isStepDone = useCallback((stepId: QuickStartStepId) => isStepComplete(stepId, tasks), [tasks]);

  return {
    hydrated,
    tasks,
    toggleTask,
    setStepComplete,
    resetProgress,
    completedSteps,
    totalSteps,
    completedTasks,
    totalTasks,
    isStepDone,
    isTaskDone: (taskId: string) => Boolean(tasks[taskId]),
  };
}

export function QuickStartProgressProvider({ children }: { children: ReactNode }) {
  const value = useQuickStartProgressState();
  return <QuickStartProgressContext.Provider value={value}>{children}</QuickStartProgressContext.Provider>;
}

export function useQuickStartProgress() {
  const context = useContext(QuickStartProgressContext);
  if (!context) {
    throw new Error('useQuickStartProgress must be used within QuickStartProgressProvider');
  }
  return context;
}
