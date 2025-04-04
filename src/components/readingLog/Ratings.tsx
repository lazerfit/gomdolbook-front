import { styled } from "styled-components";
import { FaStar, FaRegStar } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { useReadingLog } from "@/hooks/index.ts";
import { RefetchOptions, QueryObserverResult } from "@tanstack/react-query";
import { IApiResponse, IReadingLogResponse } from "@/api/services/BoookService.ts";

const Wrapper = styled.div`
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
  initialStar: number;
  refetch: (
    options?: RefetchOptions,
  ) => Promise<QueryObserverResult<IApiResponse<IReadingLogResponse>, Error>>;
}

const Ratings = ({ isbn = "", initialStar = 0, refetch }: Props) => {
  const [rating, setRating] = useState(initialStar);
  const [hover, setHover] = useState(0);
  const { updateRating } = useReadingLog();

  const onSetRating = (n: number) => {
    setRating((prev) => (prev === n ? 0 : n));
  };

  useEffect(() => {
    if (rating !== 0 && rating !== initialStar) {
      updateRating(
        { isbn: isbn, star: rating },
        {
          onSuccess: () => {
            refetch()
              .then()
              .catch((error) => console.log(error));
          },
          onError: (error) => console.log(error),
        },
      );
    }
  }, [rating, updateRating, initialStar, isbn, refetch]);

  useEffect(() => {
    setRating(initialStar);
  }, [initialStar]);

  return (
    <Wrapper>
      <StarContainer>
        {initialStar === 0 &&
          Array.from({ length: 5 }, (_, i) => i + 1).map((arrayStar) => (
            <Star
              key={arrayStar}
              onMouseEnter={() => setHover(arrayStar)}
              onMouseLeave={() => setHover(0)}
              onClick={() => onSetRating(arrayStar)}
            >
              {hover > 0 ? (
                hover >= arrayStar ? (
                  <FaStar />
                ) : (
                  <FaRegStar />
                )
              ) : rating >= arrayStar ? (
                <FaStar />
              ) : (
                <FaRegStar />
              )}
            </Star>
          ))}
        {initialStar !== 0 &&
          Array.from({ length: 5 }, (_, i) => i + 1).map((arrayStar) => (
            <Star key={arrayStar} style={{ cursor: "default" }}>
              {rating >= arrayStar ? <FaStar /> : <FaRegStar />}
            </Star>
          ))}
      </StarContainer>
    </Wrapper>
  );
};

export default Ratings;
