'use client';

import { repeatPhrasesService } from '@/app/services/repeat-pharases.service';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { IRepeatPhrase } from './model/types/repeat-phrases.types';
import Button from '@/components/ui/button/Button';
import Loader from '@/components/ui/loader/Loader';
import { RepeatEntityModal } from '@/components/ui/repeat-modal/RepeatModal';
import { Toaster } from 'sonner';
import { WithHeaderState } from '@/app/hoc/WithHeaderState';
import Link from 'next/link';
import { DASHBOARD_PAGES } from '@/config/pages-url.config';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const RepeatPhrases = () => {
  const [localData, setLocalData] = useState<IRepeatPhrase[] | null>(null);
  const [isOpenRepeatingModal, setIsOpenRepeatingModal] =
    useState<boolean>(false);

  const {
    data,
    isFetching,
    error,
    refetch: getDailyPhrases,
  } = useQuery({
    queryKey: ['getRepeatPhrases'],
    queryFn: () => repeatPhrasesService.getDailyPhrases(),
  });

  useEffect(() => {
    if (data?.data && !isFetching && !error) {
      setLocalData(data.data);
    }
  }, [data, isFetching]);

  return (
    <>
      <div>
        <div className="mb-6 flex gap-4 items-center border-b border-grayLight pb-6">
          <h3 className="text-xl">
            You need to repeat -{' '}
            <span className="text-gray underline  underline-offset-4">
              {data?.data?.length}
            </span>{' '}
            phrases
          </h3>
          <Button
            disabled={!!!data?.data?.length}
            className="ml-auto"
            onClick={() => setIsOpenRepeatingModal(true)}
          >
            Start
          </Button>
          <Button onClick={() => {}} className="">
            Delete all
          </Button>
        </div>
        {isFetching && <Loader />}
        {!isFetching && data?.data && data.data.length === 0 && (
          <h5>Nothing to repeat</h5>
        )}
        {!isFetching && data?.data && data.data.length > 0 && (
          <div className="flex flex-wrap gap-x-2 gap-y-4 mb-10">
            {data.data.map((item: IRepeatPhrase, idx) => (
              <TooltipProvider delayDuration={100}>
                <Tooltip>
                  <TooltipTrigger>
                    <Link
                      className="text-white px-2.5 py-1.5 bg-primary border border-gray rounded-xl leading-4 hover:opacity-60 transition-opacity text-[15px] relative whitespace-nowrapm"
                      href={`${DASHBOARD_PAGES.PHRASES}/${item.en}`}
                    >
                      {item.en}
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent className="bg-black rounded-2xl text-[12px]">
                    <p>
                      <p>{item.phrase.translate?.join(', ')}</p>
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
          </div>
        )}

        {!!localData?.length && (
          <RepeatEntityModal
            getRepeatEntitiesRefetch={getDailyPhrases}
            data={localData}
            isOpen={isOpenRepeatingModal}
            onHandleClose={() => setIsOpenRepeatingModal(false)}
            repeatVariant="phrase"
          />
        )}
      </div>
      <Toaster richColors />
    </>
  );
};

export default WithHeaderState(RepeatPhrases, 'phrases');
