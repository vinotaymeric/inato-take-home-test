export class Drug {
  constructor(name, expiresIn, benefit) {
    this.name = name;
    this.expiresIn = expiresIn;
    this.benefit = benefit;
  }

  static get maxBenefit() { return 50; }
  static get minBenefit() { return 0; }

  updateExpiration() {
    if (this.name === "Magic Pill") {
      return;
    } else {
      this.expiresIn = this.expiresIn - 1;
    }
  }

  updateBenefit() {
    this.benefit = this.nextDayBenefit();
  }

  nextDayBenefit() {
    let benefit;

    switch (this.name) {
      case "Herbal Tea":
        benefit = this.#nextHerbalTeaBenefit();
        break;
      case "Magic Pill":
        benefit = this.benefit; // Magic Pill always keeps its power
        break;
      case "Fervex":
        benefit = this.#nextFervexBenefit();
        break;
      case "Dafalgan":
        benefit = this.#nextDafalganBenefit();
        break;
      default: // standard drug
        benefit = this.#nextStandardBenefit();
    }

    return this.cap(benefit)
  }

  cap(benefit) {
    if (benefit > Drug.maxBenefit) {
      return Drug.maxBenefit;
    } else if (benefit < Drug.minBenefit) {
      return Drug.minBenefit;
    } else {
      return benefit;
    }
  }

  // private interface

    #nextHerbalTeaBenefit() {
      if (this.expiresIn > 0) {
        return this.benefit + 1;
      } else {
        return this.benefit + 2;
      }
    }

    #nextFervexBenefit() {
      if (this.expiresIn <= 0) {
        return 0;
      } else if (this.expiresIn <= 5) {
        return this.benefit + 3;
      } else if (this.expiresIn <= 10) {
        return this.benefit + 2;
      } else {
        return this.benefit + 1;
      }
    }

    #nextDafalganBenefit() {
      if (this.expiresIn <= 0) {
        return this.benefit - 4;
      } else {
        return this.benefit - 2;
      }
    }

    #nextStandardBenefit() {
      if (this.expiresIn <= 0) {
        return this.benefit - 2;
      } else {
        return this.benefit - 1;
      }
    }
}

export class Pharmacy {
  constructor(drugs = []) {
    this.drugs = drugs;
  }

  updateBenefitValue() {
    this.drugs.forEach(drug => {
      drug.updateBenefit();
      drug.updateExpiration();
    });

    return this.drugs;
  }
}
