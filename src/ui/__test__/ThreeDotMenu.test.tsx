import { setupServer } from "msw/node";
import { http, HttpResponse } from "msw";
import {
  customRender,
  beforeEach,
  expect,
  it,
  describe,
  vi,
  beforeAll,
  afterAll,
  afterEach,
} from "@/utils/CustomRender.tsx";
import { fireEvent, screen, waitFor } from "@testing-library/react";
import ThreeDotMenu from "../ThreeDotMenu.tsx";

const server = setupServer();

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const onSubmit = vi.fn();
const statusUpdate = vi.fn();

describe("display render", () => {
  server.use(
    http.delete("http://localhost:8080/api/v1/collection/name/book/delete", () => {
      return HttpResponse.json({ data: "OK" });
    }),
  );
  beforeEach(() => {
    customRender(
      <ThreeDotMenu onRemove={onSubmit} isLoading={false} statusUpdate={statusUpdate} />,
    );
  });

  it("화면 렌더링이 정상적으로 된다.", async () => {
    const btn = await screen.findByText("삭제하기");
    expect(btn).toBeTruthy();
  });

  it("삭제하기 버튼 클릭 시 모달창이 뜬다.", async () => {
    const btn = await screen.findByText("삭제하기");
    fireEvent.click(btn);
    const confirmBtn = await screen.findByText("정말 삭제하시겠습니까?");
    expect(confirmBtn).toBeTruthy();
  });

  it("삭제하기 버튼 클릭 후 모달창이 닫힌다.", async () => {
    const btn = await screen.findByText("삭제하기");
    fireEvent.click(btn);
    const confirmBtn = await screen.findByText("삭제");
    expect(confirmBtn).toBeTruthy();
    fireEvent.click(confirmBtn);
    await waitFor(() => expect(screen.queryByText("정말 삭제하시겠습니까?")).toBeNull());
    expect(onSubmit).toBeCalledTimes(1);
  });
});
