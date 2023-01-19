import { store, RootState } from ".";

describe("redux store init", () => {
    it("should handle initial state", () => {
        expect(store.getState()).toEqual({ forms: { data: [] } });
        const data = (state: RootState) => state.forms;
        expect(data(store.getState())).toEqual({ data: [] });
    });
});
