export class Drug {
  constructor(name, expiresIn, benefit) {
    this.name = name;
    this.expiresIn = expiresIn;
    this.benefit = benefit;
  }

  static get maxBenefit() { return 50; }
  static get minBenefit() { return 0; }

  updateBenefit() {
    this.benefit = this.nextDayBenefit();
  }

  updateExpiration() {
    if (this.name === "Magic Pill") {
      return;
    } else {
      this.expiresIn = this.expiresIn - 1;
    }
  }

  nextDayBenefit() {
    let benefit = this.benefit;

    switch (this.name) {
      case "Herbal Tea":
        if (this.expiresIn > 0) {
          benefit += 1;
        } else {
          benefit += 2;
        }
        break;
      case "Magic Pill":
        break; // do nothing
      case "Fervex":
        if (this.expiresIn <= 0) {
          benefit = 0;
        } else if (this.expiresIn <= 5) {
          benefit += 3;
        } else if (this.expiresIn <= 10) {
          benefit += 2;
        } else {
          benefit += 1;
        }
        break;
      default: // standard drug
        if (this.expiresIn <= 0) {
          benefit -= 2;
        } else {
          benefit -= 1;
        }
        break;
    }

    if (benefit > Drug.maxBenefit) {
      return Drug.maxBenefit;
    } else if (benefit < Drug.minBenefit) {
      return Drug.minBenefit;
    } else {
      return benefit;
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
