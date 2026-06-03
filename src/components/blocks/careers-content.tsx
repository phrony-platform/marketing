'use client';

import { Briefcase } from 'lucide-react';
import { useMemo, useState } from 'react';

const bodyClass =
  'text-pretty font-sans text-base leading-relaxed text-muted-foreground md:text-lg md:leading-[28px]';

const labelClass = 'text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground';

const selectClass =
  'h-10 w-full min-w-0 rounded-md border border-border bg-background px-3 text-sm text-foreground shadow-sm outline-none transition-[color,box-shadow] focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background md:w-auto md:min-w-[11rem]';

const departmentOptions = [
  { value: 'all', label: 'All teams' },
  { value: 'engineering', label: 'Engineering' },
  { value: 'product', label: 'Product' },
  { value: 'design', label: 'Design' },
  { value: 'gtm', label: 'GTM' },
  { value: 'operations', label: 'Operations' },
] as const;

const locationOptions = [
  { value: 'all', label: 'All locations' },
  { value: 'remote', label: 'Remote' },
  { value: 'hybrid', label: 'Hybrid' },
  { value: 'onsite', label: 'On-site' },
] as const;

const typeOptions = [
  { value: 'all', label: 'All types' },
  { value: 'fulltime', label: 'Full-time' },
  { value: 'parttime', label: 'Part-time' },
  { value: 'contract', label: 'Contract' },
] as const;

type Department = (typeof departmentOptions)[number]['value'];
type Location = (typeof locationOptions)[number]['value'];
type WorkType = (typeof typeOptions)[number]['value'];

type Job = {
  id: string;
  title: string;
  department: Exclude<Department, 'all'>;
  location: Exclude<Location, 'all'>;
  workType: Exclude<WorkType, 'all'>;
};

const OPEN_ROLES: Job[] = [];

function useFilteredJobs(department: Department, location: Location, workType: WorkType) {
  return useMemo(() => {
    return OPEN_ROLES.filter((job) => {
      if (department !== 'all' && job.department !== department) return false;
      if (location !== 'all' && job.location !== location) return false;
      if (workType !== 'all' && job.workType !== workType) return false;
      return true;
    });
  }, [department, location, workType]);
}

export function CareersContent() {
  const [department, setDepartment] = useState<Department>('all');
  const [location, setLocation] = useState<Location>('all');
  const [workType, setWorkType] = useState<WorkType>('all');
  const filtered = useFilteredJobs(department, location, workType);
  const hasListings = OPEN_ROLES.length > 0;
  const hasMatches = filtered.length > 0;
  const anyFilterActive = department !== 'all' || location !== 'all' || workType !== 'all';

  function clearFilters() {
    setDepartment('all');
    setLocation('all');
    setWorkType('all');
  }

  return (
    <div className="relative bg-background px-3 py-12 md:px-5 md:py-16">
      <header className="max-w-4xl border-b border-border pb-10">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Phrony</p>
        <h1 className="mt-3 font-sans text-3xl font-semibold tracking-tight text-foreground sm:text-4xl md:text-[2.5rem] md:leading-[1.15]">
          Careers
        </h1>
        <p className={`mt-4 max-w-2xl ${bodyClass}`}>
          We are building a governed runtime for production AI agents. When we are hiring, open roles will appear
          below.
        </p>
      </header>

      <div className="mx-auto mt-10 max-w-4xl">
        <div
          className="flex flex-col gap-4 rounded-lg border border-border bg-card/30 p-4 md:flex-row md:flex-wrap md:items-end md:justify-between"
          role="search"
          aria-label="Filter open roles"
        >
          <div className="grid w-full gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="flex min-w-0 flex-col gap-2">
              <label className={labelClass} htmlFor="careers-filter-team">
                Team
              </label>
              <select
                id="careers-filter-team"
                className={selectClass}
                value={department}
                onChange={(e) => setDepartment(e.target.value as Department)}
              >
                {departmentOptions.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex min-w-0 flex-col gap-2">
              <label className={labelClass} htmlFor="careers-filter-location">
                Location
              </label>
              <select
                id="careers-filter-location"
                className={selectClass}
                value={location}
                onChange={(e) => setLocation(e.target.value as Location)}
              >
                {locationOptions.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex min-w-0 flex-col gap-2 sm:col-span-2 lg:col-span-1">
              <label className={labelClass} htmlFor="careers-filter-type">
                Employment type
              </label>
              <select
                id="careers-filter-type"
                className={selectClass}
                value={workType}
                onChange={(e) => setWorkType(e.target.value as WorkType)}
              >
                {typeOptions.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {anyFilterActive ? (
            <button
              type="button"
              onClick={clearFilters}
              className="h-10 shrink-0 rounded-md border border-border bg-transparent px-4 text-sm font-medium text-foreground transition-colors hover:bg-accent/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              Clear filters
            </button>
          ) : null}
        </div>

        <div className="mt-8">
          {!hasListings ? (
            <div className="flex flex-col items-center justify-center gap-4 rounded-lg border border-dashed border-border bg-muted/20 px-6 py-16 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-background">
                <Briefcase className="h-5 w-5 text-muted-foreground" aria-hidden />
              </div>
              <div>
                <p className="font-sans text-lg font-semibold text-foreground">No jobs posted yet</p>
                <p className={`mt-2 max-w-md text-pretty ${bodyClass}`}>
                  We do not have any open positions right now. When roles open up, you will be able to filter and
                  apply from this page.
                </p>
              </div>
            </div>
          ) : hasMatches ? (
            <ul className="flex flex-col gap-3">
              {filtered.map((job) => (
                <li
                  key={job.id}
                  className="rounded-lg border border-border bg-card/40 px-4 py-3 text-left text-foreground"
                >
                  {job.title}
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-border bg-muted/20 px-6 py-12 text-center">
              <p className="font-sans text-base font-medium text-foreground">No roles match your filters</p>
              <p className={bodyClass}>
                Try different filters, or{' '}
                <button
                  type="button"
                  onClick={clearFilters}
                  className="text-foreground underline underline-offset-4 hover:text-primary"
                >
                  clear filters
                </button>
                .
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
