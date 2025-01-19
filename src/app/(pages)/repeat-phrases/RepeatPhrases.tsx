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
        <div className="mb-6 flex gap-4 items-center border-b border-blue-500 pb-6">
          <h3 className="text-xl">
            You need to repeat -{' '}
            <span className="text-blue-500 underline  underline-offset-4">
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
          <Button onClick={() => {}} className="" variant={'danger'}>
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
              <Link
                key={item.en}
                className="text-white p-2 bg-blue-600 rounded-md leading-6 hover:opacity-80 transition-opacity text-sm relative"
                href={`${DASHBOARD_PAGES.PHRASES}/${item.en}`}
              >
                {item.en}
              </Link>
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
