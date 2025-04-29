import { styled } from "styled-components";
import FullCalendar from "@fullcalendar/react";
import { useState } from "react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { useBook, useMediaBreakpoints, useModal } from "@/hooks/index.ts";
import { Modal } from "@/ui/index.ts";
import { ModalTypes } from "@/hooks/useModal.js";
import Rating from "@/components/readingLog/Rating.tsx";
import { useNavigate } from "react-router-dom";

const CalendarWrapper = styled.div`
  margin: 50px auto;
  width: 100%;

  @media (${(props) => props.theme.breakpoints.mobile}) {
    width: 85%;
  }

  @media (${(props) => props.theme.breakpoints.tablet}) {
    width: 90%;
  }
`;

const ModalContentWrapper = styled.div`
  display: flex;
  margin: 30px auto;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ModalImg = styled.img`
  width: 100px;
  height: 150px;
  margin-top: 20px;
  cursor: pointer;
`;

const ModalTitle = styled.p`
  font-weight: 600;
`;

interface CalendarModalBookData {
  title: string;
  isbn: string;
  coverUrl: string;
  rating: string;
}

const CalendarMonthly = () => {
  const { isMobile } = useMediaBreakpoints();
  const { finishedBookCalendarData } = useBook();
  const { modalType, openModal, closeModal } = useModal();
  const [bookData, setBookData] = useState<CalendarModalBookData | null>(null);
  const navigate = useNavigate();
  const calendarData = finishedBookCalendarData.map((item) => {
    return {
      title: item.title,
      start: item.finishedAt ?? "",
      extendedProps: {
        coverUrl: item.cover,
        isbn: item.isbn,
        rating: item.rating,
      },
      color: "black",
    };
  });

  const handleEventClick = (
    title: string,
    isbn: string,
    coverUrl: string,
    rating: string,
  ) => {
    setBookData({ title, isbn, coverUrl, rating });
    openModal(ModalTypes.POPOVER);
  };

  const handleModalImgClick = (isbn: string) => {
    closeModal();
    navigate(`/readingLog/${isbn}`);
  };

  return (
    <>
      <CalendarWrapper data-testid="calendar">
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          weekends={false}
          height="900px"
          windowResize={({ view }) => {
            if (isMobile) {
              view.calendar.setOption("height", "700px");
            } else {
              view.calendar.setOption("height", "900px");
            }
          }}
          events={calendarData}
          eventClick={(info) => {
            const { isbn, coverUrl, rating } = info.event
              .extendedProps as CalendarModalBookData;
            const { title } = info.event;
            handleEventClick(title, isbn, coverUrl, rating);
          }}
          eventClassNames={"calendar-event"}
        />
      </CalendarWrapper>
      {modalType === ModalTypes.POPOVER && (
        <Modal innerHeight="400px" innerWidth="300px" onClose={closeModal}>
          <ModalContentWrapper>
            {bookData && (
              <>
                <ModalTitle>{bookData.title}</ModalTitle>
                <ModalImg
                  src={bookData.coverUrl}
                  alt="Book Cover"
                  onClick={() => handleModalImgClick(bookData.isbn)}
                />
                <Rating initialRating={Number(bookData?.rating)} />
              </>
            )}
          </ModalContentWrapper>
        </Modal>
      )}
    </>
  );
};

export default CalendarMonthly;
