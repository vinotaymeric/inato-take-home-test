import { Drug, Pharmacy } from "./pharmacy";

describe("Pharmacy", () => {
  describe("#updateBenefitValue", () => {
    it("decreases the benefit and expiresIn of each drug in the pharmacy", () => {
      let testDrug = new Drug("test", 2, 3);
      let magicPill = new Drug("Magic Pill", 10, 10);
      let dafalgan = new Drug("Dafalgan", 10, 10);

      let pharmacy = new Pharmacy([testDrug, magicPill, dafalgan]);

      pharmacy.updateBenefitValue();

      expect(pharmacy.drugs[0].expiresIn).toEqual(1);
      expect(pharmacy.drugs[0].benefit).toEqual(2);

      expect(pharmacy.drugs[1].expiresIn).toEqual(10);
      expect(pharmacy.drugs[1].benefit).toEqual(10);

      expect(pharmacy.drugs[2].expiresIn).toEqual(9);
      expect(pharmacy.drugs[2].benefit).toEqual(8);
    });
  });

  describe("Drug", () => {
    describe("#updateExpiration", () => {
      it("diminishes expireIn by one", () => {
        let drug = new Drug("Standard Drug", 10, 10);
        drug.updateExpiration();

        expect(drug.expiresIn).toEqual(9);
      });
      it("keeps expiresIn unchanged when Magic Pill", () => {
        let drug = new Drug("Magic Pill", 10, 10);
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

      describe("special drug: Dafalgan", () => {
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

      describe("special drug: Herbal Tea", () => {
        it("increases benefit when time passes", () => {
          expect(new Drug("Herbal Tea", 10, 10).nextDayBenefit())
            .toEqual(11);
        });
        it("increases even more when drug is out of date", () => {
          expect(new Drug("Herbal Tea", 0, 10).nextDayBenefit())
            .toEqual(12);
        });
        it("never goes above 50", () => {
          expect(new Drug("Herbal Tea", -1, 50).nextDayBenefit())
            .toEqual(50);
        });
      });

      describe("special drug: Magic Pill", () => {
        it("keeps benefit stable", () => {
          expect(new Drug("Magic Pill", 10, 10).nextDayBenefit())
            .toEqual(10);
        });
      });

      describe("special drug: Fervex", () => {
        it("increases benefits somewhat exponentially", () => {
          expect(new Drug("Fervex", 10, 10).nextDayBenefit())
            .toEqual(12);
        });
        it("increases benefits somewhat exponentially", () => {
          expect(new Drug("Fervex", 4, 10).nextDayBenefit())
            .toEqual(13);
        });
        it("drops benefits to 0 when drug is expired", () => {
          expect(new Drug("Fervex", 0, 10).nextDayBenefit())
            .toEqual(0);
        });
      });
    });
  });
});
