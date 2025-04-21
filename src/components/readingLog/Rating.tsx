import { styled } from "styled-components";
import { FaStar, FaRegStar } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { useReadingLog } from "@/hooks/index.ts";
import { RefetchOptions, QueryObserverResult } from "@tanstack/react-query";
import { ApiResponse } from "@/api/services/types/commonTypes.ts";
import { ReadingLogResponse } from "@/api/services/types/booktypes.ts";

const RatingWrapper = styled.div`
  display: flex;
  gap: 5px;
  margin-top: 21px;
  font-size: 1.313rem;
  min-width: 12.5rem;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

const StarContainer = styled.div`
  color: #fac608;
`;

const Star = styled.span`
  cursor: pointer;
`;

interface Props {
  isbn: string;
  initialRating: number;
  refetch: (
    options?: RefetchOptions,
  ) => Promise<QueryObserverResult<ApiResponse<ReadingLogResponse> | void, Error>>;
}

const Rating = ({ isbn = "", initialRating = 0, refetch }: Props) => {
  const [rating, setRating] = useState(initialRating);
  const [hover, setHover] = useState(0);
  const { updateRatingMutation } = useReadingLog();

  const handleRatingChange = (n: number) => {
    setRating((prev) => (prev === n ? 0 : n));
  };

  useEffect(() => {
    if (rating !== 0 && rating !== initialRating) {
      updateRatingMutation(
        { isbn: isbn, star: rating },
        {
          onSuccess: () => {
            refetch().catch((error) => console.log(error));
          },
          onError: (error) => console.log(error),
        },
      );
    }
  }, [rating, updateRatingMutation, initialRating, isbn, refetch]);

  useEffect(() => {
    setRating(initialRating);
  }, [initialRating]);

  return (
    <RatingWrapper>
      <StarContainer>
        {initialRating === 0 &&
          Array.from({ length: 5 }, (_, i) => i + 1).map((arrayStar) => (
            <Star
              data-testid="star"
              key={arrayStar}
              onMouseEnter={() => setHover(arrayStar)}
              onMouseLeave={() => setHover(0)}
              onClick={() => handleRatingChange(arrayStar)}
            >
              {hover > 0 ? (
                hover >= arrayStar ? (
                  <FaStar data-testid="filled-star" />
                ) : (
                  <FaRegStar data-testid="reg-star" />
                )
              ) : rating >= arrayStar ? (
                <FaStar data-testid="filled-star" />
              ) : (
                <FaRegStar data-testid="reg-star" />
              )}
            </Star>
          ))}
        {initialRating !== 0 &&
          Array.from({ length: 5 }, (_, i) => i + 1).map((arrayStar) => (
            <Star key={arrayStar} style={{ cursor: "default" }}>
              {rating >= arrayStar ? (
                <FaStar data-testid="filled-star" />
              ) : (
                <FaRegStar data-testid="reg-star" />
              )}
            </Star>
          ))}
      </StarContainer>
    </RatingWrapper>
  );
};

export default Rating;
