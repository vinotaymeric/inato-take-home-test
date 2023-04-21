import { Drug, Pharmacy } from "./pharmacy";

describe("Pharmacy", () => {
  it("should decrease the benefit and expiresIn", () => {
    expect(new Pharmacy([new Drug("test", 2, 3)]).updateBenefitValue()).toEqual(
      [new Drug("test", 1, 2)]
    );
  });

  describe("Drug", () => {
    describe("#updateExpiration", () => {
      it("expires one day", () => {
        const drug = new Drug("Standard Drug", 10, 10);
        drug.updateExpiration();

        expect(drug.expiresIn).toEqual(9);
      });
      it("keeps expiresIn unchanged when Magic Pill", () => {
        const drug = new Drug("Magic Pill", 10, 10);
        drug.updateExpiration();

        expect(drug.expiresIn).toEqual(10);
      });
    });

    describe("#nextDayBenefit", () => {
      describe("standard drug", () => {
        it("decreases with time", () => {
          expect(new Drug("Standard Drug", 10, 10).nextDayBenefit())
            .toEqual(9);
        });
        it("decreases faster when drug expired", () => {
          expect(new Drug("Standard Drug", -1, 10).nextDayBenefit())
            .toEqual(8);
        });
        it("never goes below 0", () => {
          expect(new Drug("Standard Drug", -1, 0).nextDayBenefit())
            .toEqual(0);
        });
      });

      describe("edge cases: Dafalgan", () => {
        it("decreases twice as fast as a standard drug", () => {
          expect(new Drug("Dafalgan", 10, 10).nextDayBenefit())
            .toEqual(8);
        });
        it("decreases faster when drug expired", () => {
          expect(new Drug("Dafalgan", -1, 10).nextDayBenefit())
            .toEqual(6);
        });
        it("never goes below 0", () => {
          expect(new Drug("Dafalgan", -1, 0).nextDayBenefit())
            .toEqual(0);
        });
      });

      describe("edge cases: Herbal Tea", () => {
        it("increases in benefit", () => {
          expect(new Drug("Herbal Tea", 10, 10).nextDayBenefit())
            .toEqual(11);
        });
        it("increases even more when out of date", () => {
          expect(new Drug("Herbal Tea", 0, 10).nextDayBenefit())
            .toEqual(12);
        });
        it("never goes above 50", () => {
          expect(new Drug("Herbal Tea", -1, 50).nextDayBenefit())
            .toEqual(50);
        });
      });

      describe("edge cases: Magic Pill", () => {
        it("remains stable", () => {
          expect(new Drug("Magic Pill", 10, 10).nextDayBenefit())
            .toEqual(10);
        });
      });

      describe("edge cases: Fervex", () => {
        it("increases more and more...", () => {
          expect(new Drug("Fervex", 4, 10).nextDayBenefit())
            .toEqual(13);
        });
        it("handles corner cases", () => {
          expect(new Drug("Fervex", 10, 10).nextDayBenefit())
            .toEqual(12);
        });
        it("...then drops to 0", () => {
          expect(new Drug("Fervex", -1, 10).nextDayBenefit())
            .toEqual(0);
        });
      });
    });
  });
});
