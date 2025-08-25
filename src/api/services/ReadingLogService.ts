import { APIRequest } from '@/api/services/config/request';
import * as T from '@/api/services/types/booktypes';
import { ReadingLogEndPoint } from '@/api/services/config/APIEndpoints';

export const ReadingLogService = {
  getReadingLog: (id: number) => {
    return APIRequest<T.ReadingLogResponse>(ReadingLogEndPoint.getReadingLog(id), 'GET');
  },
  updateRating: (id: number, star: number) => {
    return APIRequest<void>(ReadingLogEndPoint.updateRating(id), 'PATCH', {
      data: { star },
    });
  },
  updateSummary: (id: number, summary: string) => {
    return APIRequest<void>(ReadingLogEndPoint.updateSummary(id), 'PATCH', {
      data: { summary },
    });
  },
  updateNote: (id: number, note: string) => {
    return APIRequest<void>(ReadingLogEndPoint.updateNote(id), 'PATCH', {
      data: { note },
    });
  },
};
