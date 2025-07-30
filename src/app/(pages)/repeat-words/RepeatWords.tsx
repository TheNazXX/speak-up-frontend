'use client';

import { WithHeaderState } from '@/src/app/hoc/WithHeaderState';
import { repeatWordsService } from '@/src/app/services/repeat-words.service';
import Loader from '@/src/components/ui/loader/Loader';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import Button from '@/src/components/ui/button/Button';
import { use, useEffect, useState } from 'react';
import { RepeatEntityModal } from '@/src/components/ui/repeat-modal/RepeatModal';
import { toast, Toaster } from 'sonner';
import { IRepeatWord } from '@/src/app/types/repeat-words';
import Word from '../words/components/Word';

function RepeatWords() {
  const queryClient = useQueryClient();
  const [isFetching, setIsFetching] = useState(false);
  const [localData, setLocalData] = useState<IRepeatWord[] | null>(null);
  const [isOpenRepeatingModal, setIsOpenRepeatingModal] = useState(false);

  const {
    data,
    isFetching: isFetchingGet,
    error,
    refetch: getRepeatWordsRefetch,
  } = useQuery({
    queryKey: ['repeat-words'],
    queryFn: () => repeatWordsService.getDailyRepeatWords(),
  });

  useEffect(() => {
    if (!!data?.data && !isFetchingGet) {
      setLocalData(data.data);
      toast.success(data.message);
    }
  }, [data, isFetching]);

  const deleteAllQuery = useMutation({
    mutationFn: () => repeatWordsService.deleteAll(),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['repeat-words'] }),
  });

  useEffect(() => {
    if (isFetchingGet || deleteAllQuery.isPending) {
      setIsFetching(true);
    } else {
      setIsFetching(false);
    }
  }, [isFetchingGet, deleteAllQuery.isPending]);

  const onDeleteAll = () => {
    deleteAllQuery.mutate();
  };

  return (
    <>
      <div>
        <div className="mb-6 flex gap-4 items-center border-b border-grayLight pb-6">
          <h3 className="text-xl">
            You need to repeat -{' '}
            <span className="text-gray underline  underline-offset-4">
              {localData?.length || 0}
            </span>{' '}
            words
          </h3>
          <Button
            disabled={!!!localData?.length}
            className="ml-auto"
            onClick={() => setIsOpenRepeatingModal(true)}
          >
            Start
          </Button>
          <Button onClick={onDeleteAll} className="" variant={'danger'}>
            Delete all
          </Button>
        </div>
        {isFetchingGet && <Loader />}
        {!isFetchingGet && !!!localData?.length && <h5>Nothing to repeat</h5>}
        {!isFetching && localData && localData.length > 0 && (
          <div className="flex flex-wrap gap-x-2 gap-y-4 mb-10">
            {localData.map((item: IRepeatWord, idx) => (
              <div key={item.en}>
                <Word item={item.word} />
              </div>
            ))}
          </div>
        )}

        {!!localData?.length && (
          <RepeatEntityModal
            getRepeatEntitiesRefetch={getRepeatWordsRefetch}
            data={localData}
            isOpen={isOpenRepeatingModal}
            onHandleClose={() => setIsOpenRepeatingModal(false)}
            repeatVariant="word"
          />
        )}
      </div>
      <Toaster richColors />
    </>
  );
}

export default WithHeaderState(RepeatWords, 'repeat-words');
