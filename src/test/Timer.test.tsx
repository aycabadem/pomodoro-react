import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import Timer from "../components/timer/Timer";
import store from "../redux/store";
import "@testing-library/jest-dom";

describe("Timer Component", () => {
  test("Renders correctly", () => {
    render(
      <Provider store={store}>
        <Timer onSettingsButtonClick={() => {}} />
      </Provider>
    );

    expect(screen.getByText("work")).toBeInTheDocument();

    expect(screen.getByTestId("play-button")).toBeInTheDocument();
    expect(screen.queryByTestId("pause-button")).not.toBeInTheDocument();

    expect(screen.getByTestId("restart-button")).toBeInTheDocument();

    expect(screen.getByTestId("settings-button")).toBeInTheDocument();
  });
  test("settings buttton correctly", () => {
    let isSettingsButtonClicked = false;
    render(
      <Provider store={store}>
        <Timer
          onSettingsButtonClick={() => {
            isSettingsButtonClicked = true;
          }}
        />
      </Provider>
    );
    fireEvent.click(screen.getByText("Settings"));
    expect(isSettingsButtonClicked).toBeTruthy();
  });
  test("settings button corretly with button", () => {
    const mockCallback = jest.fn();
    render(
      <Provider store={store}>
        <Timer onSettingsButtonClick={mockCallback} />
      </Provider>
    );
    fireEvent.click(screen.getByText("Settings"));
    expect(mockCallback.mock.calls).toHaveLength(1);
  });
  test("renders pause button when play button clicked", () => {
    render(
      <Provider store={store}>
        <Timer onSettingsButtonClick={() => {}} />
      </Provider>
    );

    fireEvent.click(screen.getByTestId("play-button"));
    expect(screen.getByTestId("pause-button")).toBeInTheDocument();
    expect(screen.queryByTestId("play-button")).not.toBeInTheDocument();
  });
  test("not renders 24:00 when play button clicked", async () => {
    render(
      <Provider store={store}>
        <Timer onSettingsButtonClick={() => {}} />
      </Provider>
    );

    fireEvent.click(screen.getByTestId("play-button"));
    await new Promise((r) => setTimeout(r, 1500));
    expect(screen.getByText("24:59")).toBeInTheDocument();
  });
  test("renders 25:00 when restart button clicked", async () => {
    render(
      <Provider store={store}>
        <Timer onSettingsButtonClick={() => {}} />
      </Provider>
    );
    fireEvent.click(screen.getByTestId("play-button"));
    await new Promise((r) => setTimeout(r, 1500));
    fireEvent.click(screen.getByTestId("restart-button"));

    expect(screen.getByText("25:00")).toBeInTheDocument();
  });
});
