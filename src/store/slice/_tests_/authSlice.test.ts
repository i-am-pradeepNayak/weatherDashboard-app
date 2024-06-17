import authReducer, { login, logout, AuthState } from "../authSlice";
import { AnyAction } from "@reduxjs/toolkit";
import axios from "axios";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("authSlice", () => {
  const initialState: AuthState = {
    isAuthenticated: false,
    user: null,
    loading: false,
    error: null,
  };

  it("should handle initial state", () => {
    expect(authReducer(undefined, { type: "unknown" })).toEqual(initialState);
  });

  it("should handle login.pending", () => {
    const action: AnyAction = { type: login.pending.type };
    const state = authReducer(initialState, action);
    expect(state.loading).toBe(true);
    expect(state.error).toBe(null);
  });

  it("should handle login.fulfilled", () => {
    const user = { id: 1, username: "user" };
    const action: AnyAction = { type: login.fulfilled.type, payload: user };
    const state = authReducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.isAuthenticated).toBe(true);
    expect(state.user).toEqual(user);
  });

  it("should handle login.rejected", () => {
    const action: AnyAction = {
      type: login.rejected.type,
      payload: "Invalid password",
    };
    const state = authReducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.error).toBe("Invalid password");
  });

  it("should handle logout", () => {
    const state = authReducer(
      {
        ...initialState,
        isAuthenticated: true,
        user: { id: 1, username: "user" },
      },
      logout()
    );
    expect(state.isAuthenticated).toBe(false);
    expect(state.user).toBe(null);
  });

  it("should handle login thunk", async () => {
    const user = { id: 1, username: "user", password: "password" };
    mockedAxios.get.mockResolvedValue({ data: [user] });

    const dispatch = jest.fn();
    const thunk = login({ username: "user", password: "password" });
    await thunk(dispatch, () => initialState, null);

    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(2);

    expect(calls[0][0].type).toEqual(login.pending.type);
    expect(calls[1][0].type).toEqual(login.fulfilled.type);
    expect(calls[1][0].payload).toEqual(user);
  });

  it("should handle login thunk with error", async () => {
    mockedAxios.get.mockResolvedValue({ data: [] });

    const dispatch = jest.fn();
    const thunk = login({ username: "user", password: "wrongpassword" });
    await thunk(dispatch, () => initialState, null);

    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(2);

    expect(calls[0][0].type).toEqual(login.pending.type);
    expect(calls[1][0].type).toEqual(login.rejected.type);
    expect(calls[1][0].payload).toEqual("User not found");
  });
});
