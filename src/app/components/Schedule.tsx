'use client';

import clsx from 'clsx';
import { useCallback } from 'react';

const schedule = {
  Sun: 'Listening',
  Mon: 'Speaking',
  Tue: 'Writting',
  Wed: 'Listening',
  Thu: 'Book',
  Fri: 'Speaking',
  Sat: 'Writting',
};

export const Schedule = () => {
  const renderList = useCallback(() => {
    return (
      <ol className="">
        {Object.entries(schedule).map(([day, value], idx) => {
          return (
            <li key={value + idx} className="mb-1 flex gap-2">
              <span>{idx + 1}.</span>
              <span className="">{day}</span>
              <span>-</span>
              <strong
                className={clsx(
                  'font-normal',
                  idx === new Date().getDay() &&
                    'text-blueSecondary border-b border-blueSecondary font-semibold'
                )}
              >
                {value}
              </strong>
            </li>
          );
        })}
      </ol>
    );
  }, []);

  return (
    <div className="p-4 border border-blueSecondary rounded-2xl w-max">
      {renderList()}
    </div>
  );
};
