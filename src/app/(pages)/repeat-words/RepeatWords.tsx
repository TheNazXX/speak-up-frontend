'use client';

import { WithHeaderState } from '@/app/hoc/WithHeaderState';
import { repeatWordsService } from '@/app/services/repeat-words.service';
import Loader from '@/components/ui/loader/Loader';
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

import WordsList from '../words/components/WordsList';
import Button from '@/components/ui/button/Button';
import { useEffect, useState } from 'react';
import { RepeatWordsModal } from './RepeatWordsModal';

function RepeatWords() {
  const queryClient = useQueryClient();
  const [isFetching, setIsFetching] = useState(false);

  const [isOpenRepeatingModal, setIsOpenRepeatingModal] = useState(false);

  const {
    data,
    isFetching: isFetchingGet,
    error,
  } = useQuery({
    queryKey: ['repeat-words'],
    queryFn: () => repeatWordsService.getAll(),
  });

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
    <div>
      <div className="mb-6 flex gap-4 items-center border-b border-blue-500 pb-6">
        <h3 className="text-xl">
          You need to repeat -{' '}
          <span className="text-blue-500 underline  underline-offset-4">
            {data?.data?.length}
          </span>{' '}
          words
        </h3>
        <Button
          disabled={!!!data?.data}
          className="ml-auto"
          onClick={() => setIsOpenRepeatingModal(true)}
        >
          Start
        </Button>
        <Button onClick={onDeleteAll} className="" variant={'danger'}>
          Delete all
        </Button>
      </div>
      {isFetching && <Loader />}
      {!isFetching && data?.data && data.data.length === 0 && (
        <h5>Nothing to repeat</h5>
      )}
      {!isFetching && data?.data && data.data.length > 0 && (
        <WordsList data={data.data} />
      )}

      {!!data?.data && (
        <RepeatWordsModal
          words={data.data}
          isOpen={isOpenRepeatingModal}
          onHandleClose={() => setIsOpenRepeatingModal(false)}
        />
      )}
    </div>
  );
}

export default WithHeaderState(RepeatWords, 'repeat-words');
